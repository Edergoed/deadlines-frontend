app.controller('DeadlineEditCtrl', function($scope, $stateParams, deadline){

    $scope.getDeadline = function(id){
        deadline.getDeadline(id)
        .then(function(res){
            //$scope.deadlineChangeState('view');
            $scope.selectedDeadline = deadline.deadline;
            //succes
        }, function(res){
            //error
        })
    }

    $scope.updateDeadline = function(id){
        deadline.updateDeadline(id)
        .then(function(res){
            //succes
        }, function(res){
            //error
        })
    }

    if($stateParams.editID != null){
        $scope.getDeadline($stateParams.editID);
    }
});
