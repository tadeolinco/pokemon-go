const Challenges = require('../models/challenges.model');

/* [GET] ALL CHALLENGES */
exports.getChallenges = (req, res) => {
    Challenges.findAll(challenges => {
        return res.json(challenges);
    })
}

/* [GET] ONE CHALLENGE */
exports.getChallenge = (req, res) => {
    var ids = req.params;
    Challenges.findOne(ids, challenge => {
        return res.json(challenge);
    });
}

/* [POST] CHALLENGE */
exports.createChallenge = (req, res) => {
    var challenge = req.body;

    Challenges.create(challenge, ids => {
        Challenges.findOne(ids, newChallenge => {
            return res.json(newChallenge);
        });
    });
}

/* [DELETE] ONE CHALLENGE */
exports.deleteChallenge = (req, res) => {
    var ids = req.params;

    Challenges.deleteOne(ids, () => {
        res.json({});
    });
}

/* [DELETE] ALL CHALLENGES */
exports.deleteChallenges = (req, res) => {
    Challenges.deleteAll(() => {
        res.json({});
    });
}
