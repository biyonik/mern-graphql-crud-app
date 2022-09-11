import {gql} from '@apollo/client';

const ADD_USER = gql `
    mutation addUser($username:String!, $email: String!, $password:String!) {
        addUser(username: $username, email: $email, password: $password) {
            id, username, email, token
        }
    }
`;

const LOGIN_USER = gql `
    mutation loginUser($email:String!, $password:String!) {
        loginUser(email: $email, password: $password) {
            id, username, email, token
        }
    }
`;

export {ADD_USER, LOGIN_USER};
