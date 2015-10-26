app.controller('DeadlineEditCtrl', function($scope, $state, $stateParams, deadline){

    $scope.updateDeadline = function(){
        console.log('kanekr dope');
        if($scope.deadlineForm.$valid){
            day = $scope.selectedDeadline.deadline.day
            month = $scope.selectedDeadline.deadline.month
            year = $scope.selectedDeadline.deadline.year
            hour = $scope.selectedDeadline.deadline.time.split(':')[0];
            minut = $scope.selectedDeadline.deadline.time.split(':')[1];

            $scope.selectedDeadline.deadline.deadlineDateTime = new Date(year, month, day, hour, minut);
            deadline.updateDeadline($scope.userCurrent.id, $scope.selectedDeadline.deadline)
            .then(function(res){
                //succes
                setTimeout(function(){
                    $scope.getAll();
                    $state.go('mainon.deadlines.show', { showID: $scope.selectedDeadline.deadline.id });
                }, 20);
            }, function(res){
                //error
            })
        }
    }

    $scope.getDeadline = function(id){
        $scope.Loading = true;
        deadline.getDeadline(id)
        .then(function(res){
            //$scope.deadlineChangeState('view');
            $scope.selectedDeadline = deadline.deadline;
            $scope.getDate($scope.selectedDeadline.deadline.deadlineDateTime);
            $scope.getYears();
            $scope.getMonths();
            $scope.$watch("deadline.deadline.month", function(newValue, oldValur){
                console.log("change");
                $scope.getDays($scope.selectedDeadline.deadline.year, $scope.selectedDeadline.deadline.month);
                console.log($scope.selectedDeadline.deadline.year + ' ' + $scope.selectedDeadline.deadline.month);
            });
            $scope.Loading = false;
            //succes
        }, function(res){
            $scope.Loading = false;
            //error
        })
    }

    $scope.getDate = function(date){
        date = new Date( Date.parse(date));
        console.log(date.toUTCString());
        $scope.selectedDeadline.deadline.day = date.getDate();
        $scope.selectedDeadline.deadline.month = date.getMonth();
        $scope.selectedDeadline.deadline.year = date.getFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            $scope.selectedDeadline.deadline.time = date.getHours() + ':' + date.getMinutes() + 0 ;
        } else {
            $scope.selectedDeadline.deadline.time = date.getHours() + ':' + date.getMinutes();
        }
    }


    if($stateParams.editID != null){
        $scope.getDeadline($stateParams.editID);
    }
});
