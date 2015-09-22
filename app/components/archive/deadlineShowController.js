app.controller('DeadlineShowCtrl', function($scope, $stateParams, deadline){

    $scope.getDeadline = function(id){
        deadline.getDeadline(id)
        .then(function(res){
            $scope.selectedDeadline = deadline.deadline;
            $scope.getDate($scope.selectedDeadline.deadline.deadlineDateTime);
            //succes
        }, function(res){
            //error
        })
    }

    $scope.getDate = function(date){
        date = new Date( Date.parse(date));
        console.log(date.toUTCString());
        $scope.selectedDeadline.deadline.day = date.getUTCDate();
        $scope.selectedDeadline.deadline.month = date.getUTCMonth()+1;
        $scope.selectedDeadline.deadline.year = date.getUTCFullYear();
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
