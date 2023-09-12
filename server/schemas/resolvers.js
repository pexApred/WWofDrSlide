const { User, Riddle, UserInteraction } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

module.exports = {
    Query: {
        me: async (parent, args, context) => {
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
                console.log('riddles', riddles);
                return riddles;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong with finding riddles!');
            }   
        },
        getRiddle: async (parent, { _id }) => {
            try {
                const riddle = await Riddle.findOne({ _id: _id });
                console.log('riddle', riddle);
                return riddle;
            } catch (err) {
                console.error(err);
                throw new ApolloError('Something went wrong with finding a riddle by id!');
            }
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Can't find this user");
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Wrong password!");
            }
            const token = signToken(user);
            return { token, user };
        },
        createUser: async (parent, args) => {

            const user = await User.create(args);
            if (!user) {
                throw new Error("Something is wrong!");
            }
            const token = signToken(user);
            return { token, user };
        },
    }
};

