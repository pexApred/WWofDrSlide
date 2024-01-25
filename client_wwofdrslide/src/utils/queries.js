import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            email
            username
            resetPasswordToken
            resetPasswordExpires
            points
        }
    }
`;

export const QUERY_RIDDLES = gql`
    query getRiddles {
        getRiddles {
            _id
            id
            background_image
            interactions {
                userId
                riddleId
                isSolved
                attempted
                usedHint
                givenUp
                incorrectAnswers
                hintsUsed
                userFeedback {
                    difficultyRating
                    enjoymentRating
                }
                userEngagement {
                    visits
                    riddlesAttempted
                    timeSpent
                }   
                createdAt
                updatedAt
            }
        }
    }
`;

export const QUERY_RIDDLE = gql`
    query getRiddle($id: String!) {
        getRiddle(id: $id) {
            _id
            id
            riddle
            hint
            solutions
            background_image
            interactions {
                userId
                riddleId
                isSolved
                attempted
                usedHint
                givenUp
                incorrectAnswers
                hintsUsed
                userFeedback {
                    difficultyRating
                    enjoymentRating
                }
                userEngagement {
                    visits
                    riddlesAttempted
                    timeSpent
                }   
                createdAt
                updatedAt
            }
            difficulty
        }
    }
`;

export const QUERY_USER_INTERACTION = gql`
    query getUserInteraction($userId: ID!, $riddleId: ID!) {
        getUserInteraction(userId: $userId, riddleId: $riddleId) {
            userId
            riddleId
            isSolved
            attempted
            usedHint
            givenUp
            incorrectAnswers
            hintsUsed
            userFeedback {
                difficultyRating
                enjoymentRating
            }
            userEngagement {
                visits
                riddlesAttempted
                timeSpent
            }   
            createdAt
            updatedAt
        }
    }
`;

export const QUERY_LEADERBOARD = gql `
    query leaderboard {
        leaderboard {
            _id
            username
            points
        }
    }
`;

