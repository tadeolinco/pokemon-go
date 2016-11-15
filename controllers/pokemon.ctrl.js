const Pokemon = require('../models/pokemon.model');

/* [GET] ALL POKEMONS */
exports.getPokemons = (req, res) => {
    Pokemon.findAll(pokemons => {
        return res.json({
            pokemons: pokemons,
            message: 'Successfully fetched all pokemons'
        });
    });
};

/* [GET] POKEMONS BY ID */
exports.getPokemon = (req, res) => {
    var pokemon_id = req.params.pokemon_id;

    Pokemon.findOne(pokemon_id, pokemon => {
        return res.json({
            pokemons: pokemon,
            message: 'Successfully fetched a pokemon'
        });
    });
}

/* [POST] POKEMON */
exports.createPokemon = (req, res) => {
    var pokemon = req.body;

    Pokemon.create(pokemon, pokemon_id => {
        Pokemon.findOne(pokemon_id, newPokemon => {
            return res.json({
                pokemons: newPokemons,
                message: 'Successfully created a pokemon'
            });
        });
    });
};

/* [PUT] POKEMON */
exports.updatePokemon = (req, res) => {
    var pokemon = req.body;
    pokemon.pokemon_id = req.params.pokemon_id;

    Pokemon.update(pokemon, pokemon_id => {
        Pokemon.findOne(pokemon_id, newPokemon => {
            return res.json({
                pokemons: newPokemon,
                message: 'Successfully updated a pokemon'
            });
        });
    });
};

/* [DELETE] POKEMON BY ID */
exports.deletePokemon = (req, res) => {
    var pokemon_id = req.params.pokemon_id;

    Pokemon.delete(pokemon_id, () => {
        return res.json({
            message: 'Successfully deleted a pokemon'
        });
    });
}

/* [DELETE] ALL POKEMON */
exports.deletePokemons = (req, res) => {
    Pokemon.deleteAll(() => {
        return res.json({
            message: 'Successfully deleted all pokemons'
        });
    });
}
