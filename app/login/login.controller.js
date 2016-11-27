(function() {
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
                    console.log('Success in login method');
                    var redirect = response.data.redirect;
                    if (redirect === '/') { // if logged in
                        window.location.href = response.data.redirect;
                        console.log('User logged in!');
                    } else { // if wrong credentials
                        console.log('User did not log in!');
                    }
                }, response => { // error
                    console.log('Error in login method');
                });

        }
    }

})();
