angular
.module('Deadlines')
.controller('DeadlineShowCtrl', function($scope, $state, $stateParams, deadline, deadlineTime, klasses){

    var vm = this;

    vm.loading = false;
    vm.choices = [];
    vm.klasses = klasses.klasses;
    vm.getDeadline = getDeadline;
    vm.getDate = getDate;

    function init(){
        if($stateParams.showID != null){
            vm.getDeadline($stateParams.showID);
        }
    }

    function getDeadline(id){
        vm.loading = true;
        deadline.getDeadline(id)
        .then(function(res){
            //succes
            vm.deadline = deadline.deadline;
            vm.getDate(vm.deadline.deadline.deadlineDateTime);
            $scope.$emit('arrow', vm.deadline.deadline.id);

            for(i = 0;i < vm.deadline.deadline.klass_ids.length; i++){
                var newItemNo = vm.choices.length+1;
                vm.choices.push({'id' : 'klass'+newItemNo, 'value' : vm.deadline.deadline.klass_ids[i]});
            }
            vm.loading = false;
        }, function(res){
            //error
            vm.loading = false;
        })
    }

    function getDate(date){
        date = new Date( Date.parse(date));
        $scope.weekday = deadlineTime.getWeekdays();
        vm.deadline.deadline.day = $scope.weekday[date.getDay()] + ' ';
        vm.deadline.deadline.date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            vm.deadline.deadline.time = date.getHours() + ':' + date.getMinutes() + 0 ;
        } else {
            vm.deadline.deadline.time = date.getHours() + ':' + date.getMinutes();
        }
    }

    init();
});
