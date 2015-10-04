'use strict';

app
.controller('TimetableCtrl', function($scope, $state, auth, user){
    $scope.init = function(){
        // $scope.getKlasses();
        // $scope.userAvatar = user.gravatar($scope.userCurrent.gravatar, 120);
        // $('.timetable').get("http://rooster.goededesigns.com");
        // $('.timetable').promise().done(function (){
   //      	$('.timetable').load('http://rooster.goededesigns.com', function(response, status, xhr) {
			//     if (status == "error") {
			//         var msg = "Sorry but there was an error: ";
			//         alert(msg + xhr.status + " " + xhr.statusText);
			//     }
			// });
        // });
		// console.log("HELLO?!");
		// setTimeout(function (){
  //       	$('.timetable').load('http://rooster.goededesigns.com', function(response, status, xhr) {
		// 	    if (status == "error") {
		// 	        var msg = "Sorry but there was an error: ";
		// 	        alert(msg + xhr.status + " " + xhr.statusText);
		// 	    }
		// 	});

  //       }, 2000);
        
    }

    $scope.signout = function(){
        auth.signout();
        $state.go('signin', {});
    }
    
    $scope.init();
});
