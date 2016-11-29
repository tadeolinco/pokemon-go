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

        function loginUser(e) {
            e.preventDefault();
            var credentials = {
                username: vm.username,
                password: vm.password
            };

            $http
                .post('/login', credentials)
                .then(response => { // success
                    console.log('Success in login method');
                    var redirect = response.data.redirect;
                    if (redirect) {
                        window.location.href = redirect;
                    }
                    window.location.href = redirect;
                }, response => { // error
                    console.log('Error in login method');
                });

        }
    }

})();
