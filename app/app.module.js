var deadlinesApp = angular.module('Deadlines', [
    'ui.router',
    'ng-token-auth'
    ])

deadlinesApp
    .config(function($authProvider) {
        $authProvider.configure({
            apiUrl: 'http://api.deadlinesapi.com:88'
        });
    });

deadlinesApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('auth:login-success', function() {
    $location.path('/');
  });
}]);