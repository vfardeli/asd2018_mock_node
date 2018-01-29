var mongoose = require('mongoose');

var experienceSchema = new mongoose.Schema({
    company: String,
    location: String,
    jobTitle: String,
    startMonth: Number,
    startYear: Number,
    endMonth: Number,
    endYear: Number,
});

module.exports = mongoose.model('Experience', experienceSchema);