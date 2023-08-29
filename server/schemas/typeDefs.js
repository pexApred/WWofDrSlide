const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
        user(id: ID!): User
        getRiddles: [Riddle]
        getRiddle(id: ID!): Riddle
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
    }

    type User {
        _id: ID
        username: String!
        email: String!
    }

    type Riddle {
        _id: ID
        riddleText: String
        riddleHint: String!
        riddleSolutions: [String]!
        background_image: String
        riddleInteractions: [UserInteraction]
    }

    type UserInteraction {
        user_id: ID
        riddle_id: ID
        solved: Boolean
        attempts: Int
        usedHint: Boolean
        timestamp: String
        startTime: String
        solveTime: String
        incorrectAnswers: [String]
        hintsUsed: [Int]
        hintUsageTime: String
        userFeedback: UserFeedback
        userEngagement: UserEngagement
    }

    type UserFeedback {
        difficultyRating: Int
        enjoymentRating: Int
    }

    type UserEngagement {
        visits: Int
        riddlesAttempted: Int
        timeSpent: Int
    }

    type Auth {
        token: ID!
        user: User
    }
    `;

module.exports = typeDefs;