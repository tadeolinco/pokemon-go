'use strict';
var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 3000;

app.listen(port, function() {
    console.log("Connected to port:", port);
});


module.exports = app;
