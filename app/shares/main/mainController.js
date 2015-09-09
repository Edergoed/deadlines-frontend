'use strict';

app
.controller('MainCtrl', function($scope, $rootScope, user){
    $rootScope.user = user.current();

	
});
