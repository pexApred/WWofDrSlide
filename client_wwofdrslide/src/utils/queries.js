import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
        }
    }
`;

export const QUERY_RIDDLES = gql`
    query getRiddles {
        getRiddles {
            _id
        }
    }
`;

export const QUERY_RIDDLE = gql`
    query getRiddle($id: ID!) {
        getRiddle(id: $id) {
            _id
            riddleText
            riddleHint
            riddleSolutions
            background_image
            riddleInteractions {
                user_id
                riddle_id
                solved
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
    }
`;


