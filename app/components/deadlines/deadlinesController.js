app.controller('DeadlinesCtrl', function($scope, $state, $stateParams, deadline, user, deadlineDistance, deadlineColor){

        $scope.Loading = false;
    $scope.init = function(){
        if($stateParams.mode === "archive"){
            $scope.archive = true;
        } else {
            $scope.archive = false;
        }
        $scope.getAll();
        $scope.currState = $state
        //$scope.$on('arrow', function(event, id){$scope.arrow(id);});
    }

    $scope.arrow = function(id){
        console.log(id);
        if($stateParams.showID != null){
            for(i = 0; i < $scope.deadlineList.deadlines.length; i++){
                //console.log($scope.deadlineList.deadlines[i].id + ' ' + id);
                if($scope.deadlineList.deadlines[i].id == $stateParams.showID){
                    $scope.deadlineList.deadlines[i].selected = true;
                } else {
                    $scope.deadlineList.deadlines[i].selected = false;
                }
            }
        } else {
            for(i = 0; i < $scope.deadlineList.deadlines.length; i++){
                //console.log($scope.deadlineList.deadlines[i].id + ' ' + id);
                if($scope.deadlineList.deadlines[i].id == id){
                    $scope.deadlineList.deadlines[i].selected = true;
                } else {
                    $scope.deadlineList.deadlines[i].selected = false;
                }
            }
        }
    }

    $scope.getAll = function(){
        $scope.Loading = true;
        deadline.getAllDeadlines($scope.archive)
        .then(function(res){
            //success
            $scope.deadlineList = deadline.deadlineList;
            $scope.$watch('currState.current.name', function(){
                //console.log($scope.deadlineList.deadlines);
                if($state.current.name == 'mainon.deadlines' && $scope.deadlineList.deadlines[0] != null){
                    $state.go('mainon.deadlines.show', { showID: $scope.deadlineList.deadlines[0].id });
                }
            });

            setTimeout(function(){
                //$scope.setDistance();
                //p
                //deadlineDistance.getDistance(deadline.deadlinesList);
                //deadlineDistance.setDistance();
                $scope.$apply();
            }, 0);

            if($scope.deadlineList.deadlines[0] != null && $scope.selectedDeadline == null && $stateParams.showID == null){
                console.log($stateParams.showID);
                $scope.arrow($scope.deadlineList.deadlines[0].id);
            }

            $scope.Loading = false;
        }, function(res){
            //error
            $scope.Loading = false;
        })
    }

    $scope.getDeadline = function(id){
        deadline.getDeadline(id)
        .then(function(res){
            //$scope.deadlineChangeState('view');
            $scope.selectedDeadline = deadline.deadline;
            //$scope.arrow($scope.selectedDeadline.deadline.id)
            //succes
        }, function(res){
            //error
        })
    }

    $scope.deleteDeadline = function(id){
        deadline.deleteDeadline(id)
        .then(function(res){
            $scope.getAll();
            //success
        }, function(){
            //error
        })
    }

    $scope.init();

    setTimeout(function() {
        Color = setInterval(deadlineColor.getCol, 60000);
    }, 60000);
});
