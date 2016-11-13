angular.module('Deadlines')
.service('deadlineColor', function deadlineColor($q) {

    var deadlineColor = this;
    deadlineColor.backgroundColor = {};

    deadlineColor.getColor = function(deadlineList){
        var deadline = deadlineList.deadlines;
        for(i=0; i<deadline.length; i++){
            var data = deadline[i].DeadlineDistance;
            var changeData = deadline[i].DeadlineDistance = data-60;

            var newImage = deadlineColor.colCalc(data, deadline, i);
            var changeData = deadline[i].color = newImage;
            if(i+1 == deadline.length){
                deadlineColor.backgroundColor.lastBackgroundColor = newImage;
            }

            var day = 86400;
            if(data < day*28){
                if(data < day*7){
                    deadline[i].parendNode = '#FE2746';
                    if(i+1 == deadline.length){
                        deadlineColor.backgroundColor.bottomBackgroundColor = '#FE2746';
                    }
                    if(data < 0){
                        var deadline_class = deadline[i].className;
                        deadlineColor.backgroundColor.bottomBackgroundColor = '#FE2746';
                    }
                }else{
                    deadline[i].parendNode = '#FFC300';
                    if(i+1 == deadline.length){
                        deadlineColor.backgroundColor.bottomBackgroundColor = '#FFC300';
                    }
                }

            }
        }
    }

    deadlineColor.colCalc = function(difference, deadline, i){
        var day = 86400;
        var color = "";

        var progress = difference;
        var percentage;

        if(difference < day*28){
            percentage = ((difference-day*7) / ((day*28)-day*7));
            color = "rgba(0, 187, 211, "+ percentage +");"; //blue to yellow
            if(difference < day*7){
                percentage = (difference / (day*7));
                color = "rgba(255, 195, 0, "+ percentage +");"; //yellow to red
                if(difference < 0){
                    percentage = (difference / (day*(365/2)));
                    color = "rgba(0, 187, 211, "+ (percentage * -1) +");"; //blue to yellow
                }
            }
        }else{
            color = "rgba(0, 187, 211, 1);"; //blue static
        }
        return color;
    }

    return deadlineColor;
});
