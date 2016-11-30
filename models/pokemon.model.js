const db    = require('../db');

/* Returns all pokemon tuples */
exports.findAll = (cb) => {
    db.query('SELECT * FROM pokemon', (err, rows) => {
        if (err) throw err;
        return cb(rows);
    });
}

/* Returns a pokemon tuple specificed by its pokemon_id */
exports.findOne = (pokemon_id, cb) => {
    db.query('SELECT * FROM pokemon WHERE pokemon_id = ?', [pokemon_id], (err, rows) => {
        if (err) throw err;
        return cb(rows[0]);
    });
}
    
/* Posts the pokemon, returning its pokemon_id */
exports.create = (pokemon, cb) => {
    db.query('INSERT INTO pokemon VALUES(0, :entity, :name, :cp, :type1, :type2, :level, :date_caught, :trainer, :gym_id)', pokemon, (err, rows) => {
        if (err) throw err;
        return cb(db.lastInsertId());
    });
}

/* Updates pokemon given by pokemon_id */
exports.update = (pokemon, cb) => {

    db.query('UPDATE pokemon SET entity=:entity, name=:name, cp=:cp, type1=:type1, type2=:type2, level=:level, date_caught=str_to_date(:date_caught, "%Y-%m-%d"), trainer=:trainer, gym_id=:gym_id WHERE pokemon_id=:pokemon_id', pokemon, (err, rows) => {
        if (err) throw err;
        return cb(pokemon);
    });
}

/* Deletes pokemon given by pokemon_id*/
exports.delete = (pokemon_id, cb) => {
    db.query('DELETE FROM pokemon WHERE pokemon_id = ?', [pokemon_id], (err, rows) => {
        if (err) throw err;
        return cb()
    });
}

/* Deletes all pokemons */
exports.deleteAll = (cb) => {
    db.query('DELETE FROM pokemon', (err, rows) => {
        if (err) throw err;
        return cb();
    });
} 
