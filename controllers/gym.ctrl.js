const Gym       = require('../models/gym.model');

/* [GET] ALL GYMS */
exports.getGyms = (req, res) => {
    Gym.findAll(gyms => {
        return res.json(gyms);
    });
};

/* [GET] GYMS BY ID */
exports.getGym = (req, res) => {
    var gym_id = req.params.gym_id;

    Gym.findOne(gym_id, gym => {
        return res.json(gym);
    });
}

exports.getChallengedByUser = (req, res) => {
    var user_id = req.params.user_id;

    Gym.findChallengedByUser(user_id, gyms => {
        return res.json(gyms);
    });
}

/* [POST] GYM */
exports.createGym = (req, res) => {
    var gym = req.body;

    Gym.create(gym, gym_id => {
        Gym.findOne(gym_id, newGym => {
            return res.json(newGym);
        });
    });
};

/* [PUT] GYM */
exports.updateGym = (req, res) => {
    var gym = req.body;
    gym.gym_id = req.params.gym_id;

    Gym.update(gym, newGym => {
        return res.json(newGym);
    });
};

/* [DELETE] GYM BY ID */
exports.deleteGym = (req, res) => {
    var gym_id = req.params.gym_id;

    Gym.delete(gym_id, () => {
        return res.json({});
    });
}

/* [DELETE] ALL GYMS */
exports.deleteGyms = (req, res) => {
    Gym.deleteAll(() => {
        return res.json({});
    });
}
