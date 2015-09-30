'use strict';

app
.controller('ProfileCtrl', function($scope, user){
    $scope.init = function(){
        // $scope.getKlasses();
        $scope.userAvatar = user.gravatar($scope.userCurrent.gravatar, 120);
    }
});
