app.controller('DeadlineNewCtrl', function($scope, deadline){

    $scope.init = function(){
        $scope.deadline = {};
        $scope.deadline.deadline = {};
        $scope.deadline.deadline.year = new Date().getFullYear();
        $scope.deadline.deadline.month = new Date().getFullYear();
        $scope.$watch("deadline.deadline.month", function(newValue, oldValur){
            console.log("change");
            $scope.getDays($scope.deadline.deadline.year, $scope.deadline.deadline.month);
        });
        $scope.getDays($scope.deadline.deadline.year, $scope.deadline.deadline.month);
    }

    $scope.getDays = function(year, month){
        $scope.days = [];
        days = new Date(year, month, 0).getDate();
        console.log(month + ' is ' + days + ' long');
        for(i = 0; i < days; i++){
            $scope.days[i] = i+1;
        }
        $scope.$digest;
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
    $scope.init();
});
