import {gql} from "@apollo/client";

const ADD_COURSE = gql `
    mutation addCourse($name:String!, $description:String!, $status:CourseStatus!, $instructorId:ID!) {
        addCourse(name:$name, description:$description, status:$status, instructorId:$instructorId) {
            id, name, description, status, instructor {
                id, name, email
            }
        }
    }
`;

const REMOVE_COURSE = gql `
    mutation removeCourse($id:ID!) {
        removeCourse(id:$id) {
            id, name, description, status, instructor {
                id, name, email
            }
        }
    }
`;

const UPDATE_COURSE = gql `
    mutation updateCourse($id:ID!, $name:String!, $description:String!, $status:CourseStatusForUpdated!) {
        updateCourse(id:$id, name:$name, description:$description, status:$status) {
            id, name, description, status, instructor {
                id, name, email
            }
        }
    }
`;


export {ADD_COURSE, REMOVE_COURSE, UPDATE_COURSE};
