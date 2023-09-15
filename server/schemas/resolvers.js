const { AccessCode, User, Riddle, UserInteraction } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

module.exports = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in!');
            }
            const userId = context.user.id;
            console.log('contextFetching me for user', userId);
            try {
                const user = await User.findById(userId);
                return user;
            } catch (err) {
                console.error(err);
                throw new AuthenticationError('Something went wrong with finding myself!');
            }
        },
        user: async (parent, { id }) => {
            try {
                const user = await User.findById(id);
                return user;
            } catch (err) {
                console.error(err);
                throw new AuthenticationError('Something went wrong with finding a user by id!');
            }
        },
        getRiddles: async () => {
            try {
                const riddles = await Riddle.find();
                return riddles;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong with finding riddles!');
            }
        },
        getRiddle: async (parent, { _id }) => {
            try {
                const riddle = await Riddle.findOne({ _id: _id });
                return riddle;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong with finding a riddle by id!');
            }
        },
        accessCode: async (parent, { _id }) => {
            try {
                const accessCode = await AccessCode.findOne({ _id: _id });
                return accessCode;
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
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Can't find this user");
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Wrong password!");
            }
            const token = signToken(user);

            context.res.cookie('auth_token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
            });

            return { token, user };
        },

        logout: async (parent, args, context) => {
            context.res.clearCookie('auth_token');
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
            // If valid, mark the access code as used
            validAccessCode.isUsed = true;
            validAccessCode.userId = user._id;
            await validAccessCode.save();

            const token = signToken(user);

            context.res.cookie('auth_token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
            });

            return { token, user };
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
    },
};

