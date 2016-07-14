angular
.module('Deadlines')
.service('deadlineDistance', function deadlineDistance($q, deadlineColor, deadlineTime) {

    var deadlineDistance = this;
    deadlineDistance.backgroundColor = {};

    deadlineDistance.getDistance = function(deadlineList){

        var deadline = deadlineList.deadlines;
        for(i=0; i<deadline.length; i++){
            var data = deadline[i].deadlineDateTime;
            var fromTime = new Date();
            var toTime = new Date(data);

            var distance = toTime.getTime()/1000 - fromTime.getTime()/1000;
            deadline[i].DeadlineDistance = distance;
        }

        deadlineColor.getColor(deadlineList);
        deadlineTime.getTime(deadlineList);
        deadlineDistance.backgroundColor = deadlineColor.backgroundColor;

        return deadlineList;
    }
    return deadlineDistance;
});
