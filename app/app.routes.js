module.exports = (function() {
	'use strict';

	angular
		.module('app')
		.config(function($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'app/main/main.html',
					controller: 'mainController',
					controllerAs: 'main'
				});
            
		});
})();
