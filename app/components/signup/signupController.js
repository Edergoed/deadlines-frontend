'use strict';

app
.controller('SignupCtrl', function($scope, $state, signup, klass){
    $scope.init = function(){
        $scope.getKlasses();
    }

    $scope.signup = function(){
        if($scope.SignupForm.$valid){
            signup.signup($scope.user)
            .then(function(res){
                $state.go('main.deadlines', {});
            }, function(res){
            //error
            })
        }
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
    $scope.getMonths = function(){

        $scope.months = [
            {'id': 1, 'name': 'January'},
            {'id': 2, 'name': 'February'},
            {'id': 3, 'name': 'March'},
            {'id': 4, 'name': 'April'},
            {'id': 5, 'name': 'May'},
            {'id': 6, 'name': 'June'},
            {'id': 7, 'name': 'July'},
            {'id': 8, 'name': 'August'},
            {'id': 9, 'name': 'September'},
            {'id': 10, 'name': 'October'},
            {'id': 11, 'name': 'November'},
            {'id': 12, 'name': 'December'},
        ];

    }

    $scope.init();
    $scope.getMonths();
});
