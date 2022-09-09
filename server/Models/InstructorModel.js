const mongoose = require('mongoose');
const {Schema} = mongoose;

const InstructorSchema = Schema({
    name: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    }
});

const InstructorModel = mongoose.model('Instructor', InstructorSchema);
module.exports = InstructorModel;