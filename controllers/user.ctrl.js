const User = require('../models/user.model');
const crypt = require('../crypt');

/* [GET] ALL USERS */
exports.getUsers = (req, res) => {
    User.findAll(users => {
        return res.json(users);
    });
};

/* [GET] USERS BY ID */
exports.getUser = (req, res) => {
    var user_id = req.params.user_id;

    User.findOne(user_id, user => {
        return res.json(user);
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

    User.create(user, user_id => {
        User.findOne(user_id, newUser => {
            return res.json(newUser);
        });
    });
};

/* [POST] LOGS USER IN */
exports.loginUser = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOneByUsername(username, user => {
        if(user && password == crypt.decrypt(user.password)) {
            req.session.username = username;
            res.json({ redirect: '/' });
        } else {
            res.json({ redirect: '/login' });
        }
    });
}

/* [POST] LOGS USER OUT */
exports.logoutUser = (req, res) => {
    delete req.session.username;
    res.redirect('/login');
}

/* [PUT] USER */
exports.updateUser = (req, res) => {
    var user = req.body;
    user.user_id = req.params.user_id;
    if (user.password) {
        user.password = crypt.encrypt(user.password);
    }

    User.update(user, newUser => {
        return res.json(newUser);
    });
};

/* [DELETE] USER BY ID */
exports.deleteUser = (req, res) => {
    var user_id = req.params.user_id;

    User.delete(user_id, () => {
        return res.json({});
    });
}

/* [DELETE] USER BY ID */
exports.deleteUsers = (req, res) => {
    User.deleteAll(() => {
        return res.json({});
    });
}
