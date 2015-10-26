app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider

        // Main
        .state('main', {
            url: '',
            templateUrl: 'app/shares/main/mainView.html',
            controller: 'MainCtrl'
        })

        // Deadlines
        .state('main.deadlines', {
            url: '/deadlines',
            templateUrl: 'app/components/deadlines/deadlinesView.html',
            controller: 'DeadlinesCtrl'

        }).state('main.deadlines.new', {
            url: '/new',
            templateUrl: 'app/components/deadlines/deadlineNewView.html',
            controller: 'DeadlineNewCtrl'

        }).state('main.deadlines.edit', {
            url: '/edit/:editID',
            templateUrl: 'app/components/deadlines/deadlineEditView.html',
            controller: 'DeadlineEditCtrl'

        }).state('main.deadlines.show', {
            url: '/:showID',
            templateUrl: 'app/components/deadlines/deadlineShowView.html',
            controller: 'DeadlineShowCtrl'

        })

        // Archive
        .state('main.archive', {
            url: '/archive',
            templateUrl: 'app/components/archive/archiveView.html',
            controller: 'ArchiveCtrl'

        }).state('main.archive.edit', {
            url: '/edit/:editID',
            templateUrl: 'app/components/archive/deadlineEditView.html',
            controller: 'DeadlineEditCtrl'

        }).state('main.archive.show', {
            url: '/:showID',
            templateUrl: 'app/components/archive/deadlineShowView.html',
            controller: 'DeadlineShowCtrl'

        })

        // Signin
        .state('signin', {
            url: '/signin',
            templateUrl: 'app/components/signin/signinView.html',
            controller: 'LoginCtrl'

        }).state('signout', {
            url: '/signout',
            controller: 'LoginCtrl'

        }).state('signup', {
            url: '/signup',
            templateUrl: 'app/components/signup/signupView.html',
            controller: 'SignupCtrl'

        }).state('activate', {
            url: '/activate/:activationToken',
            templateUrl: 'app/components/signup/activateView.html',
            controller: 'SignupCtrl'
        })

        // Profile
        .state('main.profile', {
            url: '/profile',
            templateUrl: 'app/components/profile/profileView.html',
            controller: 'ProfileCtrl'

        })

        // Timetable
        .state('main.timetable', {
            url: '/timetable',
            templateUrl: 'app/components/profile/timetableView.html',
            controller: 'TimetableCtrl'

        });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/deadlines");
    }])
    .run(function($rootScope, $location, Auth){

        $rootScope.$on('$stateChangeState', function (event, toState, toParams){
            if(Auth.isAuthed && toState.authenticate){
            }
    });
