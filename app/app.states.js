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
            .state('sign_in', {
                url: '/sign_in',
                templateUrl: 'app/components/sessions/newSessionView.html',
                controller: 'CreatesessionsCtrl'

            });

            // .state('user', {
            //     url: '/',
            //     templateUrl: 'app/components/users/usersView.html',
            //     controller: 'UsersCtrl',
            //     resolve: {
            //         auth: function($auth) {
            //             return $auth.validateUser();
            //         }
            //     }
            // })

            // .state('user.settings', {
            //     url: '/',
            //     templateUrl: 'app/components/users/usersView.html',
            //     controller: 'UsersCtrl'
            // })
            $locationProvider.html5Mode(true).hashPrefix('!');
            $urlRouterProvider.otherwise("/");

           
        }])

    .run(function ($rootScope){
        $rootScope.endPoint = 'http://localhost:8000'
    })

    
