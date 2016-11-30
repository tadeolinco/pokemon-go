const express           = require('express');
const ChallengesCtrl    = require('../controllers/challenges.ctrl');
const router            = express.Router();

/* USER ROUTES */
router.get      ('/challenges',                      ChallengesCtrl.getChallenges);
router.get      ('/challenges/:username/:gym_id',    ChallengesCtrl.getChallenge);
router.post     ('/challenges',                      ChallengesCtrl.createChallenge);
router.delete   ('/challenges/:username/:gym_id',    ChallengesCtrl.deleteChallenge);
router.delete   ('/challenges',                      ChallengesCtrl.deleteChallenges);
module.exports = router;
