'use strict';

deadlinesApp
	.controller('SignupCtrl', function($scope, signup){
		$scope.signup = function(){
			if($scope.SignupForm.$valid){
				signup.signup($scope.user);
			}
		};
	});