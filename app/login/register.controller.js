(function() {
    'use strict';

    angular
        .module('app')
        .controller('regController', regController);        

    function regController($http) {
        var vm = this;
        var users = [];
        vm.name = '';
        vm.username = '';
        vm.password = '';
        vm.sex = '';
        vm.country = '';
        vm.success;
        vm.error;
        vm.dupError;
        vm.country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
      
        vm.regUser = regUser;


        function regUser(e) {
            e.preventDefault();
            var isValid = true;


            if(vm.success || vm.error || vm.dupError){
                vm.success = false;
                vm.error = false;
                vm.dupError = false;
            }            

            if(!vm.name || !vm.username || !vm.password || !vm.sex || !vm.country){
                isValid = false;
                vm.error = true;
            } 

            var information = {
                name: vm.name, 
                username: vm.username,                 
                password: vm.password,
                gender: vm.sex,
                country: vm.country,
                number_of_gyms_battled: 0, 
                date_registered: new Date(),
                team: 'NULL',
                level: 1
            };

            if (isValid){
                $http
                    .post('/register', information)
                    .then(response => { // success
                        console.log(response.data);
                        if (response.data === "NULL") {
                            vm.dupError = true;
                            console.log("Duplicate username");
                        }else {
                            vm.name = null;
                            vm.username = null;
                            vm.password = null;
                            vm.sex = null;
                            vm.country = null; 
                            console.log('Successfully registered!');
                            vm.success = true;                           
                        }
                    }, response => { // error      
                        vm.error = true;
                        vm.name = '';
                        vm.username = '';
                        vm.password = '';
                        vm.sex = '';
                        vm.country = '';
                        console.log('Error in register method');
                    });

            }

        }

    }

})();

