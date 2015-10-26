'use strict';

app
.controller('SignupCtrl', function($scope, $state, $stateParams, user, signup, klass){
	var self = this;

    $scope.init = function(){
        $scope.getKlasses();
        $scope.step = 0;
    }

    $scope.signup = function(){
        console.log("signup");
        if($scope.SignupForm.$valid){
            signup.signup($scope.user)
            .then(function(res){
                console.log("succes");
                console.log($scope.user);
                //$state.go('main.deadlines', {});
            }, function(res){
                console.log("error");
            //error
            })
        } else {
            console.log("form invalid");
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

    $scope.nextStep = function(){
        console.log("nextstep");
        if ($scope.step == 0){
            if (!$scope.SignupForm.email.$error.email && $scope.user.email != null){
                self.genName();
                ++ $scope.step;
            }
        } else if ($scope.step == 1){
            if (!$scope.SignupForm.firstname.$error.required && !$scope.SignupForm.lastname.$error.required){
                ++ $scope.step;
            }
        } else if ($scope.step == 2){
            console.log($scope.SignupForm.password.$error);
            console.log($scope.SignupForm.confirm_password.$error);
            if (!$scope.SignupForm.password.$error.required && !$scope.SignupForm.confirm_password.$error.required && !$scope.SignupForm.confirm_password.$error.passwordVerify){
                ++ $scope.step;
            }
        } else if ($scope.step == 3){
            if ($scope.user.klass != null){
//                $scope.signup();
                ++ $scope.step;
            }
        } else if ($scope.step == 4){
        }
    }

    self.genName = function(){

        console.log($scope.user.email);
        var mail = ($scope.user.email).split("@")[0];
        console.log(mail);
        var name = mail.split(".");
        console.log(name);
        $scope.user.firstname = name[0].charAt(0).toUpperCase() + name[0].slice(1).toLowerCase();
        $scope.user.lastname = name[1].charAt(0).toUpperCase() + name[1].slice(1).toLowerCase();
    }

    if($stateParams.activationToken != null){
        $scope.activateUser($stateParams.activationToken);
    console.log($stateParams);
    }

    $scope.init();
});
