app.controller('DeadlineNewCtrl', function($scope, deadline){

    $scope.init = function(){
        $scope.dayCurrent = new Date().getDate();
        console.log($scope.dayCurrent);
        console.log($scope.monthCurrent);
        $scope.deadline = {};
        $scope.deadline.deadline = {};
        $scope.deadline.deadline.year = new Date().getFullYear();
        $scope.deadline.deadline.month = new Date().getMonth()+1;
        $scope.deadline.deadline.day = new Date().getDate();
        $scope.deadline.deadline.time = new Date().getHours() + ':' + new Date().getMinutes();
        console.log($scope.deadline.deadline.month);
        $scope.$watch("deadline.deadline.month", function(newValue, oldValur){
            console.log("change");
            $scope.getDays($scope.deadline.deadline.year, $scope.deadline.deadline.month);
            console.log($scope.deadline.deadline.year + ' ' + $scope.deadline.deadline.month);
        });
            $scope.getMonths();
            $scope.getYears();
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

    $scope.getMonths = function(){

        $scope.months = [
            {'id': 1, 'name': 'January'},
            {'id': 2, 'name': 'February'},
            {'id': 3, 'name': 'March'},
            {'id': 4, 'name': 'April'},
            {'id': 5, 'name': 'May'},
            {'id': 6, 'name': 'June'},
            {'id': 7, 'name': 'July'},
            {'id': 8, 'name': 'August'},
            {'id': 9, 'name': 'September'},
            {'id': 10, 'name': 'October'},
            {'id': 11, 'name': 'November'},
            {'id': 12, 'name': 'December'},
        ];

    }

    $scope.getYears = function(){
        $scope.years =[
            new Date().getFullYear(),
            new Date().getFullYear()+1,
            new Date().getFullYear()+2
        ]
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
