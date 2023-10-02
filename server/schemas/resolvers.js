const { AccessCode, User, Riddle, UserInteraction } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, ApolloError } = require('apollo-server-express');
const bcrypt = require('bcrypt');

module.exports = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in!');
            }
            const userId = context.user._id;
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.error(err);
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
        
        accessCode: async (parent, { _id }) => {
            try {
                const code = await AccessCode.findOne({ _id: _id });
                return code;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong with finding an access code by id!');
            }
        },
        accessCodes: async () => {
            try {
                const accessCodes = await AccessCode.find();
                return accessCodes;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong with finding access codes!');
            }
        },
    },
    Mutation: {
        login: async (parent, { username, email, password }, context) => {
            let user;
            if (email) {
                user = await User.findOne({ email });
            } else if (username) {
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

            context.res.cookie('auth_token', accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
            });

            context.res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days cookie
            });

            return { token: accessToken, user };
        },

        logout: async (parent, args, context) => {
            context.res.clearCookie('auth_token');
            context.res.clearCookie('refresh_token');
            return true;
        },

        createUser: async (parent, { accesscode, username, email, password }, context) => {

            // Validate the access code
            const validAccessCode = await AccessCode.findOne({ accesscode: accesscode });

            if (!validAccessCode) {
                throw new Error("Invalid access code");
            }

            if (validAccessCode.isUsed) {
                throw new Error("This access code has already been used");
            }
            // Create the user with the access code
            const user = await User.create({
                accesscode: validAccessCode._id,
                username,
                email,
                password
            });

            if (!user) {
                throw new Error("Something went wrong while creating the user!");
            }

            if (!validAccessCode._id) {
                throw new Error("Unable to retrieve the ID of the accesscode!");
            }

            // If valid, mark the access code as used
            validAccessCode.isUsed = true;
            validAccessCode.userId = user._id;
            await validAccessCode.save();

            const { accessToken, refreshToken } = signToken(user);

            context.res.cookie('auth_token', accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
            });

            context.res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days cookie
            });

            return { token: accessToken, user };
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
        useAccessCode: async (parent, { _id }) => {
            const accessCode = await AccessCode.findOne({ _id: _id });
            if (!accessCode) {
                throw new Error("Can't find this access code");
            }
            if (accessCode.isUsed) {
                throw new Error("This access code has already been used");
            }
            accessCode.isUsed = true;
            await accessCode.save();
            return accessCode;
        },
        assignAccessCode: async (parent, { userId, accessCodeId }) => {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $set: { accesscode: accessCodeId } },
                { new: true }
            );
            if (!user) {
                throw new Error("Can't find this user");
            }
            return user;
        },
        startRiddle: async (parent, { userId, riddleId }) => {
            const user = await User.findOne({ _id: userId });
            if (!user) {
                throw new Error("Can't find this user");
            }
            const riddle = await Riddle.findOne({ id: riddleId });
            if (!riddle) {
                throw new Error("Can't find this riddle");
            }
            const userInteraction = await UserInteraction.create({
                user_id: userId,
                riddle_id: riddleId,
                isSolved: false,
                attempts: 0,
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
            if (!user.interactions) {
                user.interactions = [];
            }
            user.interactions.push(userInteraction._id);
            await user.save();
            
            if (!riddle.interactions) {
                riddle.interactions = [];
            }
            riddle.interactions.push(userInteraction.id);
            await riddle.save();

            return userInteraction;
        },
        attemptRiddle: async (parent, { userId, riddleId, isSolved, incorrectAnswers }) => {
            const userInteraction = await UserInteraction.findOne({ user_id: userId, riddle_id: riddleId });
            if (!userInteraction) {
                throw new Error("Can't find this user interaction");
            }
            userInteraction.attempts += 1;
            userInteraction.isSolved = true;
            userInteraction.incorrectAnswers = incorrectAnswers;
            await userInteraction.save();
            return userInteraction;
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