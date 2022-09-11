import {gql} from "@apollo/client";


const GET_COURSES = gql `
    query getCourses {
        courses {
            id, name, description, status
        }
    }
`;

const GET_COURSE = gql `
    query getCourse($id:ID!) {
        course(id:$id) {
            id, name, description, status, instructor {
                id, name, email
            }
        }
    }
`;

export {GET_COURSES, GET_COURSE};

