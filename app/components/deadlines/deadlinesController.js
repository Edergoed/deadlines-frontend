app.controller('DeadlinesCtrl', function($scope, $state, $stateParams, deadline, user){
    $scope.init = function(){
        $scope.getAll();
    }

    $scope.getAll = function(){
        deadline.getAllDeadlines()
        .then(function(res){
            //success
            setTimeout(function(){
                $scope.setDistance();
            }, 0);
            $scope.deadlineList = deadline.deadlineList;

            if($state.current.name == 'main.deadlines'){
                $state.go('main.deadlines.show', { showID: $scope.deadlineList.deadlines[0].id });
            }
        }, function(res){
            //error
        })
    }

    $scope.deleteDeadline = function(id){
        deadline.deleteDeadline(id)
        .then(function(res){
            $scope.getAll();
            //success
        }, function(){
            //error
        })
    }

    //colorCal

    $scope.getCol = function(){
        //console.log("getCol executed");
        var deadline = document.getElementsByClassName('deadline');
        for(i=0; i<deadline.length; i++){
            var data = deadline[i].getAttribute("data-distance");
            var changeData = deadline[i].setAttribute("data-distance", data-60);

            // var background = deadline[i].getAttribute("style");
            var newImage = $scope.colCalc(data, deadline, i);
            var changeData = deadline[i].setAttribute("style", "background-color:"+newImage);


            var day = 86400;
            if(data < day*28){
                if(data < day*7){
                    deadline[i].parentNode.setAttribute("style", "background-color: #FE2746");
                    if(data < 0){
                        var deadline_class = deadline[i].className;
                        //if($scope.aContainsB(deadline_class, 'hide_deadline')){

                        //}else{
                        //    deadline[i].className = deadline[i].className + " hide_deadline";
                        //}
                    }
                }else{
                    deadline[i].parentNode.setAttribute("style", "background-color: #FFC300");
                }
            }
        }
    }

    $scope.getTime = function(difference){
        if($( ".count_down" ).length){
            var countdown = document.getElementsByClassName('count_down');
            var unit = document.getElementsByClassName('count_down_unit');
            var deadline = document.getElementsByClassName('deadline');
            for(i=0; i<deadline.length; i++){
                var data = deadline[i].getAttribute("data-distance");
                // var background = deadline[i].getAttribute("style");
                var time = $scope.remainingCalc(data);
                countdown[i].innerHTML = time[0];
                unit[i].innerHTML = time[1];
            }
        }

    }

    $scope.remainingCalc = function(difference)
    {
        var weeks_remaining = Math.floor(difference / 604800);
        var days_remaining = Math.floor((difference % 604800)/ 86400);
        var hours_remaining = Math.floor((difference % 86400) / 3600);
        var minutes_remaining = Math.floor((difference % 3600) / 60);

        var remaining;
        var unit = '';

        if(weeks_remaining >= 1){
            remaining = weeks_remaining;
            unit = '<span>Weeks</span>';
            if(weeks_remaining == 1){
                remaining = weeks_remaining;
                unit = '<span>Week</span>';
            }
        } else if (days_remaining >= 1){
            remaining = days_remaining;
            unit = '<span>Days</span>';
            if(days_remaining == 1){
                remaining = days_remaining;
                unit = '<span>Day</span>';
            }
        } else if (hours_remaining >= 1){
            remaining = hours_remaining;
            unit = '<span>Hours</span>';
            if(hours_remaining == 1){
                remaining = hours_remaining ;
                unit = '<span>Hour</span>';
            }
        } else if (minutes_remaining >= 1){
            remaining = minutes_remaining;
            unit = '<span>Minutes</span>';
            if(minutes_remaining == 1){
                remaining = minutes_remaining;
                unit = '<span>Minutes</span>';
            }
        } else {
            remaining = 0;
            unit = '<span></span>';
        }

        remaining = ("0" + remaining).slice(-2);

        return [remaining, unit];
    }

    $scope.colCalc = function(difference, deadline, i){
        var day = 86400;
        var color = "";

        var progress = difference;
        var percentage;

        if(difference < day*28){
            percentage = ((difference-day*7) / ((day*28)-day*7));
            // percentage = (difference / (day*7));
            color = "rgba(0, 187, 211, "+ percentage +");"; //blue to yellow
            if(difference < day*7){
                percentage = (difference / (day*7));
                color = "rgba(255, 195, 0, "+ percentage +");"; //yellow to red
            }
        }else{
            color = "rgba(0, 187, 211, 1);"; //blue static
        }
        return color;
    }

    $scope.setDistance = function(){
        //console.log("setDistance executed");
        var deadline = document.getElementsByClassName('deadline');
        for(i=0; i<deadline.length; i++){
            var data = deadline[i].getAttribute("data-deadline");
            var fromTime = new Date();
            var toTime = new Date(data);

            var distance = toTime.getTime()/1000 - fromTime.getTime()/1000;
            deadline[i].setAttribute("data-distance", distance);
            // console.log("set deadline time to " + distance + " of deadline " + deadline[i] );
            // console.log(deadline.length + " "+ i + " " + fromTime + " " +toTime);
        }
            $scope.getTime();
            $scope.getCol();
            setInterval($scope.getTime, 60000);
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

    // function aContainsB (a, b) {
    //     return a.indexOf(b) >= 0;
    // }
    $scope.init();

    setTimeout(function() {
        Color = setInterval(getCol, 60000);
    }, 60000);
});
