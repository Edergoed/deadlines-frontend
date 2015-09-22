app.controller('ArchiveCtrl', function($scope, $stateParams, deadline, user){

    $scope.init = function(){
        $scope.getAll();
    }

    $scope.getAll = function(){
        deadline.getAllDeadlines()
        .then(function(res){
            //success
            setTimeout(function(){
                //$scope.setDistance();
            }, 0);
            $scope.deadlineList = deadline.deadlineList;
        }, function(res){
            //error
        })
    }

    $scope.init();
});
