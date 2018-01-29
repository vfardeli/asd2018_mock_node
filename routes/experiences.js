var express = require('express');
var router = express.Router({ mergeParams: true });
var Student = require('../models/student');
var Experience = require('../models/experience');

// NEW - form to create new experience for students
router.get('/new', function (req, res) {
    // find student by neu id
    Student.findOne({ neuId: req.params.neu_id}, function (err, foundStudent) {
        if (err || !foundStudent) {
            res.send('Cannot find student...');
        } else {
            res.render('experiences/new', { student: foundStudent });
        }
    });
});

// CREATE - create a new experience for a student
router.post('/', function (req, res) {
    // find student by neu id
    Student.findOne({ neuId: req.params.neu_id }, function (err, foundStudent) {
        if (err || !foundStudent) {
            res.send('Cannot find student...');
        } else {
            // save the experience to the specific student
            Experience.create(req.body.experience, function (err, experience) {
                if (err) {
                    res.send('Something went wrong...');
                } else {
                    // save the student id (not the neu id) to experience
                    foundStudent.experiences.push(experience._id);
                    foundStudent.save();
                    res.redirect('/students/' + foundStudent.neuId);
                }
            });
        }
    });
});

// EDIT - show the form to edit a student experience
router.get('/:experience_id/edit', function (req, res) {
    Student.findOne({ neuId: req.params.neu_id }, function (err, foundStudent) {
        if (err || !foundStudent) {
            res.send('Cannot find student...');
        } else {
            Experience.findById(req.params.experience_id, function (err, foundExperience) {
                if (err || !foundExperience) {
                    res.send('Cannot find experience...');
                } else {
                    res.render('experiences/edit', { student: foundStudent, experience: foundExperience });
                }
            });
        }
    });
});

// UPDATE - update a student experience
router.put('/:experience_id', function (req, res) {
    Student.findOne({ neuId: req.params.neu_id }, function (err, foundStudent) {
        if (err || !foundStudent) {
            res.send('Cannot find student');
        } else {
            Experience.findByIdAndUpdate(req.params.experience_id, req.body.experience, function (err, updatedExperience) {
                if (err || !updatedExperience) {
                    res.send('Something went wrong...');
                } else {
                    res.redirect('/students/' + foundStudent.neuId);
                }
            });
        }
    });
});

// DESTROY - Delete a student experience
router.delete('/:experience_id', function (req, res) {
    Experience.findByIdAndRemove(req.params.experience_id, function (err) {
        if (err) {
            res.send('Something went wrong...');
        } else {
            res.redirect('/students/' + req.params.neu_id);
        }
    });
});

module.exports = router;