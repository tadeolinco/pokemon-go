const db    = require('../db');

/* Returns all challenge tuples */
exports.findAll = (cb) => {
    db.query('SELECT * FROM challenges', (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
}

/* Returns a challenges tuple specificed by both its username and gym_id */
exports.findOne = (ids, cb) => {
    db.query('SELECT * FROM challenges WHERE username = :username AND gym_id = :gym_id', ids, (err, rows) => {
        if (err) throw err;
        return cb(rows[0]);
    });
}

/* Posts the challenge, returning its challenge_id */
exports.create = (challenge, cb) => {
    db.query('INSERT INTO challenges VALUES(:username, :gym_id)', challenge, (err, rows) => {
        if (err) throw err;
        return cb({
            username: challenge.username,
            gym_id: challenge.gym_id
        });
    });
}

/* Delete one challenge */
exports.deleteOne = (ids, cb) => {
    db.query('DELETE FROM challenges WHERE username = :username AND gym_id = :gym_id', ids, (err, rows) => {
        if (err) throw err;
        return cb();
    });
}

/* Deletes all challenges */
exports.deleteAll = (cb) => {
    db.query('DELETE FROM challenges', (err, rows) => {
        if (err) throw err;
        return cb();
    });
} 
