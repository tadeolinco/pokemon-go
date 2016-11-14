const express   = require('express');
const UserCtrl  = require('../controllers/user.ctrl');
const router    = express.Router();

/* USER ROUTES */
router.get      ('/users',          UserCtrl.getUsers);
router.get      ('/users/:user_id', UserCtrl.getUser);
router.post     ('/users',          UserCtrl.registerUser);
router.put      ('/users/:user_id', UserCtrl.updateUser);
router.delete   ('/users/:user_id', UserCtrl.deleteUser);
router.delete   ('/users',          UserCtrl.deleteUsers);
module.exports = router;
