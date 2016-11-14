const express   = require('express');
const PokemonCtrl  = require('../controllers/pokemon.ctrl');
const router    = express.Router();

/* USER ROUTES */
router.get      ('/pokemons',               PokemonCtrl.getPokemons);
router.get      ('/pokemons/:pokemon_id',   PokemonCtrl.getPokemon);
router.post     ('/pokemons',               PokemonCtrl.createPokemon);
router.put      ('/pokemons/:pokemon_id',   PokemonCtrl.updatePokemon);
router.delete   ('/pokemons/:pokemon_id',   PokemonCtrl.deletePokemon);
router.delete   ('/pokemons',               PokemonCtrl.deletePokemons);
module.exports = router;
