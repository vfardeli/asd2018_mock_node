var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var studentRoutes = require('./routes/students');
var experienceRoutes = require('./routes/experiences');

mongoose.connect('mongodb://localhost/asd2018_mock');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));

// ==========
// ROUTING
// ==========

app.use('/students', studentRoutes);
app.use('/students/:neu_id/experiences', experienceRoutes);

app.listen(1200, function() {
    console.log('Server has started...');
});