const express   = require('express');
const UserCtrl  = require('../controllers/user.ctrl');
const router    = express.Router();

/* USER ROUTES */
router.get      ('/users',                      UserCtrl.getUsers);
router.get      ('/users/:username',             UserCtrl.getUser);
router.get      ('/users/:gym_id/challenges',   UserCtrl.getChallenging);
router.get      ('/users-best/',                  UserCtrl.getBest);
router.put      ('/users/:username',             UserCtrl.updateUser);
router.delete   ('/users/:username',             UserCtrl.deleteUser);
router.delete   ('/users',                      UserCtrl.deleteUsers);
module.exports = router;
