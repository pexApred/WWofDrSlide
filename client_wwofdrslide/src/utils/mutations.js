import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!) {
        createUser(email: $email, username: $username, password: $password) {
            token
            user {
                _id
                email
                username
            }
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation updateProfile($userId: ID!, $email: String, $username: String, $password: String) {
        updateProfile(userId: $userId, email: $email, username: $username, password: $password) {
            _id
            email
            username
        }
    }
`;

export const START_RIDDLE = gql`
    mutation startRiddle($userId: ID!, $riddleId: String!) {
        startRiddle(userId: $userId, riddleId: $riddleId) {
            user_id
            riddle_id
            isSolved
            attempted
            usedHint
            timestamp
            startTime
            solveTime
            incorrectAnswers
            hintsUsed
            hintUsageTime
            userFeedback {
                difficultyRating
                enjoymentRating
            }
            userEngagement {
                visits
                riddlesAttempted
                timeSpent
            }
        }
    }
`;

export const ATTEMPT_RIDDLE = gql`
    mutation attemptRiddle($userId: ID!, $riddleId: String!, $isSolved: Boolean!, $incorrectAnswers: [String]) {
        attemptRiddle(userId: $userId, riddleId: $riddleId, isSolved: $isSolved, incorrectAnswers: $incorrectAnswers) {
            user_id
            riddle_id
            isSolved
            attempted
            usedHint
            incorrectAnswers
        }
    }
`;

export const USE_HINT = gql`
    mutation useHint($userId: ID!, $riddleId: String!, $hintNumber: Int!) {
        useHint(userId: $userId, riddleId: $riddleId, hintNumber: $hintNumber) {
            user_id
            riddle_id
            usedHint
            hintsUsed
        }
    }
`;
