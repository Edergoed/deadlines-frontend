'use strict';

app.controller('MainonCtrl', function($scope, $location, $state, auth, user){

    $scope.userCurrent = user.current();
    $scope.$watch('authenticated', function(newVal, oldVal) {
//            console.log(newVal, oldVal);
    });

    if($scope.userCurrent == false){
 //       console.log('yay' + $scope.userCurrent);
        //$state.go('welcome', {});
    }

    if($scope.userCurrent != false){
        $scope.authenticated = true;
    }

    $scope.init = function(){
        $scope.authenticated = false;
    }

    $scope.gravatar = function(hash, size){
        return user.gravatar(hash, size);
    }


    $scope.init();
});
