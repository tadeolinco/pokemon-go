(function() {
	'use strict';
	angular
		.module('app')
		.directive('modalAddPokemon', modalAddPokemon);

	function modalAddPokemon() {
		var directive = {
			restrict: 'E',
			templateUrl: 'app/modals/pokemon/modal-add-pokemon.html',
		}
		return directive;
	}

})();
