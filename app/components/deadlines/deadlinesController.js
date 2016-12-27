angular
.module('Deadlines')
.controller('DeadlinesCtrl', function($scope, $state, $stateParams, deadline, user, deadlineDistance, deadlineColor){

    var vm = this;
    vm.loading = false;
    vm.arrow = arrow;
    vm.tick = tick;
    vm.getAll = getAll;
    vm.init = init;
    vm.tickList = [];

    function init(){
        if($stateParams.mode === "archive"){
            vm.archive = true;
        } else {
            vm.archive = false;
        }
        vm.getAll();
        $scope.$on('arrow', function(event, id){vm.selectedDeadlineId = id;});
        $scope.$on('updatedDeadline', function(event){vm.getAll()});
    }

    function arrow(id){
        if($stateParams.showID != null){
            for(i = 0; i < vm.deadlines.length; i++)
                if(vm.deadlines[i].id == $stateParams.showID){
                    vm.deadlines[i].selected = true;
                } else {
                    vm.deadlines[i].selected = false;
                }
        } else {
            for(i = 0; i < vm.deadlines.length; i++)
                if(vm.deadlines[i].id == id){
                    vm.deadlines[i].selected = true;
                } else {
                    vm.deadlines[i].selected = false;
                }
        }
    }

    function tick(id){
        var theId;
        for(i = 0; i < vm.deadlines.length; i++){
            if(vm.deadlines[i].id == id){
                vm.deadlines[i].done = vm.deadlines[i].done == null ? true : !vm.deadlines[i].done;
                theId = i;
            }
        }
        if(vm.deadlines[theId].done){
            vm.tickList.push({id: id});
            deadline.saveTickList(vm.tickList);
        }
        else {
            for(i = 0; i < vm.tickList.length; i++)
                if(id == vm.tickList[i].id) {
                    vm.tickList.splice(i, 1);
                    deadline.saveTickList(vm.tickList);
                }
        }
    }

    function setTicks(){
         var tickList = deadline.getTickList();
        if(!tickList)
            return
        console.log(tickList);
        vm.tickList = tickList;

        for(i = 0; i < vm.deadlines.length; i++)
            for(j = 0; j < vm.tickList.length; j++){
                console.log(vm.tickList[j]);
                if(vm.deadlines[i].id == vm.tickList[j].id){
                    vm.deadlines[i].done =  true;
                    // vm.deadlines[i].done = tickList[i].value == null ? false : true;
                }
            }
    }

    function getAll(){
        vm.loading = true;
        deadline.getAllDeadlines(vm.archive)
        .then(function(res){
            //success
            vm.deadlines = deadline.deadlines.deadlines;
            if(vm.deadlines[0] == null) {
                vm.deadlines[0] = {
                    DeadlineDistance: 8731287389,
                    color: "rgba(0, 187, 211, 0);",
                    content: "<p>Hier kan je een omschrijving voor de deadline plaatsen.</p>",
                    countdown: 3,
                    creator: null,
                    deadlineDateTime: "2017-01-10T04:00:00.000Z",
                    editors: null,
                    group_id: null,
                    id: 0,
                    klass_ids: null,
                    parendNode: "rgb(0, 187, 211)",
                    published: false,
                    selected: true,
                    subject: "Naam van het vak",
                    title: "Voorbeeld Deadline",
                    unit: "Weeks"
                }
                deadlineColor.backgroundColor.lastBackgroundColor = 'rgb(0, 187, 211)';
            }
            $scope.$watch('$state.current.name', function(){
                if($state.current.name == 'mainon.deadlines'){
                    $state.go('mainon.deadlines.show', { showID: vm.deadlines[0].id });
                }
            });

            // $scope.$watch('currState.current.name', function(){
            //     //console.log($scope.deadlineList.deadlines);
            //     if($state.current.name == 'mainon.deadlines' && $scope.deadlineList.deadlines[0] != null){
            //         $state.go('mainon.deadlines.show', { showID: $scope.deadlineList.deadlines[0].id });
            //     }
            // });
            setTicks();

            if(vm.deadlines[0] != null)
                if(vm.selectedDeadlineId == null ){
                    vm.arrow(vm.deadlines[0].id);
                } else {
                    vm.arrow(vm.selectedDeadlineId);
                }

            vm.lastBackgroundColor = deadline.backgroundColor.lastBackgroundColor;
            vm.bottomBackgroundColor = deadline.backgroundColor.bottomBackgroundColor;
            vm.loading = false;
        }, function(res){
            //error
            vm.loading = false;
        })
    }

    vm.init();
});
