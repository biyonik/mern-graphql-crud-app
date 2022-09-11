import {gql} from '@apollo/client';

const REMOVE_INSTRUCTOR = gql `
    mutation removeInstructor($id:ID!) {
        removeInstructor(id:$id) {
            id, name, email
        }
    }
`

const ADD_INSTRUCTOR = gql `
    mutation addInstructor($name:String!,$email:String!) {
        addInstructor(name:$name, email:$email) {
            id, name, email
        }
    }
`

export {REMOVE_INSTRUCTOR, ADD_INSTRUCTOR};
