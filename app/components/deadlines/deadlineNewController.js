app.controller('DeadlineNewCtrl', function($scope, deadline){

    $scope.create = function(){
        if($scope.deadlineForm.$valid){

            deadline.createDeadline($scope.userCurrent.id, $scope.deadline)
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
});
