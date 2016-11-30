(function() {
	'use strict';
	angular
		.module('app')
		.directive('modalAddGym', modalAddGym);

	function modalAddGym() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/modals/pokemon/modal-add-gym.html',
		}
		return directive;
	}

})();
