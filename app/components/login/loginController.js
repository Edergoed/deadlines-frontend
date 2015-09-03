'use strict';

app
.controller('LoginCtrl', function($scope, $location, auth, user){
	$scope.login = function(){
		if($scope.loginForm.$valid){
			user.login($scope.user)
			.then(function(res){
				// $scope.User = auth.parseJwt(auth.getToken());
				// console.log($scope.User);
				$location.path('/');
			}, function(res){
				//error
			});
		}
	};
});