app.controller('DeadlinesCtrl', function($scope, $state, $stateParams, deadline, user){

        $scope.Loading = false;
    $scope.init = function(){
        $scope.getAll();
        $scope.currState = $state
    }
    $scope.arrow = function(id){
        for(i = 0; i < $scope.deadlineList.deadlines.length; i++){
            //console.log($scope.deadlineList.deadlines[i].id + ' ' + id);
            if($scope.deadlineList.deadlines[i].id == id){
                $scope.deadlineList.deadlines[i].selected = true;
            } else {
                $scope.deadlineList.deadlines[i].selected = false;
            }
        }
    }

    $scope.getAll = function(){
        $scope.Loading = true;
        deadline.getAllDeadlines()
        .then(function(res){
            //success
            $scope.deadlineList = deadline.deadlineList;
            $scope.$watch('currState.current.name', function(){
                //console.log($scope.deadlineList.deadlines);
                if($state.current.name == 'mainon.deadlines' && $scope.deadlineList.deadlines[0] != null){
                    $state.go('mainon.deadlines.show', { showID: $scope.deadlineList.deadlines[0].id });
                }
            });

            setTimeout(function(){
                $scope.setDistance();
                $scope.$apply();
            }, 0);

            if($scope.deadlineList.deadlines[0] != null){
            $scope.arrow($scope.deadlineList.deadlines[0].id);
            }

            $scope.Loading = false;
        }, function(res){
            //error
            $scope.Loading = false;
        })
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
        // var bg = document.getElementById('dynamic_left');
        //var bg_bottom = document.getElementById('dynamic_left_wrapper');
        //var deadline = document.getElementsByClassName('deadline');
        var deadline = $scope.deadlineList.deadlines;
        // alert(bg_bottom);
        for(i=0; i<deadline.length; i++){
            //var data = deadline[i].getAttribute("data-distance");
            var data = deadline[i].DeadlineDistance;
            //var changeData = deadline[i].setAttribute("data-distance", data-60);
            var changeData = deadline[i].DeadlineDistance = data-60;

            // var background = deadline[i].getAttribute("style");
            var newImage = $scope.colCalc(data, deadline, i);
            //var changeData = deadline[i].setAttribute("style", "background-color:"+newImage);
            var changeData = deadline[i].color = newImage;
            if(i+1 == deadline.length){
                //bg_bottom.setAttribute("style", "background-color:"+newImage);
                $scope.lastBackgroundColor = newImage;
            }

            var day = 86400;
            if(data < day*28){
                if(data < day*7){
                    deadline[i].parentNode.parentNode = '#FE2746';
                    if(i+1 == deadline.length){
                        //bg.setAttribute("style", "background-color: #FE2746");
                    }
                    if(data < 0){
                        var deadline_class = deadline[i].className;
                        //if($scope.aContainsB(deadline_class, 'hide_deadline')){

                        //}else{
                        //    deadline[i].className = deadline[i].className + " hide_deadline";
                        //}
                    }
                }else{
                    deadline[i].parentNode.parentNode = '#FFC300';
                    if(i+1 == deadline.length){
                        //bg.setAttribute("style", "background-color: #FFC300");
                        $scope.bg  = '#FFC300';
                    }
                }

            }
        }
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

    $scope.getTime = function(difference){
        if($( ".count_down" ).length){
            //var countdown = document.getElementsByClassName('count_down');
            //var unit = document.getElementsByClassName('count_down_unit');
            //var deadline = document.getElementsByClassName('deadline');
            var deadline = $scope.deadlineList.deadlines;
            for(i=0; i<deadline.length; i++){
                //var data = deadline[i].getAttribute("data-distance");
                var data = deadline[i].DeadlineDistance;
                // var background = deadline[i].getAttribute("style");
                var time = $scope.remainingCalc(data);
                deadline[i].countdown = time[0];
                deadline[i].unit = time[1];
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
            unit = 'Weeks';
            if(weeks_remaining == 1){
                remaining = weeks_remaining;
                unit = 'Week';
            }
        } else if (days_remaining >= 1){
            remaining = days_remaining;
            unit = 'Days';
            if(days_remaining == 1){
                remaining = days_remaining;
                unit = 'Day';
            }
        } else if (hours_remaining >= 1){
            remaining = hours_remaining;
            unit = 'Hours';
            if(hours_remaining == 1){
                remaining = hours_remaining ;
                unit = 'Hour';
            }
        } else if (minutes_remaining >= 1){
            remaining = minutes_remaining;
            unit = 'Minutes';
            if(minutes_remaining == 1){
                remaining = minutes_remaining;
                unit = 'Minutes';
            }
        } else {
            remaining = 0;
            unit = '';
        }

        remaining = ("0" + remaining).slice(-2);

        return [remaining, unit];
    }

    $scope.setDistance = function(){
        //console.log("setDistance executed");
        //var deadline = document.getElementsByClassName('deadline');
        var deadline = $scope.deadlineList.deadlines;
        for(i=0; i<deadline.length; i++){
            //var data = deadline[i].getAttribute("data-deadline");
            var data = deadline[i].deadlineDateTime;
            var fromTime = new Date();
            var toTime = new Date(data);

            var distance = toTime.getTime()/1000 - fromTime.getTime()/1000;
            //deadline[i].setAttribute("data-distance", distance);
            deadline[i].DeadlineDistance = distance;
            // console.log("set deadline time to " + distance + " of deadline " + deadline[i] );
            // console.log(deadline.length + " "+ i + " " + fromTime + " " +toTime);
        }
        $scope.getCol();
        $scope.getTime();
        setInterval($scope.getTime, 60000);
    }

    $scope.getDays = function(year, month){
        $scope.days = [];
        days = new Date(year, month, 0).getDate();
        for(i = 0; i < days; i++){
            $scope.days[i] = i+1;
        }
        $scope.$digest;
    }

    $scope.getMonths = function(){

        $scope.months = [
            {'id': 0, 'name': 'January'},
            {'id': 1, 'name': 'February'},
            {'id': 2, 'name': 'March'},
            {'id': 3, 'name': 'April'},
            {'id': 4, 'name': 'May'},
            {'id': 5, 'name': 'June'},
            {'id': 6, 'name': 'July'},
            {'id': 7, 'name': 'August'},
            {'id': 8, 'name': 'September'},
            {'id': 9, 'name': 'October'},
            {'id': 10, 'name': 'November'},
            {'id': 11, 'name': 'December'},
        ];

    }

    $scope.getYears = function(){
        $scope.years =[
            new Date().getFullYear(),
            new Date().getFullYear()+1,
            new Date().getFullYear()+2
        ]
    }

    $scope.weekday = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    // function aContainsB (a, b) {
    //     return a.indexOf(b) >= 0;
    // }
    $scope.init();

    setTimeout(function() {
        Color = setInterval($scope.getCol, 60000);
    }, 60000);
});
