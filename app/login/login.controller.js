(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    function loginController($http) {
        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.loginError; 

        vm.loginUser = loginUser;

        function loginUser(e) {
            e.preventDefault();
            vm.loginError = false;
            var credentials = {
                username: vm.username,
                password: vm.password
            };

            $http
                .post('/login', credentials)
                .then(response => { // success
                    console.log('Success in login method');
                    var redirect = response.data.redirect;
                    if (redirect === '/') {
                        window.location.href = redirect;
                    }else{
                        vm.loginError = true;
                    }
                }, response => { // error
                    console.log('Error in login method');
                });

        }
    }

})();
