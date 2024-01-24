const { User, Riddle, UserInteraction } = require('../models');
const { signToken } = require('../utils/tokenManager');
const { AuthenticationError, ApolloError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const sendEmail = require('../services/emailService');
const crypto = require('crypto');

module.exports = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in!');
            }
            const userId = context.user.data._id;
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                throw new AuthenticationError('Something went wrong with finding myself!');
            }
        },
        user: async (parent, { _id }) => {
            try {
                const user = await User.findById(_id);
                return user;
            } catch (err) {
                console.error(err);
                throw new AuthenticationError('Something went wrong with finding a user by id!');
            }
        },
        getRiddles: async () => {
            try {
                const riddles = await Riddle.find().populate('interactions');
                return riddles;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong with finding riddles!');
            }
        },
        getRiddle: async (parent, { id }, context) => {
            try {
                const riddle = await Riddle.findOne({ id: id }).populate('interactions');
                return riddle;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong with finding a riddle by id!');
            }
        },
        getUserInteraction: async (parent, { userId, riddleId }) => {
            try {
                const interaction = await UserInteraction.findOne({ userId, riddleId }).populate('userId').populate('riddleId');
                if (!interaction) {
                    throw new ApolloError('User Interaction not found');
                }
                return interaction;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong fetching the User Interaction');
            }
        },
    },
    Mutation: {
        login: async (parent, { username, password }, context) => {
            let user;
            if (username) {
                user = await User.findOne({ username });
            }
            if (!user) {
                throw new Error("Can't find this user");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Wrong password!");
            }
            const { accessToken, refreshToken } = signToken(user);
            if (context.res) {
                context.res.cookie('auth_token', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 60 * 24 // 1 day
                });
                context.res.cookie('refresh_token', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
                });
            } else {
                console.error('Response object is undefined in context');
                throw new ApolloError('Internal server error');
            }
            return { token: accessToken, user };
        },
        createUser: async (parent, { email, username, password }, context) => {
            try {
                const user = await User.create({
                    email,
                    username,
                    password
                });
                if (!user) {
                    throw new Error("Failed to create a user");
                }
                const { accessToken, refreshToken } = signToken(user);
                if (context.res) {
                    context.res.cookie('auth_token', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 1000 * 60 * 60 * 24 // 1 day
                    });
                    context.res.cookie('refresh_token', refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
                    });
                } else {
                    console.error('Response object is undefined in context');
                    throw new ApolloError('Internal server error');
                }
                return { token: accessToken, user };
            } catch (err) {
                console.error('Error in createUser:', err);
                throw new ApolloError('Error creating user');
            }
        },
        updateProfile: async (parent, args, context) => {
            const updates = {};
            if (args.username) updates.username = args.username;
            if (args.email) updates.email = args.email;
            // if (args.profilePicture) updates.profilePicture = args.profilePicture;
            if (args.password) {
                const saltRounds = 10;
                updates.password = await bcrypt.hash(args.password, saltRounds);
            }
            return User.findByIdAndUpdate(args.userId, updates, { new: true });
        },
        startRiddle: async (parent, { userId, riddleId }) => {
            try {
                const user = await User.findById(userId);
                const riddle = await Riddle.findOne({ id: riddleId });
                if (!user || !riddle) {
                    throw new Error("User or Riddle not found");
                }
                const interaction = await UserInteraction.findOneAndUpdate(
                    { userId, riddleId },
                    {
                        $setOnInsert: {
                            userId: userId,
                            riddleId: riddleId,
                            isSolved: false,
                            attempted: false,
                            usedHint: false,
                            givenUp: false,
                            incorrectAnswers: [],
                            hintsUsed: [],
                            userFeedback: {
                                difficultyRating: null,
                                enjoymentRating: null,
                            },
                            userEngagement: {
                                visits: 1,
                                riddlesAttempted: 0,
                                timeSpent: 0,
                            },
                        }
                    }, // update
                    {
                        upsert: true, // options
                        new: true,
                        setDefaultsOnInsert: true
                    }
                );
                if (!riddle.interactions.includes(interaction._id)) {
                    riddle.interactions.push(interaction._id);
                    await riddle.save();
                }
                return interaction;
            } catch (error) {
                console.error('Error in startRiddle:', error);
                throw new ApolloError(`Error starting riddle: ${error.message}`);
            }
        },
        attemptRiddle: async (parent, { userId, riddleId, isSolved, incorrectAnswers, attempted, givenUp, usedHint }) => {
            try {
                const userInteraction = await UserInteraction.findOne(
                    {
                        userId, riddleId
                    }
                );
                if (!userInteraction) {
                    throw new Error("User interaction not found");
                }
                userInteraction.attempted = attempted;
                userInteraction.incorrectAnswers = incorrectAnswers;
                if (!userInteraction.isSolved && !userInteraction.givenUp) {
                    userInteraction.isSolved = isSolved;
                    userInteraction.givenUp = givenUp;
                    userInteraction.usedHint = userInteraction.usedHint || usedHint;
                }
                await userInteraction.save();
                return userInteraction;
            } catch (error) {
                console.error('Error in attemptRiddle:', error);
                throw new ApolloError('Error attempting riddle');
            }
        },
        useHint: async (parent, { userId, riddleId, hintNumber }) => {
            try {
                const userInteraction = await UserInteraction.findOne({ userId, riddleId });
                if (!userInteraction) {
                    throw new Error("User interaction not found");
                }
                // Only record hint usage if the riddle was not already solved or given up
                if (!userInteraction.isSolved && !userInteraction.givenUp) {
                    if (!userInteraction.hintsUsed.includes(hintNumber)) {
                        userInteraction.hintsUsed.push(hintNumber);
                        userInteraction.usedHint = true;
                        await userInteraction.save();
                    }
                }
                return userInteraction;
            } catch (error) {
                console.error('Error in useHint:', error);
                throw new ApolloError('Error using hint');
            }
        },
        forgotPassword: async (_, { email }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const resetToken = crypto.randomBytes(20).toString('hex');
            const tokenExpiry = Date.now() + 3600000;
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = tokenExpiry;
            await user.save();
            const subject = 'Password Reset';
            const resetLink = 'http://localhost:3001/reset-password';
            const text = `Please use the following link to reset your password: ${resetLink}`;
            try {
                await sendEmail(email, subject, text);
                return {
                    message: 'Password reset email sent successfully',
                    success: true
                };
            } catch (error) {
                console.error('Failed to send email:', error);
                throw new Error('Failed to send password reset email');
            }
        }
    }
};