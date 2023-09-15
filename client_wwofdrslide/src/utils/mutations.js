import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($accesscode: String!, $username: String!, $email: String!, $password: String!) {
        createUser(accesscode: $accesscode, username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
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
            username
            accesscode {
                _id
                accesscode
            }
        }
    }
`;