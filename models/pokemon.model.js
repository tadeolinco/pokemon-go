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
    db.query('INSERT INTO pokemon VALUES(0, :name, :cp, :type, :level, :date_caught, :user_id, :gym_id)', pokemon, (err, rows) => {
        if (err) throw err;
        return cb(db.lastInsertId());
    });
}

/* Updates pokemon given by pokemon_id */
exports.update = (pokemon, cb) => {
    var query = 'UPDATE pokemon SET ';
    for (key in pokemon) {
        if (key !== 'pokemon_id')
            query += key + ' = :' + key + ' '
    }
    query += 'WHERE pokemon_id = :pokemon_id';

    db.query(query, pokemon, (err, rows) => {
        if (err) throw err;
        return cb(pokemon.pokemon_id);
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
