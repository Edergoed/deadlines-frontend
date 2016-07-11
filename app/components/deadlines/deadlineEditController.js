app.controller('DeadlineEditCtrl', function($scope, $state, $stateParams, deadline, deadlineTime, klass, klasses){

    $scope.init = function(){
    $scope.availableKlasses = [];
    $scope.klasses = klasses.klasses;
    $scope.choices = [];
        // $scope.getKlasses();
        if($stateParams.editID != null){
            $scope.getDeadline($stateParams.editID);
        }
    }

    $scope.updateDeadline = function(){
        //console.log('kanekr dope');
        if($scope.deadlineForm.$valid){
            day = $scope.selectedDeadline.deadline.day
            month = $scope.selectedDeadline.deadline.month
            year = $scope.selectedDeadline.deadline.year
            hour = $scope.selectedDeadline.deadline.time.split(':')[0];
            minut = $scope.selectedDeadline.deadline.time.split(':')[1];

            $scope.selectedDeadline.deadline.deadlineDateTime = new Date(year, month, day, hour, minut);
            $scope.selectedDeadline.deadline.klass_ids = [];
            for(i = 0;i < $scope.choices.length; i++){
                console.log($scope.choices[i].value);
                $scope.selectedDeadline.deadline.klass_ids.push($scope.choices[i].value);
            }
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

    $scope.checkAvailableKlasses = function(choices) {
        for(k = 0;k < choices.length; k++){
            array = [];
            for(i = 0;i < $scope.klasses.length; i++){
                add = true;
                for(j = 0;j < choices.length; j++)
                    if($scope.klasses[i].id == choices[j].value)
                        if(choices[j].value != choices[k].value)
                            add = false;
                if(add)
                    array.push($scope.klasses[i]);
            }
            $scope.availableKlasses[k] = array
        }
    };

    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.push({'id' : 'klass'+newItemNo});
        $scope.checkAvailableKlasses($scope.choices);
    };

    $scope.removeChoice = function(index) {
        var lastItem = $scope.choices.length-1;
        $scope.choices.splice(index,1);
        $scope.checkAvailableKlasses($scope.choices);
    };

    $scope.getKlasses = function(){
        $scope.Loading = true;
        klass.getAllKlasses()
        .then(function(res){
            //$scope.deadlineChangeState('view');
            $scope.Loading = false;
            $scope.klasses = res.klasses;
            $scope.availableKlasses[0]= res.klasses;
            //succes
        }, function(res){
            $scope.Loading = false;
            //error
        })
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
                $scope.days = deadlineTime.getDays($scope.selectedDeadline.deadline.year, $scope.selectedDeadline.deadline.month);
            });
            for(i = 0;i < $scope.selectedDeadline.deadline.klass_ids.length; i++){
                var newItemNo = $scope.choices.length+1;
                $scope.choices.push({'id' : 'klass'+newItemNo, 'value' : $scope.selectedDeadline.deadline.klass_ids[i]});
            }

            $scope.checkAvailableKlasses($scope.choices);
            $scope.Loading = false;
            //succes
        }, function(res){
            $scope.Loading = false;
            //error
        })
    }

    $scope.getDate = function(date){
        date = new Date( Date.parse(date));
        $scope.selectedDeadline.deadline.day = date.getDate();
        $scope.selectedDeadline.deadline.month = date.getMonth();
        $scope.selectedDeadline.deadline.year = date.getFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            $scope.selectedDeadline.deadline.time = date.getHours() + ':' + date.getMinutes() + 0 ;
        } else {
            $scope.selectedDeadline.deadline.time = date.getHours() + ':' + date.getMinutes();
        }
    }

    $scope.init();

});
