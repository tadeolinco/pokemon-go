(function() {
    'use strict';

    angular
        .module('app')
        .controller('mainController', mainController);

    function mainController($http) {
        var vm = this;
        vm.options = [
            { label: 'Search by User'   , value: 'users' },
            { label: 'Search by Pokemon', value: 'pokemons' },
            { label: 'Search by Gym'    , value: 'gyms' },
        ];

<<<<<<< HEAD
        vm.entities = ['abra', 'aerodactyl', 'alakazam', 'arbok', 'arcanine', 'articuno', 'beedrill', 'bellsprout', 'blastoise', 'bulbasaur', 'butterfree', 'caterpie', 'chansy', 'charizard', 'charmander', 'charmeleon', 'clefable', 'clefairy', 'cloyster', 'cubone', 'dewgong', 'diglett', 'ditto', 'dodrio', 'doduo', 'dragonair', 'dragonite', 'dratini', 'drowzee', 'dugtrio', 'eevee', 'ekans', 'electabuzz', 'electrode', 'exeggcute', 'exeggutor', 'farfetchd', 'fearow', 'flareon', 'gastly', 'gengar', 'geodude', 'gloom', 'golbat', 'goldeen', 'golduck', 'golem', 'graveler', 'grimer', 'growlithe', 'gyarados', 'haunter', 'hitmonchan', 'hitmonlee', 'horsea', 'hypno', 'ivysaur', 'jigglypuff', 'jolteon', 'jynx', 'kabuto', 'kabutops', 'kadabra', 'kakuna', 'kangaskhan', 'kingler', 'koffing', 'krabby', 'lapras', 'lickitung', 'machoke', 'machop', 'magikarp', 'magmar', 'magnemite', 'magnetron', 'mankey', 'marowak', 'meowth', 'metapod', 'mew', 'mewtwo', 'moltres', 'mr-mime', 'muk', 'nidoking', 'nidoqueen', 'nidoran-female', 'nidoran-male', 'nidorina', 'nidorino', 'ninetales', 'oddish', 'omanyte', 'omastar', 'onix', 'parasect', 'paras', 'persian', 'pidgeot', 'pidgeotto', 'pidgey', 'pikachu', 'pinsir', 'poliwag', 'poliwhirl', 'poliwrath', 'ponyta', 'porygon', 'primeape', 'psyduck', 'raichu', 'rapidash', 'raticate', 'rattata', 'rhydon', 'rhyhorn', 'sandshrew', 'sandslash', 'scyther', 'seadra', 'seaking', 'seel', 'shellder', 'slowbro', 'slowpoke', 'snorlax', 'spearow', 'squirtle', 'starmie', 'staryu', 'tangela', 'tauros', 'tentacool', 'tentacruel', 'vaporeon', 'venomoth', 'venonat', 'venusaur', 'victreebel', 'vileplume', 'voltorb', 'vulpix', 'wartortle', 'weedle', 'weepinbell', 'weezing', 'wigglytuff', 'zapdos', 'zubat'];
        vm.types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

        vm.category = 'pokemons';      // defaults
=======
        vm.category = '';      // defaults
>>>>>>> b8d440358c655edfcf71f01992c75b2925dc4a05
        vm.input = '';
        vm.results = [];
        vm.searching = false;
        vm.editing = false;
        vm.searchType = '';
        vm.unit = null;
        vm.searchError = 'Search by...';

        vm.search = search;
        vm.openModal = openModal;
        vm.activateTab = activateTab;
        vm.snakeToEng = snakeToEng;
        vm.isNone = isNone;
        vm.editPokemon = editPokemon;
        vm.savePokemon = savePokemon;

        function savePokemon() {
            vm.editing = false;
            var pokemon = $.extend({}, vm.unit);
            $http
                .put('/pokemons/'+vm.unit.pokemon_id, pokemon)
                .then(response => {
                    console.log('Success in editing pokemon');
                    console.log(response.data);
                    for (let result of vm.results) {
                        result.data = result.data.map(pokemon => {
                            if (pokemon.pokemon_id === vm.unit.pokemon_id) {
                                pokemon = response.data;
                            }
                            return pokemon;
                        });
                    }
                }, response => {
                    console.log('Error in editing pokemon');
                    
                });
        }

        function editPokemon() {
            for (let key in vm.unit) {
                if (vm.unit[key] != null) {
                    if (!isNaN(vm.unit[key])) {
                        vm.unit[key] = +vm.unit[key];    
                        continue;
                    }
                    if (new Date(vm.unit[key]).toString() !== 'Invalid Date') {
                        vm.unit[key] = new Date(vm.unit[key]);
                        console.log('MADE DATE');
                    }
                }
            }
            vm.editing = true;
        }

        function openModal(unit) {
            vm.unit = $.extend({}, unit);
            $('#modal-'+vm.searchType).modal('show');
        }

        function activateTab(key) {
            for (let result of vm.results) {
                if (result.key === key) {
                    $('.tab-'+result.key).addClass('active');
                } else {
                    $('.tab-'+result.key).removeClass('active');
                }
            }
        }

        function snakeToEng(key) {
            var splitter = (key.includes('_'))? '_' : '-';
            var keySplitted = key.split('_');
            var field = '';
            for (let key of keySplitted) {
                if (field) field += ' ';
                field += key.charAt(0).toUpperCase() + key.slice(1);
            }
            return field;
        }

        function isNone(value) {
            if (value) {
                return value;
            }
            return 'None';
        }

        function search() {

            if (!vm.category) {
                vm.searchError = 'Please select something';
                return;
            }


            vm.results = [];
            vm.searching = true;
            console.log('/'+vm.category);
            $http
                .get('/'+vm.category)
                .then(response => {
                    // treats each string delimited by a comma a seperate search input
                    var inputs = vm.input.split(',').map(input => {
                        return input.trim().toLowerCase();
                    }).filter(input => {
                        return input !== 'null';
                    });
                    var results = [];
                    for (let data of response.data) {
                        var typeFound = false;
                        for (let key in data) {
                            if (key === 'type2' && typeFound) continue;
                            if (data.hasOwnProperty('pokemon_id') && (key === 'user_id' || key === 'gym_id'))
                                continue;
                            if (key !== 'password' && data[key]) {
                                for (let input of inputs) {
                                    if (data[key].toLowerCase().includes(input)) {
                                        if (!isNaN(data[key])) data[key] = +data[key];
                                        if (key === 'type1' || key === 'type2') {
                                            key = key.slice(0, -1);
                                            typeFound = true;
                                        }
                                        var field = snakeToEng(key);
                                        var found = false;
                                        for (let result of results) {
                                            if (result && result.key === key) {
                                                result.data.push(data);
                                                found = true;
                                                break;
                                            }
                                        }
                                        if (!found) {
                                            results.push({
                                                key: key,
                                                field: field,
                                                data: [data]
                                            });
                                        }
                                        
                                    }
                                }
                            }
                            if (key === 'username') vm.searchType = 'user';
                            if (key === 'pokemon_id') vm.searchType = 'pokemon';
                            if (key === 'prestige') vm.searchType = 'gym';
                        }
                    }
                    vm.results = results;
                    console.log(vm.results);
                    vm.searching = false;
                    


                    console.log('Success in search');
                }, response => {
                    console.log('Error in search');
                });
        }
    }

})();
