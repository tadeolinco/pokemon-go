const db    = require('../db');

/* Returns all user tuples */
exports.findAll = (cb) => {
    db.query('SELECT * FROM user', (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
}

exports.findOneByUsername = (username, cb) => {
    db.query('SELECT * FROM user where username = ?', [username], (err, rows) => {
        if (err) throw err;
        return cb(rows[0]);
    });
}

/* Returns a user tuple specificed by its user_id */
exports.findOne = (user_id, cb) => {
    db.query('SELECT * FROM user WHERE user_id = ?', [user_id], (err, rows) => {
        if (err) throw err;
        return cb(rows[0]);
    });
}
    
/* Posts the user, returning its user_id */
exports.create = (user, cb) => {
    db.query('INSERT INTO user VALUES(0, :name, :gender, :location, :date_registered, :number_of_gyms_battled, :team, :level, :username, :password)', user, (err, rows) => {
        if (err) throw err;
        return cb(db.lastInsertId());
    });
}

/* Updates user given by user_id */
exports.update = (user, cb) => {
    var query = 'UPDATE user SET ';
    for (key in user) {
        if (key !== 'user_id')
            query += key + ' = :' + key + ' '
    }
    query += 'WHERE user_id = :user_id';

    db.query(query, user, (err, rows) => {
        if (err) throw err;
        return cb(user.user_id);
    });
}

/* Deletes user given by user_id*/
exports.delete = (user_id, cb) => {
    db.query('DELETE FROM user WHERE user_id = ?', [user_id], (err, rows) => {
        if (err) throw err;
        return cb()
    });
}

/* Deletes all users */
exports.deleteAll = (cb) => {
    db.query('DELETE FROM user', (err, rows) => {
        if (err) throw err;
        return cb();
    });
} 
