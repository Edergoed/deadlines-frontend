app.controller('DeadlineShowCtrl', function($scope, $state, $stateParams, deadline, deadlineTime){
    $scope.Loading = false;

    $scope.getDeadline = function(id){
        $scope.Loading = true;
        deadline.getDeadline(id)
        .then(function(res){
            $scope.selectedDeadline = deadline.deadline;
            $scope.getDate($scope.selectedDeadline.deadline.deadlineDateTime);
            //succes
            $scope.Loading = false;
            $scope.$emit('arrow', $scope.selectedDeadline.deadline.id);
        }, function(res){
            //error
            $scope.Loading = false;
        })
    }

    $scope.getDate = function(date){
        date = new Date( Date.parse(date));
        $scope.weekday = deadlineTime.getWeekdays();
        $scope.selectedDeadline.deadline.day = $scope.weekday[date.getDay()] + ' ';
        $scope.selectedDeadline.deadline.date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            $scope.selectedDeadline.deadline.time = date.getHours() + ':' + date.getMinutes() + 0 ;
        } else {
            $scope.selectedDeadline.deadline.time = date.getHours() + ':' + date.getMinutes();
        }
    }

    if($stateParams.showID != null){
        $scope.getDeadline($stateParams.showID);
    }
});
