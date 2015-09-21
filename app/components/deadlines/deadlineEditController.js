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

    $scope.updateDeadline = function(){
        if($scope.deadlineForm.$valid){
            deadline.updateDeadline($scope.userCurrent.id, $scope.selectedDeadline.deadline)
            .then(function(res){
                //succes
                setTimeout(function(){
                    $scope.getAll();
                }, 20);
            }, function(res){
                //error
            })
        }
    }


    if($stateParams.editID != null){
        $scope.getDeadline($stateParams.editID);
    }
});
