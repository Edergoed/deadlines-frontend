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

    function init(){
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

    init();
});
