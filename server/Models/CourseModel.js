const mongoose = require('mongoose');
const {Schema} = mongoose;

const CourseSchema = Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: [
            'Yayında',
            'Oluşturuluyor',
            'Planlanıyor',
            'Pasif'
        ]
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    }
});

const CourseModel = mongoose.model('Course', CourseSchema);
module.exports = CourseModel;