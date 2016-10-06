angular
.module('Deadlines')
.controller('DeadlinesCtrl', function($scope, $state, $stateParams, deadline, user, deadlineDistance, deadlineColor){

    var vm = this;
    vm.loading = false;
    vm.arrow = arrow;
    vm.getAll = getAll;
    vm.init = init;

    function init(){
        console.log('test');
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

    function getAll(){
        vm.loading = true;
        deadline.getAllDeadlines(vm.archive)
        .then(function(res){
            //success
            vm.deadlines = deadline.deadlines.deadlines;
            // $scope.$watch('$state.current.name', function(){
            console.log($state);
            $scope.$watch('$state.current.name', function(){
                if($state.current.name == 'mainon.deadlines'){
                    $state.go('mainon.deadlines.show', { showID: vm.deadlines[0].id });
                    console.log('test');
                }
            });

            // $scope.$watch('currState.current.name', function(){
            //     //console.log($scope.deadlineList.deadlines);
            //     if($state.current.name == 'mainon.deadlines' && $scope.deadlineList.deadlines[0] != null){
            //         $state.go('mainon.deadlines.show', { showID: $scope.deadlineList.deadlines[0].id });
            //     }
            // });

            if(vm.deadlines[0] != null && vm.selectedDeadlineId == null ){
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
