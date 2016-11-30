(function() {
    'use strict';

    angular
        .module('app')
        .controller('reportController', reportController);

    
    function reportController($http) {
        var vm = this;
        
        const ALL_USERS = 0;
        const ALL_USERS_COUNTRY = 1;
        const ALL_GYMS_COUNTRY = 2;
        const ALL_USERS_UNIQUE = 3;
        
        vm.options = [
            { label: 'Generate report on all users'   , value: ALL_USERS },
            { label: 'Generate report on all users based on country', value: ALL_USERS_COUNTRY },
            { label: 'Generate report on all gyms based on country'    , value: ALL_GYMS_COUNTRY },
            { label: 'Generate report on all users with highest # of unique pokemon'    , value: ALL_USERS_UNIQUE },
        ];

        vm.country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


        vm.categoryError = 'Generate report on all ...';

        vm.generate = generate;
        vm.snakeToEng = snakeToEng;

        vm.results = [];
        vm.generateCountry = ''; // default
        vm.generateCategory = ''; // default

        function generate() {
            vm.results = [];
            switch(+vm.generateCategory) {
                case ALL_USERS: getAllUsers(); break;
                case ALL_USERS_COUNTRY: getAllUsersByCountry(); break;
                case ALL_GYMS_COUNTRY: getAllGymsByCountry(); break;
                case ALL_USERS_UNIQUE: getAllUsersUniquePokemon(); break;
            }
        }

        function getAllUsers() {
            $http
                .get('/users')
                .then(response => {
                    vm.results = response.data;
                    console.log('Success in getting all users');
                }, response => {
                    console.log('Error in getting all users');
                });
        }

        function getAllUsersByCountry() {
            if (!vm.generateCountry) return;
            $http
                .get('/users')
                .then(response => {
                    vm.results = response.data.filter(unit => {
                        return unit.country == vm.generateCountry;
                    });
                    console.log('Success in getting all users by country');
                }, response => {
                    console.log('Error in getting all users by country');
                });
        }

        function getAllGymsByCountry() {
            if (!vm.generateCategory) return;
            $http 
                .get('/gyms')
                .then(response => {
                    vm.results = response.data.filter(unit => {
                        return unit.country == vm.generateCountry;
                    });
                    console.log('Success in getting all gyms by country');
                }, response => {
                    console.log('Error in getting all gyms by country');
                });
        }

        function getAllUsersUniquePokemon() {
            $http
                .get('/users-best')
                .then(response => {
                    console.log('Success in getting the best');
                    var max = 0;
                    for (let unit of response.data) {
                        if (unit.count_pokemon > max) max = unit.count_pokemon;
                    }
                    console.log(response.data);
                    var usernames= [];
                    for (let unit of response.data) {
                        if (unit.count_pokemon == max)
                            usernames.push(unit); 
                    }
                    console.log(usernames);
                    $http
                        .get('/users')
                        .then(response => {
                            console.log('Success in getting users');
                            for (let unit of response.data) {
                                for (let user of usernames) {
                                    if (unit.username == user.trainer) {
                                        unit.number_of_unique_pokemon = max;
                                        vm.results.push(unit);
                                    }
                                }
                            }
                            console.log(vm.results);
                        }, response => {
                            console.log('Success in getting users');
                        });

                }, response => {
                    console.log('Error in getting all the best');
                });
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

    }

})();
