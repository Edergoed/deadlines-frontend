'use strict';

app
	.controller('SignupCtrl', function($scope, signup){
		$scope.signup = function(){
			if($scope.SignupForm.$valid){
                console.log('kanekr');
				signup.signup($scope.user);
			}
		};
	});
