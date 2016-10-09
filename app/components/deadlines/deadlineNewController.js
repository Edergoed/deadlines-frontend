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
    vm.selectDate = selectDate;
    vm.calendarSelection = true;
    vm.openCalendar = openCalendar;
    vm.closeCalendar = closeCalendar;

    function init(){
        // calendar stuff
        vm.calendar = {};
        vm.calendar.time = "23:59";
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
        calendarUpdate();
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
        calendarUpdate();
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
    function createCalendarColums() {
        var colums = {};
        var days = deadlineTime.getWeekdays();
        for(let i = 0; i < 7; i++) {
            colums[i] = {};
            colums[i].name = days[i].slice(0,3);
            for(let j = 0; j < 6; j++) {
                colums[i].boxs = {};
            }
        }
        return colums;
    }

    function calendarUpdate() {
        var date = new Date();
        vm.calendar.month = ((date.getMonth() + month) + 12*Math.abs(month)) % 12;
        var monthP = ((date.getMonth() + month - 1) + 12*Math.abs(month)) % 12;
        var monthN = ((date.getMonth() + month + 1) + 12*Math.abs(month)) % 12;
        vm.calendar.year = date.getFullYear() + Math.floor((date.getMonth() + month)/12);
        var dateSundayPreviousMonth = lastSundayOfMonths(vm.calendar.year, monthP);
        var lenghtPreviousMonth = daysInMonth(monthP + 1, vm.calendar.year);
        var lenghtCurrentMonth = daysInMonth(vm.calendar.month + 1, vm.calendar.year);

        var q = (lenghtPreviousMonth - dateSundayPreviousMonth.getDate() >= 6) || (lenghtPreviousMonth - dateSundayPreviousMonth.getDate() + lenghtCurrentMonth) < 35 ? 5 : 6;
        var l = lenghtPreviousMonth - dateSundayPreviousMonth.getDate() >= 6 ? lenghtCurrentMonth : dateSundayPreviousMonth.getDate();

        vm.calendar.colums = createCalendarColums();
        for(var x = 0; x < 7; x++) {
            for(var y = 0; y < q; y++) {
                vm.calendar.colums[x].boxs[y] = {};
                vm.calendar.colums[x].boxs[y].date = l + (y * 7);
                vm.calendar.colums[x].boxs[y].month = monthP + 1;

                if(vm.calendar.month > 0)
                    vm.calendar.colums[x].boxs[y].year = vm.calendar.year;
                else
                    vm.calendar.colums[x].boxs[y].year = vm.calendar.year - 1;

                vm.calendar.colums[x].boxs[y].fade = true;

                if(vm.calendar.colums[x].boxs[y].date > lenghtPreviousMonth ){
                    vm.calendar.colums[x].boxs[y].date -= lenghtPreviousMonth;
                    vm.calendar.colums[x].boxs[y].month = vm.calendar.month + 1;
                    vm.calendar.colums[x].boxs[y].year = vm.calendar.year;
                    vm.calendar.colums[x].boxs[y].fade = false;

                    if(vm.calendar.colums[x].boxs[y].date > lenghtCurrentMonth) {
                        vm.calendar.colums[x].boxs[y].date -= lenghtCurrentMonth;
                        vm.calendar.colums[x].boxs[y].month = monthN + 1;

                        if(vm.calendar.month < 11)
                            vm.calendar.colums[x].boxs[y].year = vm.calendar.year;
                        else
                            vm.calendar.colums[x].boxs[y].year = vm.calendar.year + 1;

                        vm.calendar.colums[x].boxs[y].fade = true;
                    }
                }
            }
            l++
        }
    }

    function daysInMonth(month,year) {
        return new Date(year, month, 0).getDate();
    }

    function selectDate(minutes, hours, day, month, year) {
        var date = new Date(year, month, day, hours, minutes, 00, 00);
        console.log(date);
        vm.calendar.day = date.getDate();
        vm.calendar.month = date.getMonth();
        vm.calendar.year = date.getFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            vm.calendar.time = date.getHours() + ':' + date.getMinutes() + 0 ;
        } else {
            vm.calendar.time = date.getHours() + ':' + date.getMinutes();
        }
        vm.calendarSelection = false;
    }

    function openCalendar() {
        vm.calendarSelection = true;
    }
    function closeCalendar() {
        vm.calendarSelection = false;
    }

    init();
});
