app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider

        // mainon
        .state('mainon', {
            url: '',
            templateUrl: 'app/shares/mainon/mainonView.html',
            controller: 'MainonCtrl',
            data: {
                authenticate: true
            }
        })

        // mainoff
        .state('mainoff', {
            url: '',
            templateUrl: 'app/shares/mainoff/mainoffView.html',
            controller: 'MainoffCtrl'
        })

        // Deadlines
        .state('mainon.deadlines', {
            url: '/deadlines',
            templateUrl: 'app/components/deadlines/deadlinesView.html',
            controller: 'DeadlinesCtrl'

        }).state('mainon.deadlines.new', {
            url: '/new',
            templateUrl: 'app/components/deadlines/deadlineNewView.html',
            controller: 'DeadlineNewCtrl'

        }).state('mainon.deadlines.edit', {
            url: '/edit/:editID',
            templateUrl: 'app/components/deadlines/deadlineEditView.html',
            controller: 'DeadlineEditCtrl'

        }).state('mainon.deadlines.show', {
            url: '/:showID',
            templateUrl: 'app/components/deadlines/deadlineShowView.html',
            controller: 'DeadlineShowCtrl'

        })

        // Archive
        .state('mainon.archive', {
            url: '/archive',
            templateUrl: 'app/components/archive/archiveView.html',
            controller: 'ArchiveCtrl'

        }).state('mainon.archive.edit', {
            url: '/edit/:editID',
            templateUrl: 'app/components/archive/deadlineEditView.html',
            controller: 'DeadlineEditCtrl'

        }).state('mainon.archive.show', {
            url: '/:showID',
            templateUrl: 'app/components/archive/deadlineShowView.html',
            controller: 'DeadlineShowCtrl'

        })

        // Signin
        .state('mainoff.signin', {
            url: '/signin',
            templateUrl: 'app/components/signin/signinView.html',
            controller: 'LoginCtrl'

        }).state('signout', {
            url: '/signout',
            controller: 'LoginCtrl'

        }).state('mainoff.signup', {
            url: '/signup',
            templateUrl: 'app/components/signup/signupView.html',
            controller: 'SignupCtrl'

        }).state('activate', {
            url: '/activate/:activationToken',
            templateUrl: 'app/components/signup/activateView.html',
            controller: 'SignupCtrl'
        })

        // Profile
        .state('mainon.profile', {
            url: '/profile',
            templateUrl: 'app/components/profile/profileView.html',
            controller: 'ProfileCtrl'

        })

        // Timetable
        .state('mainon.timetable', {
            url: '/timetable',
            templateUrl: 'app/components/profile/timetableView.html',
            controller: 'TimetableCtrl'

        })

        // Home
        .state('mainoff.welcome', {
            url: '/welcome',
            templateUrl: 'app/components/welcome/welcomeView.html',
            controller: 'WelcomeCtrl'

        })

        .state('mainoff.construction', {
            url: '/construction',
            templateUrl: 'app/components/construction/constructionView.html',
            controller: 'ConstructionCtrl'

        });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/deadlines");
        //$urlRouterProvider.otherwise("/welcome");
    }])
    .run(function($rootScope, $location, auth){
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams){
            if(!auth.isAuthed() && toState.data.authenticate){
                //$state.go('mainoff', {});
                $location.path('/welcome');
            }
        })
    });
