const db    = require('../db');

/* Returns all gym tuples */
exports.findAll = (cb) => {
    db.query('SELECT * FROM gym', (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
}

exports.findChallengedByUser = (username, cb) => {
    db.query('SELECT gym.gym_id, name, country, number_of_users_battled, team, prestige FROM gym, challenges WHERE challenges.username = ? and challenges.gym_id = gym.gym_id'
, [username], (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
}

/* Returns a gym tuple specificed by its gym_id */
exports.findOne = (gym_id, cb) => {
    db.query('SELECT * FROM gym WHERE gym_id = ?', [gym_id], (err, rows) => {
        if (err) throw err;
        return cb(rows[0]);
    });
}
    
/* Posts the gym, returning its gym_id */
exports.create = (gym, cb) => {
    db.query('INSERT INTO gym VALUES(0, :name, :country, :number_of_users_battled, :team, :prestige)', gym, (err, rows) => {
        if (err) throw err;
        return cb(db.lastInsertId());
    });
}

/* Updates gym given by gym_id */
exports.update = (gym, cb) => {
    db.query('UPDATE gym SET name=:name, country=:country, number_of_users_battled=:number_of_users_battled, team=:team, prestige=:prestige WHERE gym_id=:gym_id', gym, (err, rows) => {
        if (err) throw err;
        return cb(gym.gym_id);
    });
}

/* Deletes gym given by gym_id*/
exports.delete = (gym_id, cb) => {
    db.query('DELETE FROM gym WHERE gym_id = ?', [gym_id], (err, rows) => {
        if (err) throw err;
        return cb()
    });
}

/* Deletes all gyms */
exports.deleteAll = (cb) => {
    db.query('DELETE FROM gym', (err, rows) => {
        if (err) throw err;
        return cb();
    });
} 
