const angular = require('angular');   

angular.module('app', ['ngRoute']);

/* ROUTES */
require('angular-route');
require('./app.routes');

/* SERVICES */

/* DIRECTIVES */

/* CONTROLLERS */
require('./login/register.controller');
require('./login/login.controller');
require('./main/main.controller');
