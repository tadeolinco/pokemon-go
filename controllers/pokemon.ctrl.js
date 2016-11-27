const Pokemon = require('../models/pokemon.model');

/* [GET] ALL POKEMONS */
exports.getPokemons = (req, res) => {
    Pokemon.findAll(pokemons => {
        return res.json(pokemons);
    });
};

/* [GET] POKEMONS BY ID */
exports.getPokemon = (req, res) => {
    var pokemon_id = req.params.pokemon_id;

    Pokemon.findOne(pokemon_id, pokemon => {
        return res.json(pokemon);
    });
}

/* [POST] POKEMON */
exports.createPokemon = (req, res) => {
    var pokemon = req.body;

    Pokemon.create(pokemon, pokemon_id => {
        Pokemon.findOne(pokemon_id, newPokemon => {
            return res.json(newPokemon);
        });
    });
};

/* [PUT] POKEMON */
exports.updatePokemon = (req, res) => {
    var pokemon = req.body;
    pokemon.pokemon_id = req.params.pokemon_id;

    Pokemon.update(pokemon, newPokemon => {
        return res.json(newPokemon);
    });
};

/* [DELETE] POKEMON BY ID */
exports.deletePokemon = (req, res) => {
    var pokemon_id = req.params.pokemon_id;

    Pokemon.delete(pokemon_id, () => {
        return res.json({});
    });
}

/* [DELETE] ALL POKEMON */
exports.deletePokemons = (req, res) => {
    Pokemon.deleteAll(() => {
        return res.json({});
    });
}
