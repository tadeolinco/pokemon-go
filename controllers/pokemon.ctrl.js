const Pokemon = require('../models/pokemon.model');

/* [GET] ALL USERS */
exports.getPokemons = (req, res) => {
    Pokemon.findAll(pokemons => {
        return res.status(200).json({
            pokemons: pokemons,
            message: 'Successfully fetched all pokemons'
        });
    });
};

/* [GET] USERS BY ID */
exports.getPokemon = (req, res) => {
    var pokemon_id = req.params.pokemon_id;

    Pokemon.findOne(pokemon_id, pokemon => {
        return res.status(200).json({
            pokemons: pokemon,
            message: 'Successfully fetched a pokemons'
        });
    });
}

/* [POST] USER */
exports.createPokemon = (req, res) => {
    var pokemon = req.body;

    Pokemon.create(pokemon, pokemon_id => {
        Pokemon.findOne(pokemon_id, newPokemon => {
            return res.status(201).json({
                pokemons: newPokemons,
                message: 'Successfully created a pokemon'
            });
        });
    });
};

/* [PUT] USER */
exports.updatePokemon = (req, res) => {
    var pokemon = req.body;
    pokemon.pokemon_id = req.params.pokemon_id;

    Pokemon.update(pokemon, pokemon_id => {
        Pokemon.findOne(pokemon_id, newPokemon => {
            return res.status(200).json({
                pokemons: newPokemon,
                message: 'Successfully updated a pokemon'
            });
        });
    });
};

/* [DELETE] USER BY ID */
exports.deletePokemon = (req, res) => {
    var pokemon_id = req.params.pokemon_id;

    Pokemon.delete(pokemon_id, () => {
        return res.status(204).json({
            message: 'Successfully deleted a pokemon'
        });
    });
}

/* [DELETE] USER BY ID */
exports.deletePokemons = (req, res) => {
    Pokemon.deleteAll(() => {
        return res.status(204).json({
            message: 'Successfully deleted all pokemons'
        });
    });
}
