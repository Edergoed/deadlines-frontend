app.controller('SettingsCtrl', function($scope, $state, $stateParams, deadline, user){
    $scope.init = function(){
        $scope.getUserCurrent();
    }

    $scope.getUserCurrent = function(){
        user.getUser($scope.userCurrent.id)
        .then(function(res){
            $scope.userCurrent +=
            //succes
        }, function(res){
            //error
        });
    }

    $scope.init();
});
