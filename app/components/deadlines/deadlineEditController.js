angular
.module('Deadlines')
.controller('DeadlineEditCtrl', function($scope, $state, $stateParams, deadline, deadlineTime, klass, klasses){

    var vm = this;

    var month = 0;
    var year = 0;

    vm.klasses = klasses.klasses;
    vm.availableKlasses = [];
    vm.checkAvailableKlasses = checkAvailableKlasses;
    vm.updateDeadline = updateDeadline;
    vm.removeChoice = removeChoice;
    vm.addNewChoice = addNewChoice;
    vm.getDate = getDate;
    vm.onChange = onChange;

    vm.calendar = {};
    vm.calendarNext = calendarNext;
    vm.calendarPrevious = calendarPrevious;
    vm.calendarToday = calendarToday;
    vm.selectDate = selectDate;
    vm.calendarSelection = false;
    vm.openCalendar = openCalendar;
    vm.closeCalendar = closeCalendar;

    function init(){
        vm.choices = [];
        if($stateParams.editID != null){
            getDeadline($stateParams.editID);
        }

        // calendar stuff
        vm.calendar.months = deadlineTime.getMonthsArray();
        calendarUpdate();
        // end calendar stuff
    }

    function updateDeadline(){
        //console.log('kanekr dope');
        if($scope.deadlineForm.$valid){
            day = vm.calendar.day
            month = vm.calendar.month
            year = vm.calendar.year
            hour = vm.calendar.time.split(':')[0];
            minut = vm.calendar.time.split(':')[1];

            vm.deadline.deadline.deadlineDateTime = new Date(year, month, day, hour, minut);
            vm.deadline.deadline.klass_ids = [];
            for(i = 0; i < vm.choices.length; i++){
                console.log(vm.choices[i].value);
                if(vm.choices[i].value != null)
                vm.deadline.deadline.klass_ids.push(vm.choices[i].value);
            }
            deadline.updateDeadline($scope.userCurrent.id, vm.deadline.deadline)
            .then(function(res){
                //succes
                $scope.$emit('updatedDeadline');
                $state.go('mainon.deadlines.show', { showID: vm.deadline.deadline.id });
            }, function(res){
                //error
            })
        }
    }

    function onChange() {
        checkAvailableKlasses();
        if(vm.choices[vm.choices.length-1].value != null)
            addNewChoice();
    }

    //needs revector
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

    function getDeadline(id){
        vm.loading = true;
        deadline.getDeadline(id)
        .then(function(res){
            //succes
            vm.deadline = deadline.deadline;
            vm.getDate(vm.deadline.deadline.deadlineDateTime);
            // vm.calendar.weekday = deadlineTime.getWeekdays();
            // vm.calendar.years = deadlineTime.getYears(vm.deadline.deadline.year);
            vm.months = deadlineTime.getMonths();

            // vm.calendar.year = new Date().getFullYear();
            // vm.calendar.month = new Date().getMonth();
            // vm.calendar.day = new Date().getDate();
            // vm.calendar.time = "23:59";

            $scope.$watch("deadlineEdit.deadline.deadline.month", function(newValue, oldValur){
                vm.days = deadlineTime.getDays(vm.deadline.deadline.year, vm.deadline.deadline.month);
            });
            for(i = 0;i < vm.deadline.deadline.klass_ids.length; i++){
                var newItemNo = vm.choices.length+1;
                vm.choices.push({'id' : 'klass'+newItemNo, 'value' : vm.deadline.deadline.klass_ids[i]});
            }
            vm.choices.push({'id' : 'klass'+newItemNo, 'value' : null});

            vm.checkAvailableKlasses();
            vm.loading = false;
        }, function(res){
            //error
            vm.loading = false;
        })
    }

    function getDate(date){
        date = new Date( Date.parse(date));
        vm.calendar.day = date.getDate();
        vm.calendar.month = date.getMonth();
        vm.calendar.year = date.getFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            vm.calendar.time = date.getHours() + ':' + date.getMinutes() + 0 ;
        } else {
            vm.calendar.time = date.getHours() + ':' + date.getMinutes();
        }
    }

    // var base = $('.weekdays').html();

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

    function createCalendarColums() {
        var colums = {};
        var days = deadlineTime.getWeekdays();
        for(i = 0; i < 7; i++) {
            colums[i] = {};
            colums[i].name = days[i].slice(0,3);
            for(j = 0; j < 6; j++) {
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
        var dateSundayPreviousMonth = deadlineTime.lastSundayOfMonths(vm.calendar.year, monthP);
        var lenghtPreviousMonth = deadlineTime.daysInMonth(monthP + 1, vm.calendar.year);
        var lenghtCurrentMonth = deadlineTime.daysInMonth(vm.calendar.month + 1, vm.calendar.year);

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
