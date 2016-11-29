(function() {
	'use strict';


	angular
		.module('app')
		.controller('navController', navController);

	function navController() {
		var vm = this;

		vm.activateLink = activateLink;
		vm.navLinks = [

			{	link: '/',			text: 'Home'	},
			{	link: '/reports',	text: 'Reports'	}
		];

		function activateLink(link) {
			for (let navItem of vm.navLinks) {
				if (navItem.link === link) {
					$('.link-' + navItem.text).addClass('active');
				}
				else {
					$('.link-' + navItem.text).removeClass('active');	
				}
			}
		}
	}

})();