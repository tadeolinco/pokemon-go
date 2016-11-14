const Gym       = require('../models/gym.model');

/* [GET] ALL USERS */
exports.getGyms = (req, res) => {
    Gym.findAll(gyms => {
        return res.status(200).json({
            gyms: gyms,
            message: 'Succefully fetched all gyms'
        });
    });
};

/* [GET] USERS BY ID */
exports.getGym = (req, res) => {
    var gym_id = req.params.gym_id;

    Gym.findOne(gym_id, gym => {
        return res.status(200).json({
            gyms: gym,
            message: 'Succefully fetched a gym'
        });
    });
}

/* [POST] USER */
exports.createGym = (req, res) => {
    var gym = req.body;

    Gym.create(gym, gym_id => {
        Gym.findOne(gym_id, newGym => {
            return res.status(201).json({
                gyms: newGym,
                message: 'Succefully created a gym'
            });
        });
    });
};

/* [PUT] USER */
exports.updateGym = (req, res) => {
    var gym = req.body;
    gym.gym_id = req.params.gym_id;

    Gym.update(gym, gym_id => {
        Gym.findOne(gym_id, newGym => {
            return res.status(200).json({
                gyms: newGym,
                message: 'Succefully updated a gyms'
            });
        });
    });
};

/* [DELETE] USER BY ID */
exports.deleteGym = (req, res) => {
    var gym_id = req.params.gym_id;

    Gym.delete(gym_id, () => {
        return res.status(204).json({
            message: 'Succefully deleted a gym'
        });
    });
}

/* [DELETE] USER BY ID */
exports.deleteGyms = (req, res) => {
    Gym.deleteAll(() => {
        return res.status(204).json({
            message: 'Succefully deleted all gyms'
        });
    });
}
