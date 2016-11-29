(function() {
	'use strict';
	angular
		.module('app')
		.directive('modalPokemon', modalPokemon);

	function modalPokemon() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/modals/pokemon/modal-pokemon.html',
		}
		return directive;
	}

})();
