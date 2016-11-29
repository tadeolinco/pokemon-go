const angular = require('angular');   

angular.module('app', ['ngRoute']);

/* ROUTES */
require('angular-route');
require('./app.routes');

/* SERVICES */

/* DIRECTIVES */
require('./modals/gym/modal-gym.directive');
require('./modals/user/modal-user.directive');
require('./modals/pokemon/modal-pokemon.directive');

/* CONTROLLERS */
require('./login/register.controller');
require('./nav/nav.controller');
require('./login/login.controller');
require('./main/main.controller');
