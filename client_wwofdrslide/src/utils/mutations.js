import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($accesscode: String!, $email: String!, $password: String!) {
        createUser(accesscode: $accesscode, email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const LOGOUT_USER = gql`
    mutation logout {
        logout
    }
`;

export const USE_ACCESSCODE = gql`
    mutation useAccessCode($_id: ID!) {
        useAccessCode(_id: $_id) {
            _id
            isUsed
        }
    }
`;

export const ASSIGN_ACCESSCODE = gql`
    mutation assignAccessCode($userId: ID!, $accessCodeId: ID!) {
        assignAccessCode(userId: $userId, accessCodeId: $accessCodeId) {
            _id
            email 
            accesscode {
                _id
                accesscode
            }
        }
    }
`;

export const START_RIDDLE = gql`
    mutation startRiddle($userId: ID!, $riddleId: String!) {
        startRiddle(userId: $userId, riddleId: $riddleId) {
            user_id
            riddle_id
            isSolved
            attempts
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
            attempts
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
