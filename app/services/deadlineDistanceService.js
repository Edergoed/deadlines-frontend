angular.module('Deadlines')
.service('deadlineDistance', function deadlineDistance($q, deadlineColor, deadlineTime) {

    var deadlineDistance = this;
    //deadline.deadlineList = {};
    //deadline.deadline = {};

    deadlineDistance.getDistance = function(deadlineList){

        var deadline = deadlineList.deadlines;
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

        deadlineColor.getColor(deadlineList);
        deadlineTime.getTime(deadlineList);

        return deadlineList;
        //return deadlinesList;
    }
    return deadlineDistance;
});
