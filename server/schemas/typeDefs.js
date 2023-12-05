const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
        user(_id: ID!): User
        getRiddles: [Riddle]
        getRiddle(id: String!): Riddle
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        createUser(email: String!, username: String!, password: String!): Auth
        updateProfile(userId: ID!, email: String, username: String, password: String): User
        startRiddle(userId: ID!, riddleId: String!): UserInteraction
        attemptRiddle(userId: ID!, riddleId: String!, isSolved: Boolean!, incorrectAnswers: [String]): UserInteraction
        useHint(userId: ID!, riddleId: String!, hintNumber: Int!): UserInteraction
        forgotPassword(email: String!): ForgotPasswordResponse
    }

    type User {
        _id: ID
        email: String!
        username: String!
        userAnalytics: [UserInteraction]
        resetPasswordToken: String
        resetPasswordExpires: String
    }

    type Riddle {
        _id: ID
        id: String
        riddle: String
        hint: String
        solutions: [String]!
        background_image: String
        interactions: [UserInteraction]
        difficulty: Int
    }

    type Riddles {
        count: Int!
        riddles: [Riddle]!
    }

    type UserInteraction {
        user_id: ID
        riddle_id: ID
        isSolved: Boolean
        attempted: Boolean
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

    type ForgotPasswordResponse {
        message: String!
        success: Boolean!
    }
    `;

module.exports = typeDefs;