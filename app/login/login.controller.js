module.exports = (function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    function loginController($http) {
        var vm = this;
        vm.username = '';
        vm.password = '';

        vm.loginUser = loginUser;

        function loginUser() {
            var credentials = {
                username: vm.username,
                password: vm.password
            };

            $http
                .post('/login', credentials)
                .then(response => { // success
                    console.log('Success in logging in user');
                }, response => { // error
                    console.log('Error in logging in user');
                });

        }
    }

})();
