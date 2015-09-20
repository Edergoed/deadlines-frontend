app.controller('DeadlineShowCtrl', function($scope, $stateParams, deadline){

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

    if($stateParams.showID != null){
        $scope.getDeadline($stateParams.showID);
    }
});
