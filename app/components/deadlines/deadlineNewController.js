app.controller('DeadlineNewCtrl', function($scope, deadline, $state){

    $scope.init = function(){

        testdate = new Date();
            console.log(testdate);
            console.log(Date.UTC(testdate))

        $scope.dayCurrent = new Date().getDate();
        $scope.deadline = {};
        $scope.deadline.deadline = {};
        $scope.deadline.deadline.year = new Date().getFullYear();
        $scope.deadline.deadline.month = new Date().getMonth();
        $scope.deadline.deadline.day = new Date().getDate();
        // $scope.deadline.deadline.time = new Date().getHours() + ':' + new Date().getMinutes();
        $scope.deadline.deadline.time = "23:59";
        $scope.$watch("deadline.deadline.month", function(newValue, oldValur){
            $scope.getDays($scope.deadline.deadline.year, $scope.deadline.deadline.month);
        });
            $scope.getMonths();
            $scope.getYears();
    }


    $scope.createDeadline = function(){
        if($scope.deadlineForm.$valid){
            day = $scope.deadline.deadline.day;
            month = $scope.deadline.deadline.month;
            year = $scope.deadline.deadline.year;
            hour = $scope.deadline.deadline.time.split(':')[0];
            minut = $scope.deadline.deadline.time.split(':')[1];

            $scope.deadline.deadline.deadlineDateTime = new Date(year, month, day, hour, minut);
            console.log($scope.deadline.deadline.deadlineDateTime);
            deadline.createDeadline($scope.userCurrent.id, $scope.deadline)
            .then(function(res){
                //succes
                setTimeout(function(){
                    $scope.getAll();
                    $state.go('mainon.deadlines.show', { showID: $scope.deadlineList.deadlines[0].id });
                }, 20);
            }, function(res){
                //error
            })
        }
    }

    $scope.init();
});
