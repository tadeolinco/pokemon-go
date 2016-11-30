(function() {
	'use strict';
	angular
		.module('app')
		.directive('modalAddUser', modalAddUser);

	function modalAddUser() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/modals/user/modal-add-user.html',
		}
		return directive;
	}

})();
