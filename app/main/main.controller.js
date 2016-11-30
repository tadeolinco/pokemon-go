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

        vm.searchCategory = '';
        vm.category = '';      // defaults
        vm.input = '';
        vm.results = [];
        vm.searching = false;
        vm.editing = false;
        vm.category = '';
        vm.unit = null;
        vm.searchError = 'Search by...';
        vm.keys = [];

        vm.users = [];        
        vm.gyms = [];

        vm.search = search;
        vm.openModal = openModal;
        vm.activateTab = activateTab;
        vm.snakeToEng = snakeToEng;
        vm.isNone = isNone;
        vm.getImage = getImage;
        vm.sorting = sorting;

        vm.viewUnitStop = viewUnitStop;
        vm.editUnit = editUnit;
        vm.editUnitStop = editUnitStop;
        vm.saveUnit = saveUnit;
        vm.deleteUnit = deleteUnit;
        vm.deleteUnitConfirm = deleteUnitConfirm;

        vm.flagForAdd = 0; 
        vm.enableAddButton = enableAddButton;

        initialize();

        function initialize() {
            $http
                .get('/users')
                .then(response => {
                    console.log('success init users');
                    vm.users = response.data;
                }, response => {
                    console.log('error init users');
                });
            $http
                .get('/gyms')
                .then(response => {
                    console.log('success init gyms');
                    vm.gyms = response.data;
                }, response => {
                    console.log('error init gyms');
                });
            
        }

        function enableAddButton() {
            
            if (vm.flagForAdd == 0) {
                $('.fab-three')
                    .transition({
                        animation   : 'scale',
                        reverse     : 'auto',
                        interval    : 200
                    })
                ;
            
                vm.flagForAdd = 1;
                return;
            }

            if (vm.flagForAdd == 1) {
                $('.fab-three')
                    .transition({
                        animation   : 'scale',
                        reverse     : 'auto',
                        interval    : 200
                    })
                ;
            
                vm.flagForAdd = 0;
                return;
            }
            
        }

        function viewUnitStop() {
            $('#modal-'+vm.category).modal('hide');
        }

        function deleteUnitConfirm(confirm) {
            if (confirm) {
                $('#delete-confirm-'+vm.category).modal('hide');
                var id = '';
                switch (vm.category) {
                    case 'users': id = vm.unit.username; break;
                    case 'pokemons': id = vm.unit.pokemon_id; break;
                    case 'gyms': id = vm.unit.gym_id; break;
                }


                $http
                    .delete('/'+vm.category+'/'+id)
                    .then(response => {
                        for (let result of vm.results) {
                            result.data = result.data.filter(unit => {
                                switch (vm.category) {
                                    case 'users': return unit.username != vm.unit.username;
                                    case 'pokemons': return unit.pokemon_id != vm.unit.pokemon_id;
                                    case 'gyms': return unit.gym_id != vm.unit.gym_id;
                                }
                            });
                        }
                        console.log('Success in delete unit');
                    }, response => {
                        console.log('Error in delete unit');
                    });
            } else {
                setTimeout(function() {
                    $('#modal-'+vm.category)
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

        function deleteUnit() {
            setTimeout(function() {
                $('#delete-confirm-'+vm.category)
                    .modal('setting', {
                        closable: false,
                        detachable: false,
                        observeChanges: true,
                        duration: 300,
                    })
                    .modal('show');
            }, 1);
        }

        function saveUnit() {
            vm.editing = false;
            var unit = $.extend({}, vm.unit);
            if (vm.unit.date_caught)
                vm.unit.date_caught = dateToString(vm.unit.date_caught)
            if (vm.unit.date_registered)
                vm.unit.date_registered = dateToString(vm.unit.date_registered)

            var id = '';
            switch (vm.category) {
                case 'users': id = vm.unit.username; break;
                case 'pokemons': id = vm.unit.pokemon_id; break;
                case 'gyms': id = vm.unit.gym_id; break;
            }

            $http
                .put('/'+vm.category+'/'+id, unit)
                .then(response => {
                    console.log('Success in editing unit');
                    for (let result of vm.results) {
                        result.data = result.data.map(unit => {
                            if ((vm.category === 'users' && unit.username == vm.unit.username)
                            || (vm.category === 'pokemons' && unit.pokemon_id == vm.unit.pokemon_id)
                            || (vm.category === 'gyms' && unit.gym_id == vm.unit.gym_id)) {
                                unit = vm.unit;
                            }
                            return unit;
                        });
                    }
                }, response => {
                    console.log('Error in editing unit');
                });
        }


        function editUnitStop() {
            if (vm.unit.date_caught)
                vm.unit.date_caught = dateToString(vm.unit.date_caught)
            if (vm.unit.date_registered)
                vm.unit.date_registered = dateToString(vm.unit.date_registered)
            vm.editing = false;
        }
        
        function editUnit() {
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
            console.log(vm.category);
            vm.unit = $.extend({}, unit);
            setTimeout(function() {
                $('#modal-'+vm.category)
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
            changeSort(key);
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
            vm.category = vm.searchCategory;
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
                                            vm.keys.push(key);
                                            vm.results.push({
                                                key: key,
                                                field: field,
                                                data: [data]
                                            });
                                        }
                                        
                                    }
                                }
                            }
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

        //ADD FUNCTIONS
        
        //flags
        var add_valid = true;
        vm.add_success;
        vm.add_error;
        vm.add_duplicate;

        vm.openAddModal = openAddModal;
        vm.addToDB = addToDB;
        vm.addStop = addStop;
        
        function addToDB(param) {
            add_valid = true;
            vm.add_success = false;
            vm.add_error = false;
            vm.add_duplicate = false;      
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

                for(var key in pokemon){
                    if(pokemon[key] === ""){
                        add_valid = false;
                    };
                }
                if(add_valid){
                    $http
                        .post('/pokemons', pokemon)
                        .then(response => { // success
                            vm.add_success = true; 
                            console.log('Successfully added pokemon!');
                            fieldDefaults(param);
                            addStop(param);
                            openAddModal('confirm');                            
                        }, response => { // error
                            vm.add_error = true;      
                            console.log('Error in adding pokemon method');
                        });
                }else{
                    vm.add_error = true;      
                }
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

                for(var key in user){
                    if(user[key] === ""){
                        add_valid = false;
                    };
                }
                if(add_valid){
                    $http
                        .post('/register', user)
                        .then(response => { // success
                            console.log(response.data);
                            if (response.data === "NULL") {
                                vm.add_duplicate = true;
                                console.log("Duplicate username");
                            }else {   
                                console.log('Successfully registered!');
                                vm.add_success = true;                                
                                fieldDefaults(param);
                                addStop(param);
                                openAddModal('confirm');
                            }
                        }, response => { // error      
                            vm.add_error = true;
                            console.log('Error in register method');
                        });
                }else{
                    vm.add_error = true;
                }

            }else if(param === "gym") {
                var gym = {
                    name: vm.addg_name,
                    country: vm.addg_country,
                    number_of_users_battled: vm.addg_numberofusersbattled,
                    team: vm.addg_team,
                    prestige: vm.addg_prestige
                };

                for(var key in gym){
                    if(gym[key] === ""){
                        add_valid = false;
                    };
                }
                
                if(add_valid){
                    $http
                        .post('/gyms', gym)
                        .then(response => { // success
                            vm.add_success = true;   
                            console.log('Successfully added gym!');
                            fieldDefaults(param);
                            addStop(param);
                            openAddModal('confirm');                            
                        }, response => { // error  
                            vm.add_error = true;
                            console.log('Error in adding gym method');
                        });
                }else{
                    vm.add_error = true;
                }
            }
        }

        function openAddModal(param) {
            fieldDefaults(param);
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

        function fieldDefaults(param) {
            if (param === "pokemon"){
                //pokemon attributes
                vm.add_name = '';
                vm.add_entity = vm.entities[0];                
                vm.add_cp = '';
                vm.add_type1 = vm.types[0];
                vm.add_type2 = 'NULL';
                vm.add_level = '';
                vm.add_datecaught = '';
                vm.add_username = vm.users[1].username;
                vm.add_gymid = vm.gyms[0].gym_id;

            }else if(param === "user") {
                //user attributes
                vm.addu_username  = '';
                vm.addu_password  = '';
                vm.addu_name  = '';
                vm.addu_gender  = 'Male';
                vm.addu_country  = vm.country_list[0];
                vm.addu_dateregistered  = '';
                vm.addu_numberofgymsbattled  = '';
                vm.addu_team  = 'NULL';
                vm.addu_level  = '';
            }else if(param === "gym"){
                //gym attributes
                vm.addg_name = '';
                vm.addg_country = vm.country_list[0];
                vm.addg_numberofusersbattled = '';
                vm.addg_team = 'NULL';
                vm.addg_prestige = '';
            }
        }

        function addStop(param) {
            $('#modal-add-' + param).modal('hide');
            add_valid = true;
            vm.add_success = false;
            vm.add_error = false;
            vm.add_duplicate = false;             
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

        function getImage(unit) {
            if (!unit) return;
            var string = '';
            if (vm.category === 'users') {
                if (unit.gender === 'Male') string += 'm';
                else string += 'f';
                string += unit.username.length % 7;
                return string;
            }
            else if (vm.category === 'gyms') {
                string += 'g';
                string += unit.name.length % 8;
                return string;
            }
        }

        function sorting(sortKey) {
            for (let key of vm.keys) {
                if (key.includes(sortKey)) {
                    return key;
                }
            }
        }

        function changeSort(sortKey) {
            if ($('.tab-'+sortKey).hasClass('active')) {
                console.log('sorting changed');
                for (let i=0; i<vm.keys.length; i++) {
                    if (vm.keys[i].includes(sortKey)) {
                        if (vm.keys[i][0] === '-') {
                            vm.keys[i] = sortKey;
                        } else {
                            vm.keys[i] = '-' + sortKey;
                        }
                        break;
                    }
                }
            }
        }
    }
})();
