deadlinesApp
.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
        .state('deadlines', {
            url: '/',
            templateUrl: 'app/components/deadlines/deadlinesView.html',
            controller: 'DeadlinesCtrl'

        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'app/components/login/loginView.html',
            controller: 'LoginCtrl'

        }).state('signup', {
            url: '/signup',
            templateUrl: 'app/components/signup/signupView.html',
            controller: 'SignupCtrl'

        });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");


    }])
.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(true);
}])

.run(function ($rootScope){
    $rootScope.endPoint = ''
})
.constant('urls', {
   BASE: 'http://deadlines.dev',
   BASE_API: 'http://api.deadlinesapi.dev:88'
})
.constant('API', 'http://api.deadlinesapi.dev:88')




