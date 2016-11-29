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

        vm.country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

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

        vm.users = [];        
        vm.gyms = [];

        vm.search = search;
        vm.openModal = openModal;
        vm.activateTab = activateTab;
        vm.snakeToEng = snakeToEng;
        vm.isNone = isNone;
        vm.getImage = getImage;

        vm.viewUnitStop = viewUnitStop;
        vm.editUnit = editUnit;
        vm.editUnitStop = editUnitStop;
        vm.saveUnit = saveUnit;
        vm.deleteUnit = deleteUnit;
        vm.deleteUnitConfirm = deleteUnitConfirm;

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
    }
})();
