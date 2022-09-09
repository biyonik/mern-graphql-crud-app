const { courses, instructors } = require('../Data/mock');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');
const CourseModel = require('../Models/CourseModel');
const InstructorModel = require('../Models/InstructorModel');

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


const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        instructor: {
            type: InstructorType,
            resolve: (parent, args) => {
                return InstructorModel.findById(parent.id);
            }
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
                return InstructorModel.findById(args.id);
            }
        },
        instructors: {
            type: new GraphQLList(InstructorType),
            resolve: (parent, args) => {
                return InstructorModel.find();
            }
        },
        course: {
            type: CourseType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                return CourseModel.findById(args.id)
            }
        },
        courses: {
            type: new GraphQLList(CourseType),
            resolve: (parent, args) => {
                return CourseModel.find();
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addInstructor: {
            type: InstructorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (parent, args) => {
                const instructor = new InstructorModel({
                    name: args.name,
                    email: args.email
                });
                return instructor.save();
            }
        },
        removeInstructor: {
            type: InstructorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (parent, args) => {
                return InstructorModel.findByIdAndRemove(args.id)
            }
        },
        addCourse: {
            type: CourseType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: GraphQLString
                },
                status: {
                    type: new GraphQLEnumType({
                        name: 'CourseStatus',
                        values: {
                            'yayin': { value: 'Yayında' },
                            'olus': { value: 'Oluşturuluyor' },
                            'plan': { value: 'Planlanıyor' },
                            'pasif': { value: 'Pasif' }
                        }
                    }),
                    defaultValue: 'Planlanıyor'
                },
                instructorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (parent, args) => {
                const newCourse = new CourseModel({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    instructorId: args.instructorId
                });
                return await newCourse.save();
            }
        },
        removeCourse: {
            type: CourseType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: async (parent, args) => {
                return await CourseModel.findByIdAndRemove(args.id)
            }
        },
        updateCourse: {
            type: CourseType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                name: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                status: {
                    type: new GraphQLEnumType({
                        name: 'CourseStatusForUpdated',
                        values: {
                            'yayin': { value: 'Yayında' },
                            'olus': { value: 'Oluşturuluyor' },
                            'plan': { value: 'Planlanıyor' },
                            'pasif': { value: 'Pasif' }
                        }
                    }),
                    defaultValue: 'Planlanıyor'
                }
            },
            resolve: async (parent, args) => {
                return await CourseModel.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status
                    }
                }, {new: true})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})