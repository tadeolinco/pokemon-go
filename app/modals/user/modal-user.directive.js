(function() {
	'use strict';
	angular
		.module('app')
		.directive('modalUser', modalUser);

	function modalUser() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/modals/user/modal-user.html',
		}
		return directive;
	}

})();
