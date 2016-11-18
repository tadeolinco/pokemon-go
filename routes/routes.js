const express   = require('express');
const router    = express.Router();
const UserCtrl  = require('../controllers/user.ctrl');
const auth      = require('../controllers/auth.ctrl');

router.post('/login',   UserCtrl.loginUser);
router.post('/logout',  UserCtrl.logoutUser);

/* AUTHENTICATION */
router.use(auth);
router.use('/', require('./user.route'));
router.use('/', require('./gym.route'));
router.use('/', require('./pokemon.route'));
router.use('/', require('./challenges.route'));

module.exports = router;
