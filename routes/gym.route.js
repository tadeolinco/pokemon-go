const express   = require('express');
const GymCtrl  = require('../controllers/gym.ctrl');
const router    = express.Router();

/* USER ROUTES */
router.get      ('/gyms',           GymCtrl.getGyms);
router.get      ('/gyms/:gym_id',   GymCtrl.getGym);
router.post     ('/gyms',           GymCtrl.createGym);
router.put      ('/gyms/:gym_id',   GymCtrl.updateGym);
router.delete   ('/gyms/:gym_id',   GymCtrl.deleteGym);
router.delete   ('/gyms',           GymCtrl.deleteGyms);
module.exports = router;
