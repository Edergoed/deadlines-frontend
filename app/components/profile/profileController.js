'use strict';

app
.controller('ProfileCtrl', function($scope, $state, auth, user){
    $scope.init = function(){
        // $scope.getKlasses();
        $scope.userAvatar = user.gravatar($scope.userCurrent.gravatar, 120);
        console.log("hello");
    }

    $scope.signout = function(){
        auth.signout();
        $state.go('signin', {});
    }

    $scope.init();
});
