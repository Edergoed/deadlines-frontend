angular
.module('Deadlines')
.controller('DeadlineEditCtrl', function($scope, $state, $stateParams, deadline, deadlineTime, klass, klasses){

    var vm = this;

    vm.klasses = klasses.klasses;
    vm.availableKlasses = [];
    vm.checkAvailableKlasses = checkAvailableKlasses;
    vm.updateDeadline = updateDeadline;
    vm.removeChoice = removeChoice;
    vm.addNewChoice = addNewChoice;
    vm.getDate = getDate;
    vm.onChange = onChange;

    function init(){
        vm.choices = [];
        if($stateParams.editID != null){
            getDeadline($stateParams.editID);
        }
    }

    function updateDeadline(){
        //console.log('kanekr dope');
        if($scope.deadlineForm.$valid){
            day = vm.deadline.deadline.day
            month = vm.deadline.deadline.month
            year = vm.deadline.deadline.year
            hour = vm.deadline.deadline.time.split(':')[0];
            minut = vm.deadline.deadline.time.split(':')[1];

            vm.deadline.deadline.deadlineDateTime = new Date(year, month, day, hour, minut);
            vm.deadline.deadline.klass_ids = [];
            for(i = 0;i < vm.choices.length; i++){
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
            vm.weekday = deadlineTime.getWeekdays();
            vm.years = deadlineTime.getYears(vm.deadline.deadline.year);
            vm.months = deadlineTime.getMonths();
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
        vm.deadline.deadline.day = date.getDate();
        vm.deadline.deadline.month = date.getMonth();
        vm.deadline.deadline.year = date.getFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            vm.deadline.deadline.time = date.getHours() + ':' + date.getMinutes() + 0 ;
        } else {
            vm.deadline.deadline.time = date.getHours() + ':' + date.getMinutes();
        }
    }

    init();
});
