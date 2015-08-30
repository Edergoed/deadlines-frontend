'use strict';

deadlinesApp
	.controller('LoginCtrl', function($scope, auth, user){
		$scope.login = function(){
			if($scope.loginForm.$valid){
				user.login($scope.user);
			}
		};
	});