const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
        accessCode(_id: ID): AccessCode
        accessCodes: [AccessCode]
        user(_id: ID!): User
        getRiddles: [Riddle]
        getRiddle(id: String!): Riddle
    }

    type Mutation {
        login(username: String, email: String, password: String!): Auth
        logout: Boolean
        createUser(accesscode: String!, username: String, email: String!, password: String!): Auth
        updateProfile(userId: ID!, username: String, email: String, password: String): User
        useAccessCode(_id: ID!): AccessCode
        assignAccessCode(userId: ID!, accessCodeId: ID!): User
        startRiddle(userId: ID!, riddleId: String!): UserInteraction
        attemptRiddle(userId: ID!, riddleId: String!, isSolved: Boolean!, incorrectAnswers: [String]): UserInteraction
        useHint(userId: ID!, riddleId: String!, hintNumber: Int!): UserInteraction
    }

    type AccessCode {
        _id: ID
        accesscode: String!
        isUsed: Boolean!
        userId: User
    }

    type User {
        _id: ID
        accesscode: AccessCode!
        username: String
        email: String!
        userAnalytics: [UserInteraction]
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
    `;

module.exports = typeDefs;