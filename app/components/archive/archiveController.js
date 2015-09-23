app.controller('ArchiveCtrl', function($scope, $stateParams, deadline, user){

    $scope.init = function(){
        $scope.getAll();
    }

    $scope.getAll = function(){
        deadline.getArchiveDeadlines()
        .then(function(res){
            //success
            setTimeout(function(){
                $scope.setDistance();
            }, 0);
            $scope.deadlineList = deadline.deadlineList;
        }, function(res){
            //error
        })
    }

    $scope.setDistance = function(){
        //console.log("setDistance executed");
        var deadline = document.getElementsByClassName('archivedDeadline');
        for(i=0; i<deadline.length; i++){
            var data = deadline[i].getAttribute("data-deadline");
            var fromTime = new Date(data);
            var toTime = new Date();

            var distance = toTime.getTime()/1000 - fromTime.getTime()/1000;
            deadline[i].setAttribute("data-distance", distance);
            // console.log("set deadline time to " + distance + " of deadline " + deadline[i] );
            // console.log(deadline.length + " "+ i + " " + fromTime + " " +toTime);
        }
            $scope.getTime();
            setInterval($scope.getTime, 60000);
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

    $scope.getTime = function(difference){
        if($( ".count_down" ).length){
            var countdown = document.getElementsByClassName('count_down');
            var unit = document.getElementsByClassName('count_down_unit');
            var deadline = document.getElementsByClassName('archivedDeadline');
            for(i=0; i<deadline.length; i++){
                var data = deadline[i].getAttribute("data-distance");
                // var background = deadline[i].getAttribute("style");
                var time = $scope.remainingCalc(data);
                countdown[i].innerHTML = time[0];
                unit[i].innerHTML = time[1];
            }
        }

    }

    $scope.init();
});
