angular.module('Deadlines')
.service('deadlineTime', function deadlineTime($q) {

    var deadlineTime = this;

    deadlineTime.getTime = function(deadlineList){
        //if($( ".count_down" ).length){
        var deadline = deadlineList.deadlines;
        for(i=0; i<deadline.length; i++){
            var data = deadline[i].DeadlineDistance;
            var time = deadlineTime.remainingCalc(data);
            deadline[i].countdown = time[0];
            deadline[i].unit = time[1];
        }
        //}
    }

    deadlineTime.remainingCalc = function(difference)
    {
        var weeks_remaining = Math.floor(difference / 604800);
        var alldays_remaining = Math.floor(difference / 86400);
        var days_remaining = Math.floor((difference % 604800)/ 86400);
        var hours_remaining = Math.floor((difference % 86400) / 3600);
        var allhours_remaining = Math.floor(difference / 3600);
        var minutes_remaining = Math.floor((difference % 3600) / 60);

        var remaining;
        var unit = '';

        if(weeks_remaining >= 2){
            remaining = weeks_remaining;
            unit = 'Weeks';
            if(weeks_remaining == 1){
                remaining = weeks_remaining;
                unit = 'Week';
            }
        } else if (alldays_remaining >= 2){
            remaining = alldays_remaining;
            unit = 'Days';
            if(days_remaining == 1 && alldays_remaining <= 2){
                remaining = days_remaining;
                unit = 'Day';
            }
        } else if (allhours_remaining >= 1){
            remaining = allhours_remaining;
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

            //jaja
        } else if(weeks_remaining <= -1){
            remaining = Math.abs(weeks_remaining);
            unit = 'Weeks';
            if(weeks_remaining == -1){
                remaining = Math.abs(weeks_remaining);
                unit = 'Week';
            }
        } else if (days_remaining <= -1){
            remaining = Math.abs(days_remaining);
            unit = 'Days';
            if(days_remaining == -1){
                remaining = Math.abs(days_remaining);
                unit = 'Day';
            }
        } else if (hours_remaining <= -1){
            remaining = Math.abs(hours_remaining);
            unit = 'Hours';
            if(hours_remaining == -1){
                remaining = Math.abs(hours_remaining );
                unit = 'Hour';
            }
        } else if (minutes_remaining <= -1){
            remaining = Math.abs(minutes_remaining);
            unit = 'Minutes';
            if(minutes_remaining == -1){
                remaining = Math.abs(minutes_remaining);
                unit = 'Minutes';
            }
        } else {
            remaining = 0;
            unit = '';
        }

        // remaining = ("0" + remaining).slice(-2);

        return [remaining, unit];
    }

    deadlineTime.getDays = function(year, month){
        var days = [];
        daysOfMonth = new Date(year, month+1, 0).getDate();
        for(i = 0; i < daysOfMonth; i++){
            days[i] = i+1;
        }
        return days;
        console.log("returend");
    }

    deadlineTime.getMonths = function(){

        var months = [
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

        return months;
    }

    deadlineTime.getMonthsArray = function(){

        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        return months;
    }

    deadlineTime.getYears = function(date){
        //if(date == null){
        //    var years =[
        //        new Date().getFullYear(),
        //        new Date().getFullYear()+1,
        //        new Date().getFullYear()+2
        //    ]
        //} else {
            var years =[
                new Date(date, 1, 0, 0,0,0,0).getFullYear(),
                new Date(date, 1, 0, 0,0,0,0).getFullYear()+1,
                new Date(date, 1, 0, 0,0,0,0).getFullYear()+2
            ]
        //}
        return years;
    }

    deadlineTime.getWeekdays = function(){
        var weekdays = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
        return weekdays;
    }

    deadlineTime.lastSundayOfMonths = function(year, month) {
        var lastDay = [31,28,31,30,31,30,31,31,30,31,30,31]
        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) lastDay[2] = 29
        // for (, month=0; month<12; month+=1) {
        var date = new Date();
        date.setFullYear(year, month, lastDay[month])
        date.setDate(date.getDate()-date.getDay())
        return date;
        // }
    }

    deadlineTime.daysInMonth = function(month,year) {
        return new Date(year, month, 0).getDate();
    }

    return deadlineTime;
});
