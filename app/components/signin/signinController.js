'use strict';

app
.controller('LoginCtrl', function($scope, $state, $location, auth, user){
    $scope.signin = function(){
        if($scope.signinForm.$valid){
            user.signin($scope.user)
            .then(function(res){
                //succes
                //$scope.$apply(function() {
                //});
                console.log(res);
                $scope.authenticated = true;
                //$location.path('/');
                $state.go('main.deadlines', {});
            }, function(res){
                $scope.error = res.data.errors;
                //error
            });
        }
    }

    //$scope.logout = function(){
    //    auth.logout()
    //    .then(function(res){
    //        //succes
    //        $location.path('/');
    //        console.log("click");
    //    }, function(res){
    //        //error
    //        console.log("kanker");
    //    });
    //}
});
