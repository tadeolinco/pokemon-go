'use strict';
const path        = require('path');
const express     = require('express');
const session     = require('express-session');
const bodyParser  = require('body-parser');
const app         = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')));
app.use('/bower_components', 
    express.static(path.join(__dirname, '/bower_components')));

app.use(session({
    secret: 'sir regi still da best',
    resave: false,
    saveUninitialized: false
}));

require('./db');

app.use('/', require('./routes/routes'));

var port = 3000;
app.listen(port, function() {
    console.log("Connected to port:", port);
});


module.exports = app;
