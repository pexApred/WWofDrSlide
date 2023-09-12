const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
        user(_id: ID!): User
        getRiddles: [Riddle]
        getRiddle(_id: ID!): Riddle
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
        id: ID
        riddle: String
        hint: String
        solutions: [String]!
        background_image: String
        interactions: [UserInteraction]
    }

    type Riddles {
        count: Int!
        riddles: [Riddle]!
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