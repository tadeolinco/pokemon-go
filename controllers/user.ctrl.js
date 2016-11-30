const User = require('../models/user.model');
const crypt = require('../crypt');

/* [GET] ALL USERS */
exports.getUsers = (req, res) => {
    User.findAll(users => {
        return res.json(users);
    });
};

/* [GET] USERS BY USERNAME */
exports.getUser = (req, res) => {
    var username = req.params.username;

    User.findOne(username, user => {
        return res.json(user);
    });
}

exports.getBest = (req, res) => {
    User.findBest(theBest => {
        return res.json(theBest);
    });
}

exports.getChallenging = (req, res) => {
    var gym_id = req.params.gym_id;

    User.findChallenging(gym_id, users => {
        return res.json(users);
    });
}

/* [POST] USER */
exports.registerUser = (req, res) => {
    var user = req.body;
    user.password = crypt.encrypt(user.password);

    User.create(user, newUser => {
        return res.json(newUser);
    });
};

/* [POST] LOGS USER IN */
exports.loginUser = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne(username, user => {
        if(user && password == crypt.decrypt(user.password)) {
            req.session.username = username;
            return res.status(200).json({ redirect: '/' });
        } else {
            return res.status(200).json({ redirect: '/login' });
        }
    });
}

/* [POST] LOGS USER OUT */
exports.logoutUser = (req, res) => {
    delete req.session.username;
    res.json({ redirect: '/login' });
}

/* [PUT] USER */
exports.updateUser = (req, res) => {
    var user = req.body;
    user.username = req.params.username;
    if (user.password) {
        user.password = crypt.encrypt(user.password);
    }

    User.update(user, newUser => {
        return res.json(newUser);
    });
};

/* [DELETE] USER BY ID */
exports.deleteUser = (req, res) => {
    var username = req.params.username;

    User.delete(username, () => {
        return res.json({});
    });
}

/* [DELETE] USER BY ID */
exports.deleteUsers = (req, res) => {
    User.deleteAll(() => {
        return res.json({});
    });
}
