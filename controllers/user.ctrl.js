const User = require('../models/user.model');
const crypt = require('../crypt');

/* [GET] ALL USERS */
exports.getUsers = (req, res) => {
    User.findAll(users => {
        return res.json({
            users: users,
            message: 'Successfully fetched all users'
        });
    });
};

/* [GET] USERS BY ID */
exports.getUser = (req, res) => {
    var user_id = req.params.user_id;

    User.findOne(user_id, user => {
        return res.json({
            users: user,
            message: 'Successfully fetched a user'
        });
    });
}


/* [POST] USER */
exports.registerUser = (req, res) => {
    var user = req.body;
    user.password = crypt.encrypt(user.password);

    User.create(user, user_id => {
        User.findOne(user_id, newUser => {
            return res.json({
                users: newUser,
                message: 'Successfully registered a user'
            });
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
            res.sendFile('/public/index.html', { root: __dirname+'/../' });
        } else {
            res.sendFile('/public/login.html', { root: __dirname+'/../' });
        }
    });
}

/* [POST] LOGS USER OUT */
exports.logoutUser = (req, res) => {
    delete req.session.username;
    res.sendFile('/public/login.html', { root: __dirname+'/../' });
}

/* [PUT] USER */
exports.updateUser = (req, res) => {
    var user = req.body;
    user.user_id = req.params.user_id;
    if (user.password) {
        user.password = crypt.encrypt(user.password);
    }

    User.update(user, user_id => {
        User.findOne(user_id, newUser => {
            return res.json({
                users: newUser,
                message: 'Successfully updated a user'
            });
        });
    });
};

/* [DELETE] USER BY ID */
exports.deleteUser = (req, res) => {
    var user_id = req.params.user_id;

    User.delete(user_id, () => {
        return res.json({
            message: 'Successfully deleted a user'
        });
    });
}

/* [DELETE] USER BY ID */
exports.deleteUsers = (req, res) => {
    User.deleteAll(() => {
        return res.json({
            message: 'Successfully deleted all users'
        });
    });
}
