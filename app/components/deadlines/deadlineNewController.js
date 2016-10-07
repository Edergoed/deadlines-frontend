angular
.module('Deadlines')
.controller('DeadlineNewCtrl', function($scope, deadline, $state, deadlineTime, klass, klasses, user){

    var vm = this;

    vm.klasses = klasses.klasses;
    vm.availableKlasses = [];
    vm.checkAvailableKlasses = checkAvailableKlasses;
    vm.removeChoice = removeChoice;
    vm.addNewChoice = addNewChoice;
    vm.createDeadline = createDeadline;
    // vm.getDate = getDate;
    vm.onChange = onChange;
    vm.choices = [{'id' : 'klass1', 'value' : null}];
    vm.calendarNext = calendarNext;
    vm.calendarPrevious = calendarPrevious;
    vm.calendarToday = calendarToday;

    function init(){
        // calendar stuff
        vm.calendar = {};
        vm.calendar.year = new Date().getFullYear();
        vm.calendar.month = new Date().getMonth();
        vm.calendar.day = new Date().getDate();
        vm.calendar.months = deadlineTime.getMonthsArray();
        // end calendar stuff

        vm.dayCurrent = new Date().getDate();
        // vm.deadline = {};
        // vm.deadline.deadline = {};
        vm.deadline = {deadline : {}}
        vm.deadline.deadline.year = new Date().getFullYear();
        vm.deadline.deadline.month = new Date().getMonth();
        vm.deadline.deadline.day = new Date().getDate();
        vm.deadline.deadline.time = "23:59";
        vm.deadline.deadline.klass_ids = [];
        $scope.$watch("deadlineNew.deadline.deadline.month", function(newValue, oldValur){
            vm.days = deadlineTime.getDays(vm.deadline.deadline.year, vm.deadline.deadline.month);
        });

        vm.months = deadlineTime.getMonths();
        vm.years = deadlineTime.getYears(new Date().getFullYear());
        vm.weekday = deadlineTime.getWeekdays();
        getUserCurrent();
    vm.error = false;
    vm.submitted = false;
        // getKlasses();
    }

    function onChange() {
        checkAvailableKlasses();
        if(vm.choices[vm.choices.length-1].value != null)
            addNewChoice();
    }

    function checkAvailableKlasses() {
        for(k = 0;k < vm.choices.length; k++){
            array = [];
            for(i = 0;i < vm.klasses.length; i++){
                add = true;
                for(j = 0;j < vm.choices.length; j++)
                    if(vm.klasses[i].id == vm.choices[j].value)
                        if(vm.choices[j].value != vm.choices[k].value)
                            add = false;
                if(add)
                    array.push(vm.klasses[i]);
            }
            vm.availableKlasses[k] = array
        }
    };

    function addNewChoice() {
        var newItemNo = vm.choices.length+1;
        vm.choices.push({'id' : 'klass'+newItemNo, 'value' : null});
        vm.checkAvailableKlasses();
    };

    function removeChoice(index) {
        var lastItem = vm.choices.length-1;
        vm.choices.splice(index,1);
        vm.checkAvailableKlasses();
        console.log("remove deadline");
    };

    function getUserCurrent(){
        user.getUser($scope.userCurrent.id)
        .then(function(res){
            vm.selectedUser = res.data.user;
            vm.choices[0]['value'] = vm.selectedUser.klass;
            //succes
        }, function(res){
            //error
        });
    }

    function getKlasses(){
        vm.Loading = true;
        klass.getAllKlasses()
        .then(function(res){
            //$scope.deadlineChangeState('view');
            vm.Loading = false;
            vm.klasses = res.klasses;
            vm.availableKlasses[0]= res.klasses;
            console.log(vm.klasses);
            //succes
        }, function(res){
            vm.Loading = false;
            //error
        })
    }

    function createDeadline(){
        console.log('test2');
        vm.error = false;
        vm.submitted = true;
        if($scope.deadlineForm.$valid && (vm.deadline.deadline.content != 'undefined' && vm.deadline.deadline.content != '' && vm.deadline.deadline.content != null)){
            day = vm.deadline.deadline.day;
            month = vm.deadline.deadline.month;
            year = vm.deadline.deadline.year;
            hour = vm.deadline.deadline.time.split(':')[0];
            minut = vm.deadline.deadline.time.split(':')[1];

            vm.deadline.deadline.deadlineDateTime = new Date(year, month, day, hour, minut);
            for(i = 0;i < vm.choices.length; i++){
                vm.deadline.deadline.klass_ids.push(vm.choices[i].value);
            }
            //console.log($scope.deadline.deadline.deadlineDateTime);
            deadline.createDeadline($scope.userCurrent.id, vm.deadline)
            .then(function(res){
                //succes
                $scope.$emit('updatedDeadline');
                $state.go('mainon.deadlines.show');

                vm.submitted = false;
            }, function(res){
                //error
                vm.error = true;
                vm.submitted = false;
            })
        }
    }

    var month = 0;
    var year = 0;
    var base = $('.weekdays').html();

    function calendarNext() {
        month++;
        calendarUpdate();
    }

    function calendarPrevious() {
        month--;
        calendarUpdate();
    }

    function calendarToday() {
        month = 0;
    }

    function lastSundayOfMonths(year, month) {
        var lastDay = [31,28,31,30,31,30,31,31,30,31,30,31]
        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) lastDay[2] = 29
        // for (, month=0; month<12; month+=1) {
        var date = new Date();
        date.setFullYear(year, month, lastDay[month])
        date.setDate(date.getDate()-date.getDay())
        return date;
        // }
    }

    function calendarUpdate() {
        var days = deadlineTime.getWeekdays();
        var date = new Date();
        vm.calendar.month = ((date.getMonth() + month) + 12*Math.abs(month)) % 12;
        vm.calendar.monthP = ((date.getMonth() + month - 1) + 12*Math.abs(month)) % 12;
        vm.calendar.year = date.getFullYear() + Math.floor((date.getMonth() + month)/12);

        console.log(lastSundayOfMonths(vm.calendar.year, vm.calendar.monthP));
        var lastSundayOfPreviousMonth = lastSundayOfMonths(vm.calendar.year, vm.calendar.monthP);
        var numberOfDayesPreviousMonth = daysInMonth(vm.calendar.monthP + 1, vm.calendar.year);
        var numberOfDayesCurrentMonth = daysInMonth(vm.calendar.month + 1, vm.calendar.year);
        console.log(vm.calendar.monthP + ' ' +  vm.calendar.year + ' ' +  daysInMonth(vm.calendar.monthP +1, vm.calendar.year));
        console.log('number of days previous month ' + numberOfDayesPreviousMonth + ' ' + vm.calendar.months[vm.calendar.monthP]);

        vm.calendar.colums = {};
        for(let i = 0; i < 7; i++) {
            // vm.calendar.calendarBox[days[i].slice(0,3)] = {};
            vm.calendar.colums[i] = {};
            vm.calendar.colums[i].name = days[i].slice(0,3);
            for(let j = 0; j < 6; j++) {
                // vm.calendar.calendarBox[days[i].slice(0,3)][j] = {};
                vm.calendar.colums[i].boxs = {};
            }
        }

        var l = lastSundayOfPreviousMonth.getDate()-1;
        var bool = true;
        for(let i = 0; i < 7; i++) {
            for(let j = 0; j < 6; j++) {
                var k = (i + 7*i) % 7;
                // console.log(k);
                // if(i % 1 == 0)
                // vm.calendar.colums.rows.boxs = {};
                // vm.calendar.calendarBox[days[k].slice(0,3)][j] = {};
                // console.log(lastSundayOfPreviousMonth.getDate());
                // console.log(numberOfDayesPreviousMonth);
                if(l > numberOfDayesPreviousMonth && bool) {
                    l = 0;
                    bool = false;
                }
                // l + 7*j ;
                vm.calendar.colums[k].boxs[j] = {};
                // console.log(vm.calendar.colums[k].boxs[j].date = (l + 7*j ));
                console.log(vm.calendar.colums[k].boxs[j].date = (l + 7*j ));
                vm.calendar.colums[k].boxs[j].date = (l + 7*j ) % (numberOfDayesPreviousMonth) +1;
                vm.calendar.colums[k].boxs[j].month = 'Month';
                vm.calendar.colums[k].boxs[j].year = 'year';
                // if(i % 2 == 0)
                //     vm.calendar.days[1][i];
                // if(i % 3 == 0)
                //     vm.calendar.days[2][i];
                // if(i % 4 == 0)
                //     vm.calendar.days[3][i];
                // if(i % 5 == 0)
                //     vm.calendar.days[4][i];
                // if(i % 6 == 0)
                //     vm.calendar.days[5][i];
                // if(i % 7 == 0)
                //     vm.calendar.days[6][i];
            }
            l++
        }
        // console.log(vm.calendar.colums);
    }

    // $('.calendar-previous').click(function () {
    //     month--;
    //     GetDays();
    // });
    //
    // $('.calendar-next').click(function () {
    //     month++;
    //     GetDays();
    // });
    //
    // $('.calendar-today').click(function () {
    //     month = 0;
    //     GetDays();
    // });

    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }

    function GetDays() {
        $('.weekdays').html(base);

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth() + month, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + (month + 1), 0);
        var monthLength = daysInMonth(date.getMonth(),date.getFullYear());
        var weekdays = ["sun","mon","tue","wed","thu","fri","sat"];
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        $('#current_year').html(date.getFullYear());
        if((date.getMonth() + month) >= 12){
            var smartMonth = (date.getMonth() + month) % 12;
            var smartYear = Math.floor((date.getMonth() + month)/12);

            // $('#current_month').html(monthNames[smartMonth]);
            // $('#current_year').html(date.getFullYear() + smartYear);

        }else{
            // $('#current_month').html(monthNames[date.getMonth() + month]);
        }



        var firstWeekday = firstDay.getDay();
        var children = $('.weekdays').children('.weekdays > div');
        var startDay = firstWeekday;

        for (var i = 0; i < firstWeekday; i++) {
            var curHtml = children.eq(i).html();
            children.eq(i).html(curHtml + "<div class='calendar-number'></div>");
        }

        for (var i = 1; i <= monthLength; i++) {
            var curHtml = children.eq(firstWeekday).html();

    //         if(month == 0 && date.getDay() == i){
                // children.eq(firstWeekday).html(curHtml + "<div class='calendar-number'><div class='option' onclick='ChooseDate()'>9:15</div><div class='option' onclick='ChooseDate()'>13:00</div><div class='option' onclick='ChooseDate()'>23:59</div><div class='calendar-number-graphic calendar-currentday'><p>"+ i +"</p></div></div>");
    //         }else{
                children.eq(firstWeekday).html(curHtml + "<div class='calendar-number'><div class='option' onclick='ChooseDate()'>9:15</div><div class='option' onclick='ChooseDate()'>13:00</div><div class='option' onclick='ChooseDate()'>23:59</div><div class='calendar-number-graphic'><p>"+ i +"</p></div></div>");
            // }
            if(firstWeekday < 6){
                firstWeekday++;
            }else{
                firstWeekday = 0;
            }
        }
        var maxChildren = 0;
        var bigDay = 0;
        for (var i = 0; i <= 6; i++) {
            if(children.eq(i).children().length >= maxChildren){
                maxChildren = children.eq(i).children().length;
                bigDay = i;
            }
        }

        for (var i = bigDay+1; i <= 6; i++) {
            var curHtml = children.eq(i).html();
            children.eq(i).html(curHtml + "<div class='calendar-number'><div class='option'>9:15</div><div class='option'>13:00</div><div class='option'>23:59</div><div class='calendar-number-graphic calendar-faded'><p>"+ (i - bigDay) +"</p></div></div>");
        }
    }

    function ChooseDate(){
        var chosenTime = $(this).html();
        console.log(chosenTime);
    }

    $( document ).ready(function() {
        GetDays();
    });




    init();
});
