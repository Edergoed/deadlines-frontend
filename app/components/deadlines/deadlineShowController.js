app.controller('DeadlineShowCtrl', function($scope, $stateParams, deadline){
    $scope.Loading = false;

    $scope.getDeadline = function(id){
        $scope.Loading = true;
        deadline.getDeadline(id)
        .then(function(res){
            $scope.selectedDeadline = deadline.deadline;
            $scope.getDate($scope.selectedDeadline.deadline.deadlineDateTime);
            //succes
            $scope.Loading = false;
        }, function(res){
            //error
            $scope.Loading = false;
        })
    }

    $scope.getDate = function(date){
        date = new Date( Date.parse(date));
        $scope.selectedDeadline.deadline.date = date.getUTCDate() + '-' + (date.getUTCMonth()+1) + '-' + date.getUTCFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            $scope.selectedDeadline.deadline.time = date.getUTCHours() + ':' + date.getUTCMinutes() + 0 ;
        } else {
            $scope.selectedDeadline.deadline.time = date.getUTCHours() + ':' + date.getUTCMinutes();
        }
    }

    if($stateParams.showID != null){
        $scope.getDeadline($stateParams.showID);
    }
});
