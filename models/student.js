var mongoose = require('mongoose');

// STUDENT SCHEMA SETUP
var studentSchema = new mongoose.Schema({
    neuId: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: String,
    gender: String,
    phone: String,
    address: String,
    graduationMonth: Number,
    graduationYear: Number,
    startTerm: String,
    enrollmentStatus: {
        type: Boolean,
        default: true
    },
    major: String,
    degree: String,
    campus: String,
    citizenshipStatus: String,
    experiences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience'
        }
    ]
});

module.exports = mongoose.model('Student', studentSchema);