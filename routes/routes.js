const express   = require('express');
const router    = express.Router();
const UserCtrl  = require('../controllers/user.ctrl');
const auth      = require('../controllers/auth.ctrl');
const ViewCtrl  = require('../controllers/view.ctrl');

router.get('/login',    ViewCtrl.login);
router.post('/login',   UserCtrl.loginUser);
router.post('/logout',  UserCtrl.logoutUser);

/* AUTHENTICATION */
//router.use(auth);

router.get('/', ViewCtrl.index);
router.use('/', require('./user.route'));
router.use('/', require('./gym.route'));
router.use('/', require('./pokemon.route'));
router.use('/', require('./challenges.route'));
router.use('*', (req, res) => {
    res.status(404).sendFile('/views/404.html', { root: __dirname+'/..'});
});
module.exports = router;
