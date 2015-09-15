app
.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
        .state('deadlines', {
            url: '/deadlines',
            templateUrl: 'app/components/deadlines/deadlinesView.html',
            controller: 'DeadlinesCtrl'

        }).state('deadlines.new', {
            url: '/new',
            templateUrl: 'app/components/deadlines/deadlineNewView.html',
            //controller: 'DeadlinesCtrl'

        }).state('signin', {
            url: '/signin',
            templateUrl: 'app/components/login/loginView.html',
            //controller: 'LoginCtrl'

        }).state('signout', {
            url: '/signout',
            controller: 'LoginCtrl'

        }).state('signup', {
            url: '/signup',
            templateUrl: 'app/components/signup/signupView.html',
            controller: 'SignupCtrl'

        }).state('deadlineShow', {
            url: '/deadline/:deadlineID',
            templateUrl: 'app/components/signup/signupView.html',
            //controller: ''

        });



        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/deadlines");
    }])




