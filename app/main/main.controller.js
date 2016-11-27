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

        vm.category = '';      // defaults
        vm.input = '';
        vm.results = [];
        vm.searching = false;
        vm.searchType = '';
        vm.unit = null;
        vm.searchError = 'Search by...';

        vm.search = search;
        vm.openModal = openModal;
        vm.activateTab = activateTab;
        vm.snakeToEng = snakeToEng;
        vm.isNone = isNone;

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

        function openModal(unit) {
            vm.unit = unit;
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
    }

})();
