const db    = require('../db');

/* Returns all user tuples */
exports.findAll = (cb) => {
    db.query('SELECT * FROM user', (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
}

exports.findChallenging = (gym_id, cb) => {
    db.query('SELECT user.username, password, name, gender, country, date_registered, number_of_gyms_battled, team, level FROM user, challenges WHERE challenges.gym_id = ? and challenges.username = user.username'
    , [gym_id], (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
}

/* Returns a user tuple specificed by its username */
exports.findOne = (username, cb) => {
    db.query('SELECT * FROM user where username = ?', [username], (err, rows) => {
        if (err) throw err;
        return cb(rows[0]);
    });
}

exports.findBest = (cb) => {
    db.query('SELECT trainer, COUNT(DISTINCT entity) as count_pokemon from pokemon group by trainer', (err, rows) => {
        if (err) throw err;
        console.log(rows);
        return cb(rows);
    });
}
    
/* Posts the user, returning its username */
exports.create = (user, cb) => {
    db.query('INSERT INTO user VALUES(:username, :password, :name, :gender, :country, :date_registered, :number_of_gyms_battled, :team, :level)', user, (err, rows) => {
        if (err) throw err;
        return cb(user);
    });
}

/* Updates user given by username */
exports.update = (user, cb) => {
    db.query('UPDATE user SET password=:password, name=:name, gender=:gender, country=:country, date_registered=str_to_date(:date_registered, "%Y-%m-%d"), number_of_gyms_battled=:number_of_gyms_battled, team=:team, level=:level  WHERE username=:username', user, (err, rows) => {
        if (err) throw err;
        return cb(user);
    });
}

/* Deletes user given by username*/
exports.delete = (username, cb) => {
    db.query('DELETE FROM user WHERE username = ?', [username], (err, rows) => {
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
