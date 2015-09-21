app.controller('DeadlineEditCtrl', function($scope, $stateParams, deadline){

    $scope.updateDeadline = function(){
        if($scope.deadlineForm.$valid){
            day = $scope.selectedDeadline.deadline.day
            month = $scope.selectedDeadline.deadline.month
            year = $scope.selectedDeadline.deadline.year
            hour = $scope.selectedDeadline.deadline.time.split(':')[0];
            minut = $scope.selectedDeadline.deadline.time.split(':')[1];

            $scope.selectedDeadline.deadline.deadlineDateTime = year + '-' +month + '-' + day + ' ' + hour + ':' + minut + ':' + '00';
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

    if($stateParams.editID != null){
        $scope.getDeadline($stateParams.editID);
    }
});
