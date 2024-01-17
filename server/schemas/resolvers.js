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
                const interaction = await UserInteraction.findOne({ user_id: userId, riddle_id: riddleId }).populate('user_id').populate('riddle_id');
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
                const user = await User.findById({ _id: userId }); const riddle = await Riddle.findOne({ id: riddleId });
                if (!user || !riddle) {
                    throw new Error("User or Riddle not found");
                }

                let interaction = await UserInteraction.findOne({ user_id: userId, riddle_id: riddleId });

                if (!interaction) {
                    interaction = await UserInteraction.create({
                        user_id: userId,
                        riddle_id: riddleId,
                        isSolved: false,
                        attempted: false,
                        usedHint: false,
                        timestamp: new Date(),
                        startTime: new Date(),
                        solveTime: null,
                        incorrectAnswers: [],
                        hintsUsed: [],
                        hintUsageTime: null,
                        userFeedback: {
                            difficultyRating: null,
                            enjoymentRating: null,
                        },
                        userEngagement: {
                            visits: 1,
                            riddlesAttempted: 0,
                            timeSpent: 0,
                        },
                    });
                    riddle.interactions.push(interaction._id);
                    await riddle.save();
                }

                return interaction;
            } catch (error) {
                console.error('Error in startRiddle:', error);
                throw new ApolloError('Error starting riddle');
            }
        },
        attemptRiddle: async (parent, { userId, riddleId, isSolved, incorrectAnswers, attempted }) => {
            try {
                const userInteraction = await UserInteraction.findOneAndUpdate(
                    { user_id: userId, riddle_id: riddleId },
                    { attempted, isSolved, incorrectAnswers },
                    { new: true, upsert: true }
                );
        
                if (!userInteraction) {
                    throw new Error("User interaction not found");
                }
        
                return userInteraction;
            } catch (error) {
                console.error('Error in attemptRiddle:', error);
                throw new ApolloError('Error attempting riddle');
            }
        },
        useHint: async (parent, { userId, riddleId, hintNumber }) => {
            // Find the existing interaction
            const userInteraction = await UserInteraction.findOne({ user_id: userId, riddle_id: riddleId });

            if (!userInteraction) {
                throw new Error("Can't find this user interaction");
            }

            // Build the update operations dynamically
            const updateOps = {};

            if (!userInteraction.usedHint) {
                updateOps.usedHint = true;
            }

            // If hintNumber is not already in hintsUsed array, push it
            if (!userInteraction.hintsUsed.includes(hintNumber)) {
                updateOps.$push = { hintsUsed: hintNumber };
            }

            // Apply the update operations
            await UserInteraction.updateOne({ _id: userInteraction._id }, updateOps);

            // Return the updated interaction (or you can fetch it again if needed)
            return userInteraction;
        },
        forgotPassword: async (_, { email }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            // Generate a reset token
            const resetToken = crypto.randomBytes(20).toString('hex');
            const tokenExpiry = Date.now() + 3600000; // 1 hour from now

            // Save the token and expiry in user's document
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


        // useHint: async (parent, { userId, riddleId, hintNumber }) => {
        //     const userInteraction = await UserInteraction.findOneAndUpdate({ user_id: userId, riddle_id: riddleId });
        //     if (!userInteraction) {
        //         throw new Error("Can't find this user interaction");
        //     }
        //     if (!userInteraction.usedHint) {
        //     userInteraction.usedHint = true;
        //     }
        //     userInteraction.hintsUsed.push(hintNumber);
        //     await userInteraction.save();
        //     return userInteraction;
        // }

    },
};