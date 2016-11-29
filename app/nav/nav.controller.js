(function() {
	'use strict';


	angular
		.module('app')
		.controller('navController', navController);

	function navController($http) {
		var vm = this;

		vm.navLinks = [

			{	link: '/',			text: 'Home'	},
			{	link: '/reports',	text: 'Reports'	}
		];
		vm.activateLink = activateLink;
		vm.logoutUser = logoutUser;

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

		function logoutUser() {
			$http
				.post('/logout')
				.then(response => {
					console.log('Success in login method');
					window.location.href = response.data.redirect;
				}, response => {
					console.log('Error in logout method');
				});
		}
	}

})();