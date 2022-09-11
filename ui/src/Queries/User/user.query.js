import {gql} from "@apollo/client";

const GET_USER = gql `
    query getUser($id:ID!) {
        getUser(id:$id) {
            id, username, email
        }
    }
`;

export {GET_USER};
