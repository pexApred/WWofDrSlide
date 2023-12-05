import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            email
            username
            resetPasswordToken
            resetPasswordExpires
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
            difficulty
        }
    }
`;


