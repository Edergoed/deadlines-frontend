'use strict';

app
.controller('ProfileCtrl', function($scope, $state, auth, user, klass){
    $scope.init = function(){
        $scope.getKlasses();
        $scope.userAvatar = user.gravatar($scope.userCurrent.gravatar, 120);
    }

    $scope.signout = function(){
        auth.signout();
        $state.go('signin', {});
    }

    $scope.getKlasses = function(id){
        klass.getAllKlasses(id)
        .then(function(res){
            //$scope.deadlineChangeState('view');
            $scope.klassList = klass.klassList;
            console.log($scope.klassList);
            //succes
        }, function(res){
            //error
        })
    }

    $scope.init();
});
