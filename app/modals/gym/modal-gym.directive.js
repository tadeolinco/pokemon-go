(function() {
	'use strict';
	angular
		.module('app')
		.directive('modalGym', modalGym);

	function modalGym() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/modals/gym/modal-gym.html',
		}
		return directive;
	}

})();
