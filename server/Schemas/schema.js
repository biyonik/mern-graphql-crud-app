const {courses, instructors} = require('../Data/mock');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');

const InstructorType = new GraphQLObjectType({
    name: 'Instructor',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        instructor: {
            type: InstructorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return instructors.find(i => i.id === args.id);
            }
        },
        instructors: {
            type: new GraphQLList(InstructorType),
            resolve: (parent, args) => {
                return instructors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})