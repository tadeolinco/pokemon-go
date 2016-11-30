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

        vm.entities = ['abra', 'aerodactyl', 'alakazam', 'arbok', 'arcanine', 'articuno', 'beedrill', 'bellsprout', 'blastoise', 'bulbasaur', 'butterfree', 'caterpie', 'chansy', 'charizard', 'charmander', 'charmeleon', 'clefable', 'clefairy', 'cloyster', 'cubone', 'dewgong', 'diglett', 'ditto', 'dodrio', 'doduo', 'dragonair', 'dragonite', 'dratini', 'drowzee', 'dugtrio', 'eevee', 'ekans', 'electabuzz', 'electrode', 'exeggcute', 'exeggutor', 'farfetchd', 'fearow', 'flareon', 'gastly', 'gengar', 'geodude', 'gloom', 'golbat', 'goldeen', 'golduck', 'golem', 'graveler', 'grimer', 'growlithe', 'gyarados', 'haunter', 'hitmonchan', 'hitmonlee', 'horsea', 'hypno', 'ivysaur', 'jigglypuff', 'jolteon', 'jynx', 'kabuto', 'kabutops', 'kadabra', 'kakuna', 'kangaskhan', 'kingler', 'koffing', 'krabby', 'lapras', 'lickitung', 'machoke', 'machop', 'magikarp', 'magmar', 'magnemite', 'magnetron', 'mankey', 'marowak', 'meowth', 'metapod', 'mew', 'mewtwo', 'moltres', 'mr-mime', 'muk', 'nidoking', 'nidoqueen', 'nidoran-female', 'nidoran-male', 'nidorina', 'nidorino', 'ninetales', 'oddish', 'omanyte', 'omastar', 'onix', 'parasect', 'paras', 'persian', 'pidgeot', 'pidgeotto', 'pidgey', 'pikachu', 'pinsir', 'poliwag', 'poliwhirl', 'poliwrath', 'ponyta', 'porygon', 'primeape', 'psyduck', 'raichu', 'rapidash', 'raticate', 'rattata', 'rhydon', 'rhyhorn', 'sandshrew', 'sandslash', 'scyther', 'seadra', 'seaking', 'seel', 'shellder', 'slowbro', 'slowpoke', 'snorlax', 'spearow', 'squirtle', 'starmie', 'staryu', 'tangela', 'tauros', 'tentacool', 'tentacruel', 'vaporeon', 'venomoth', 'venonat', 'venusaur', 'victreebel', 'vileplume', 'voltorb', 'vulpix', 'wartortle', 'weedle', 'weepinbell', 'weezing', 'wigglytuff', 'zapdos', 'zubat'];
        vm.types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

        vm.category = '';      // defaults
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

        vm.viewPokemonStop = viewPokemonStop;
        vm.editPokemon = editPokemon;
        vm.editPokemonStop = editPokemonStop;
        vm.savePokemon = savePokemon;
        vm.deletePokemon = deletePokemon;
        vm.deletePokemonConfirm = deletePokemonConfirm;


        function viewPokemonStop() {
            $('#modal-'+vm.searchType).modal('hide');
        }

        function deletePokemonConfirm(confirm) {
            if (confirm) {
                $('#pokemon-delete-confirm').modal('hide');
                for (let result of vm.results) {
                    result.data = result.data.filter(pokemon => {
                        return pokemon.pokemon_id !== vm.unit.pokemon_id;
                    });
                }
            } else {
                setTimeout(function() {
                    $('#modal-'+vm.searchType)
                        .modal('setting', {
                            closable: false,
                            detachable: false,
                            observeChanges: true,
                            duration: 300,
                        })
                        .modal('show');
                }, 1);
            }

        }

        function deletePokemon() {
            setTimeout(function() {
                $('#pokemon-delete-confirm')
                    .modal('setting', {
                        closable: false,
                        detachable: false,
                        observeChanges: true,
                        duration: 300,
                    })
                    .modal('show');
            }, 1);
        }

        function savePokemon() {
            vm.editing = false;
            var pokemon = $.extend({}, vm.unit);
            vm.unit.date_caught = dateToString(vm.unit.date_caught)
            $http
                .put('/pokemons/'+vm.unit.pokemon_id, pokemon)
                .then(response => {
                    console.log('Success in editing pokemon');
                    for (let result of vm.results) {
                        result.data = result.data.map(pokemon => {
                            if (pokemon.pokemon_id == vm.unit.pokemon_id) {
                                pokemon = vm.unit;
                            }
                            return pokemon;
                        });
                    }
                }, response => {
                    console.log('Error in editing pokemon');
                });
        }


        function editPokemonStop() {
            vm.editing = false;
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
                    }
                }
            }
            vm.editing = true;
        }

        function openModal(unit) {
            vm.unit = $.extend({}, unit);
            setTimeout(function() {
                $('#modal-'+vm.searchType)
                    .modal('setting', {
                        closable: false,
                        detachable: false,
                        observeChanges: true,
                        duration: 300,
                    })
                    .modal('show');
            }, 1);
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

        function search(e) {
            e.preventDefault();
            if (!vm.category) {
                vm.searchError = 'Please select a category';
                return;
            }

            if (vm.searching) return;


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
                                        for (let result of vm.results) {
                                            if (result && result.key === key) {
                                                console.log('pushing data: '+data);
                                                result.data.push(data);
                                                found = true;
                                                break;
                                            }
                                        }
                                        if (!found) {
                                            vm.results.push({
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
                    console.log(vm.results);
                    vm.searching = false;
                    setTimeout(function() {
                        activateTab(vm.results[0].key);
                    }, 1);


                    console.log('Success in search');
                }, response => {
                    console.log('Error in search');
                });
        }

        /************************************************************
        ADD FUNCTIONS
        ************************************************************/
        vm.country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
        vm.gyms = [];
        vm.users = [];

        //pokemon attributes
        vm.add_name = '';
        vm.add_entity = '';                
        vm.add_cp = '';
        vm.add_type1 = '';
        vm.add_type2 = '';
        vm.add_level = '';
        vm.add_datecaught = '';
        vm.add_username = '';
        vm.add_gymid = '';

        //user attributes
        vm.addu_username  = '';
        vm.addu_password  = '';
        vm.addu_name  = '';
        vm.addu_gender  = '';
        vm.addu_country  = '';
        vm.addu_dateregistered  = '';
        vm.addu_numberofgymsbattled  = '';
        vm.addu_team  = '';
        vm.addu_level  = '';

        //gym attributes
        vm.addg_name = '';
        vm.addg_country = '';
        vm.addg_numberofusersbattled = '';
        vm.addg_team = '';
        vm.addg_prestige = '';

        vm.openAddModal = openAddModal;
        vm.addToDB = addToDB;
        vm.addStop = addStop;
        vm.getGyms = getGyms;
        vm.getUsers = getUsers;

        function addToDB(param) {
            if(param === "pokemon") {
                var pokemon = {
                    name: vm.add_name, 
                    entity: vm.add_entity,                 
                    cp: vm.add_cp,
                    type1: vm.add_type1,
                    type2: vm.add_type2,
                    level: vm.add_level, 
                    date_caught: vm.add_datecaught,
                    trainer: vm.add_username,
                    gym_id: vm.add_gymid
                };
             
                $http
                    .post('/pokemons', pokemon)
                    .then(response => { // success
                        console.log('Successfully added pokemon!');
                        $('#addForm').form('clear');
                    }, response => { // error      
                        console.log('Error in adding pokemon method');
                    });
            }else if(param === "user") {
                var user = {
                    username: vm.addu_username,
                    password: vm.addu_password,
                    name: vm.addu_name,
                    gender: vm.addu_gender,
                    country: vm.addu_country,
                    date_registered: vm.addu_dateregistered,
                    number_of_gyms_battled: vm.addu_numberofgymsbattled,
                    team: vm.addu_team,
                    level: vm.addu_level
                };
             
                $http
                    .post('/register', user)
                    .then(response => { // success
                        console.log('Successfully added user!');
                        $('#addForm').form('clear');
                    }, response => { // error      
                        console.log('Error in adding user method');
                    });
            }else if(param === "gym") {
                var gym = {
                    name: vm.addg_name,
                    country: vm.addg_country,
                    number_of_users_battled: vm.addg_numberofusersbattled,
                    team: vm.addg_team,
                    prestige: vm.addg_prestige
                };
             
                $http
                    .post('/gyms', gym)
                    .then(response => { // success
                        console.log('Successfully added gym!');
                        $('#addForm').form('clear');
                    }, response => { // error      
                        console.log('Error in adding gym method');
                    });
            }

        }

        function openAddModal(param) {
            setTimeout(function() {
                $('#modal-add-' + param)
                    .modal('setting', {
                        closable: false,
                        detachable: false,
                        observeChanges: true,
                        duration: 300,
                    })
                    .modal('show');
            }, 1);
        }

        function addStop(param) {
            $('#modal-add-' + param).modal('hide');
            $('#addForm').form('clear');
        }

        function getUsers() {
            $http
                .get('/users')
                .then(response => { // success
                    console.log(response.data);
                    vm.users = response.data;
                    console.log('Successfully got users!');
                }, response => { // error      
                    console.log('Error in getting users method');
                });
        }

        function getGyms() {
            $http
                .get('/gyms')
                .then(response => { // success
                    console.log(response.data);
                    vm.gyms = response.data;            
                    console.log('Successfully got gyms!');
                }, response => { // error      
                    console.log('Error in getting gyms method');
                });
        }

    }

    function dateToString(date) {
        var string = '';
        string += date.getFullYear() + '-';
        if (date.getMonth() < 11) string += '0';
        string += (date.getMonth()+1) + '-';        
        if (date.getDate() < 10) string += '0';
        string += date.getDate();
        return string;
    }

})();
