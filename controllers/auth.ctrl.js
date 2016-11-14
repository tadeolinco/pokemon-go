const express   = require('express');
const crypt     = require('../crypt');
const User      = require('../models/user.model');

module.exports = (req, res, next) => {
    if (req.session && req.session.username) {
        next();
    } else {
        res.sendFile('/public/login.html', { root: __dirname+'/../' });
    }
}