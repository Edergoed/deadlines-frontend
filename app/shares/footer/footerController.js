angular.module('Deadlines')
	.controller('FooterCtrl', function ($scope) {
		$scope.year = new Date().getFullYear();
	});