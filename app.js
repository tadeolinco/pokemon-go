'use strict';
var path        = require('path');
var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));
app.use('/bower_components', 
    express.static(path.join(__dirname, '/bower_components')));

require('./db');

var port = 3000;
app.listen(port, function() {
    console.log("Connected to port:", port);
});


module.exports = app;
