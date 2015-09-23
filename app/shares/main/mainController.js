'use strict';

app.controller('MainCtrl', function($scope, $location, auth, user){
    $scope.userCurrent = user.current();
    $scope.authenticated = false;
    $scope.$watch('authenticated', function(newVal, oldVal) {
            //console.log(newVal, oldVal);
    });

    if($scope.userCurrent != false){
        $scope.authenticated = true;
    }

    $scope.login = function(){
        if($scope.loginForm.$valid){
            user.login($scope.user)
            .then(function(res){
                //succes
                //$scope.$apply(function() {
                //});
                console.log(res);
                $scope.authenticated = true;
                $location.path('/');
            }, function(res){
                //error
            });
        }
    }

    $scope.logout = function(){
        auth.logout();
        $scope.authenticated = false;
        $location.path('/');
    }
});
