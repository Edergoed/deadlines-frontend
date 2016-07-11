app.controller('DeadlineShowCtrl', function($scope, $state, $stateParams, deadline, deadlineTime, klasses){
    var vm = this;
    $scope.Loading = false;
    $scope.choices = [];
    vm.klasses = klasses.klasses;

    $scope.getDeadline = function(id){
        $scope.Loading = true;
        deadline.getDeadline(id)
        .then(function(res){
            $scope.selectedDeadline = deadline.deadline;
            $scope.getDate($scope.selectedDeadline.deadline.deadlineDateTime);
            //succes
            $scope.Loading = false;
            console.log($scope.selectedDeadline.deadline.id);
            $scope.$emit('arrow', $scope.selectedDeadline.deadline.id);

            for(i = 0;i < $scope.selectedDeadline.deadline.klass_ids.length; i++){
                var newItemNo = $scope.choices.length+1;
                $scope.choices.push({'id' : 'klass'+newItemNo, 'value' : $scope.selectedDeadline.deadline.klass_ids[i]});
            }

        }, function(res){
            //error
            $scope.Loading = false;
        })
    }


    $scope.getDate = function(date){
        date = new Date( Date.parse(date));
        $scope.weekday = deadlineTime.getWeekdays();
        $scope.selectedDeadline.deadline.day = $scope.weekday[date.getDay()] + ' ';
        $scope.selectedDeadline.deadline.date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
        if(date.getUTCMinutes().toString().length < 2){
            $scope.selectedDeadline.deadline.time = date.getHours() + ':' + date.getMinutes() + 0 ;
        } else {
            $scope.selectedDeadline.deadline.time = date.getHours() + ':' + date.getMinutes();
        }
    }

    if($stateParams.showID != null){
        $scope.getDeadline($stateParams.showID);
    }
});
