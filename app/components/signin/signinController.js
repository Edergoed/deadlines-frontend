'use strict';

app
.controller('LoginCtrl', function($scope, $location, auth, user){
    $scope.signin = function(){
        if($scope.signinForm.$valid){
            user.signin($scope.user)
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
