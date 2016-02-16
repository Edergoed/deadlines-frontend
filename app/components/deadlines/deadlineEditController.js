app.controller('DeadlineEditCtrl', function($scope, $state, $stateParams, deadline, deadlineTime, klass){

    $scope.updateDeadline = function(){
        //console.log('kanekr dope');
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
            $scope.weekday = deadlineTime.getWeekdays();
            $scope.years = deadlineTime.getYears($scope.selectedDeadline.deadline.year);
            $scope.months = deadlineTime.getMonths();
            $scope.$watch("selectedDeadline.deadline.month", function(newValue, oldValur){
                console.log("change");
                $scope.days = deadlineTime.getDays($scope.selectedDeadline.deadline.year, $scope.selectedDeadline.deadline.month);
        //$scope.$digest;
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

    $scope.getKlasses = function(id){
        $scope.Loading = true;
        klass.getAllKlasses(id)
        .then(function(res){
            //$scope.deadlineChangeState('view');
            $scope.klassList = klass.klassList;
            console.log($scope.klassList);
            $scope.Loading = false;
            //succes
        }, function(res){
            $scope.Loading = false;
            //error
        })
    }

    $scope.addAssignment = function(){
        console.log("jaja");
        newAssignment = null;
        $scope.selectedDeadline.deadline.klass_ids.push(newAssignment);
    }

    $scope.removeAssignment = function($event, klass_id){
        for(i = 0; i < $scope.selectedDeadline.deadline.klass_ids.length ;i++){
            if($scope.selectedDeadline.deadline.klass_ids[i] == klass_id){
                //remove klopt niet moet juiste versoe zoeken
                $scope.selectedDeadline.deadline.klass_ids.splice(i,1);
            }
        }
        angular.element($event.currentTarget).parent().remove();
    }

    if($stateParams.editID != null){
        $scope.getDeadline($stateParams.editID);
        $scope.getKlasses();
    }
});
