var express = require('express');
var router = express.Router();
var Student = require('../models/student');
var Experience = require('../models/experience');

// NEW - show form to create a student profile
router.get('/new', function (req, res) {
    res.render('students/new');
});

// CREATE - create a student profile
router.post('/', function (req, res) {
    Student.create(req.body.student, function (err, newStudent) {
        if (err || !newStudent) {
            console.log('Something went wrong');
        } else {
            res.redirect('/students/' + newStudent.neuId);
        }
    }) 
});

// READ - show a student profile
router.get('/:neu_id', function (req, res) {
    Student.findOne({ neuId: req.params.neu_id }).populate('experiences').exec(function (err, foundStudent) {
        if (err || !foundStudent) {
            res.send('Cannot find student');
        } else {
            // render the student show template
            res.render('students/show', { student: foundStudent });
        }
    });
});

// EDIT - edit a student profile
router.get('/:neu_id/edit', function (req, res) {
    Student.findOne({ neuId: req.params.neu_id }, function (err, foundStudent) {
        if (err || !foundStudent) {
            res.send('Cannot find student');
        } else {
            // render the student edit template
            res.render('students/edit', { student: foundStudent });
        }
    });
});

// UPDATE - update a student profile
router.put('/:neu_id', function (req, res) {
    Student.findOneAndUpdate({ neuId: req.params.neu_id }, req.body.student, function (err, updatedStudent) {
        if (err || !updatedStudent) {
            res.send('Something went wrong...');
        } else {
            // redirect to the updated student profile
            res.redirect('/students/' + updatedStudent.neuId);
        }
    });
});

// DESTROY - delete a student profile
router.delete('/:neu_id', function (req, res) {
    Student.findOneAndRemove({ neuId: req.params.neu_id}, function (err) {
        if (err) {
            res.send('Something went wrong...');
        } else {
            res.send("Successfully delete the profile");
        }
    });
});

module.exports = router;