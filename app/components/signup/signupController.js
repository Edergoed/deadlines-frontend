'use strict';

app
.controller('SignupCtrl', function($scope, $state, $stateParams, signup, klass){
    $scope.init = function(){
        $scope.getKlasses();
        $scope.signupStep = 0;
    }

    $scope.signup = function(){
        if($scope.SignupForm.$valid){
            signup.signup($scope.user)
            .then(function(res){
                console.log("succes");
                //$state.go('main.deadlines', {});
            }, function(res){
                console.log("error");
            //error
            })
        }
    };

    $scope.activateUser = function(activationToken){
        signup.activate(activationToken)
        .then(function(res){
            console.log("succes");
            $state.go('main.deadlines', {});
        }, function(res){
            console.log("error");
            //error
        })
    };

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

    if($stateParams.activationToken != null){
        $scope.activateUser($stateParams.activationToken);
    console.log($stateParams);
    }
    $scope.init();
});
