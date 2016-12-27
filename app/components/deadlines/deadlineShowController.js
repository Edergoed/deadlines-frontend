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
        if($stateParams.showID == 0) {
            vm.deadline = {
                deadline: {
                    id: 0,
                    content: "<p>Hier kan je een omschrijving voor de deadline plaatsen.</p>",
                    creator: {
                        firstname: "Liam",
                        gravatarHash: "e047abeabb52ed91c293e5017c02f559",
                        id: 0,
                        lastname: "Ederzeel",
                        prefix: null
                    },
                    deadlineDateTime: "2016-10-10T07:15:00.000Z",
                    editors: [],
                    date: "test",
                    day: "Sunday",
                    klass_ids: [],
                    time: "12:00",
                    title: "Voorbeeld deadline",
                }
            }
            let today = new Date()
            vm.getDate(new Date(today.getYear(), today.getMonth(), today.getDate() + 21, 12, 00, 00, 0000));
        }
        else if($stateParams.showID != null) {
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
            console.log(vm.deadline);
            vm.loading = false;
        }, function(res){
            //error
            vm.loading = false;
        });
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

