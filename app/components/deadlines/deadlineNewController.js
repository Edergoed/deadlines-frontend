app.controller('DeadlineNewCtrl', function($scope, deadline, $state, deadlineTime, klass, user){

    $scope.availableKlasses = [];
    $scope.choices = [{'id' : 'klass1', 'value' : 0}];

    $scope.init = function(){
        $scope.dayCurrent = new Date().getDate();
        $scope.deadline = {};
        $scope.deadline.deadline = {};
        $scope.deadline.deadline.year = new Date().getFullYear();
        $scope.deadline.deadline.month = new Date().getMonth();
        $scope.deadline.deadline.day = new Date().getDate();
        $scope.deadline.deadline.time = "23:59";
        $scope.deadline.deadline.klass_ids = [];
        $scope.$watch("deadline.deadline.month", function(newValue, oldValur){
            $scope.days = deadlineTime.getDays($scope.deadline.deadline.year, $scope.deadline.deadline.month);
        });

        $scope.months = deadlineTime.getMonths();
        $scope.years = deadlineTime.getYears(new Date().getFullYear());
        $scope.weekday = deadlineTime.getWeekdays();
        $scope.getUserCurrent();
        $scope.getKlasses();
    }

    $scope.checkAvailableKlasses = function(choice) {
        for(k = 0;k < $scope.choices.length; k++){
            array = [];
            for(i = 0;i < $scope.klasses.length; i++){
                add = true;
                for(j = 0;j < $scope.choices.length; j++)
                    if($scope.klasses[i].id == $scope.choices[j].value)
                        if($scope.choices[j].value != $scope.choices[k].value)
                            add = false;
                if(add)
                    array.push($scope.klasses[i]);
            }
            $scope.availableKlasses[k] = array
            console.log($scope.availableKlasses);
        }
    };

    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.push({'id' : 'klass'+newItemNo});
        $scope.checkAvailableKlasses();
    };

    $scope.removeChoice = function(index) {
        var lastItem = $scope.choices.length-1;
        $scope.choices.splice(index,1);
        $scope.checkAvailableKlasses();
    };

    $scope.getUserCurrent = function(){
        user.getUser($scope.userCurrent.id)
        .then(function(res){
            $scope.selectedUser = res.data.user;
            $scope.choices[0]['value'] = $scope.selectedUser.klass;
            //succes
        }, function(res){
            //error
        });
    }

    $scope.getKlasses = function(){
        $scope.Loading = true;
        klass.getAllKlasses()
        .then(function(res){
            //$scope.deadlineChangeState('view');
            $scope.Loading = false;
            $scope.klasses = res.klasses;
            $scope.availableKlasses[0]= res.klasses;
            console.log($scope.klasses);
            //succes
        }, function(res){
            $scope.Loading = false;
            //error
        })
    }

    $scope.createDeadline = function(){
        $scope.error = false;
        $scope.submitted = true;
        if($scope.deadlineForm.$valid && ($scope.deadline.deadline.content != 'undefined' && $scope.deadline.deadline.content != '' && $scope.deadline.deadline.content != null)){
            day = $scope.deadline.deadline.day;
            month = $scope.deadline.deadline.month;
            year = $scope.deadline.deadline.year;
            hour = $scope.deadline.deadline.time.split(':')[0];
            minut = $scope.deadline.deadline.time.split(':')[1];

            $scope.deadline.deadline.deadlineDateTime = new Date(year, month, day, hour, minut);
            for(i = 0;i < $scope.choices.length; i++){
                console.log($scope.choices[i].value);
                $scope.deadline.deadline.klass_ids.push($scope.choices[i].value);
            }
            //console.log($scope.deadline.deadline.deadlineDateTime);
            deadline.createDeadline($scope.userCurrent.id, $scope.deadline)
            .then(function(res){
                //succes
                setTimeout(function(){
                    $scope.getAll();
                    $state.go('mainon.deadlines.show', { showID: $scope.deadlineList.deadlines[0].id });
                }, 20);

                $scope.submitted = false;
            }, function(res){
                //error
                $scope.error = true;
                $scope.submitted = false;
            })
        }
    }

    $scope.init();
});
