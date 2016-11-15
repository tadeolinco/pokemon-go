const Gym       = require('../models/gym.model');

/* [GET] ALL GYMS */
exports.getGyms = (req, res) => {
    Gym.findAll(gyms => {
        return res.json({
            gyms: gyms,
            message: 'Succefully fetched all gyms'
        });
    });
};

/* [GET] GYMS BY ID */
exports.getGym = (req, res) => {
    var gym_id = req.params.gym_id;

    Gym.findOne(gym_id, gym => {
        return res.json({
            gyms: gym,
            message: 'Succefully fetched a gym'
        });
    });
}

/* [POST] GYM */
exports.createGym = (req, res) => {
    var gym = req.body;

    Gym.create(gym, gym_id => {
        Gym.findOne(gym_id, newGym => {
            return res.json({
                gyms: newGym,
                message: 'Succefully created a gym'
            });
        });
    });
};

/* [PUT] GYM */
exports.updateGym = (req, res) => {
    var gym = req.body;
    gym.gym_id = req.params.gym_id;

    Gym.update(gym, gym_id => {
        Gym.findOne(gym_id, newGym => {
            return res.json({
                gyms: newGym,
                message: 'Succefully updated a gyms'
            });
        });
    });
};

/* [DELETE] GYM BY ID */
exports.deleteGym = (req, res) => {
    var gym_id = req.params.gym_id;

    Gym.delete(gym_id, () => {
        return res.json({
            message: 'Succefully deleted a gym'
        });
    });
}

/* [DELETE] ALL GYMS */
exports.deleteGyms = (req, res) => {
    Gym.deleteAll(() => {
        return res.json({
            message: 'Succefully deleted all gyms'
        });
    });
}
