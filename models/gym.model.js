const db    = require('../db');

/* Returns all gym tuples */
exports.findAll = (cb) => {
    db.query('SELECT * FROM gym', (err, rows) => {
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
    db.query('INSERT INTO gym VALUES(0, :name, :location, :number_of_users_battled, :team, :prestige)', gym, (err, rows) => {
        if (err) throw err;
        return cb(db.lastInsertId());
    });
}

/* Updates gym given by gym_id */
exports.update = (gym, cb) => {
    var query = 'UPDATE gym SET ';
    for (key in gym) {
        if (key !== 'gym_id')
            query += key + ' = :' + key + ' '
    }
    query += 'WHERE gym_id = :gym_id';

    db.query(query, gym, (err, rows) => {
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
