app.controller('DeadlineNewCtrl', function($scope, deadline){

    $scope.createDeadline = function(){
        if($scope.deadlineForm.$valid){
            day = $scope.deadline.deadline.day
            month = $scope.deadline.deadline.month
            year = $scope.deadline.deadline.year
            hour = $scope.deadline.deadline.time.split(':')[0];
            minut = $scope.deadline.deadline.time.split(':')[1];

            $scope.deadline.deadline.deadlineDateTime = year + '-' +month + '-' + day + ' ' + hour + ':' + minut + ':' + '00';
            console.log($scope.deadline);
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
