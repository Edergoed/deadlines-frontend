app.controller('TimetableCtrl', function($scope, $state, $stateParams, timetable, user){

    $scope.Loading = false;
    $scope.init = function(){
        $scope.getTimetable();
        console.log("teat");
    }

    $scope.getTimetable = function(){
        $scope.Loading = true;
        timetable.getTimetable("student", "7P00031")
        .then(function(res){
            //success
            $scope.Timetable = res;
            $scope.Loading = false;
        }, function(res){
            //error
            $scope.Loading = false;
        })
    }
    $scope.init();
});
