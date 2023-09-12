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
    query getRiddle($_id: ID!) {
        getRiddle(_id: $_id) {
            id
            riddle
            hint
            solutions
            background_image
            interactions {
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


