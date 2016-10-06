'use strict';

app
.controller('ProfileCtrl', function($scope, $state, auth, user, klass){
    self = this;
    $scope.init = function(){
        $scope.getUserCurrent();
        $scope.getKlasses();
        $scope.userAvatar = user.gravatar($scope.userCurrent.gravatar, 120);
    }

    $scope.signout = function(){
        auth.signout();
        $state.go('mainoff.signin', {});
    }

    $scope.getKlasses = function(id){
        $scope.Loading = true;
        klass.getAllKlasses(id)
        .then(function(res){
            //$scope.deadlineChangeState('view');
            $scope.klassList = klass.klassList;
            console.log($scope.klassList);
            $scope.Loading = false;
            //succes
        }, function(res){
            $scope.Loading = false;
            //error
        })
    }

    $scope.getUserCurrent = function(){
        user.getUser($scope.userCurrent.id)
        .then(function(res){
            $scope.selectedUser = res.data.user;
            //succes
        }, function(res){
            //error
        });
    }

    $scope.updateKlass = function(){
        user.updateUserKlass($scope.selectedUser)
        .then(function(res){
            //succes
        }, function(res){
            //error
        });
    }

    $scope.init();
});
