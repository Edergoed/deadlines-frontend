app.controller('DeadlineNewCtrl', function($scope, deadline, $state){

    $scope.init = function(){
        $scope.dayCurrent = new Date().getDate();
        console.log($scope.dayCurrent);
        console.log($scope.monthCurrent);
        $scope.deadline = {};
        $scope.deadline.deadline = {};
        $scope.deadline.deadline.year = new Date().getFullYear();
        $scope.deadline.deadline.month = new Date().getMonth()+1;
        $scope.deadline.deadline.day = new Date().getDate();
        // $scope.deadline.deadline.time = new Date().getHours() + ':' + new Date().getMinutes();
        $scope.deadline.deadline.time = "23:59";
        console.log($scope.deadline.deadline.month);
        $scope.$watch("deadline.deadline.month", function(newValue, oldValur){
            console.log("change");
            $scope.getDays($scope.deadline.deadline.year, $scope.deadline.deadline.month);
            console.log($scope.deadline.deadline.year + ' ' + $scope.deadline.deadline.month);
        });
            $scope.getMonths();
            $scope.getYears();
    }


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
                    $state.go('main.deadlines.show', { showID: $scope.deadlineList.deadlines[0].id });
                }, 20);
            }, function(res){
                //error
            })
        }
    }

    $scope.init();
});
