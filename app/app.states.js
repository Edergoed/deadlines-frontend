deadlinesApp.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/homeView.html',
                controller: 'HomeCtrl',
            })

            $urlRouterProvider.otherwise('/');
        }])
    .config(["$locationProvider", function($locationProvider) {
      $locationProvider.html5Mode(true);
    }])
    .run(function ($rootScope){
        $rootScope.endPoint = 'http://localhost:8000'
    })
