app
.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
        // Deadlines
        .state('deadlines', {
            url: '/deadlines',
            templateUrl: 'app/components/deadlines/deadlinesView.html',
            controller: 'DeadlinesCtrl'

        }).state('deadlines.new', {
            url: '/new',
            templateUrl: 'app/components/deadlines/deadlineNewView.html',
            controller: 'DeadlineNewCtrl'

        }).state('deadlines.edit', {
            url: '/edit/:editID',
            templateUrl: 'app/components/deadlines/deadlineEditView.html',
            controller: 'DeadlineEditCtrl'

        }).state('deadlines.show', {
            url: '/:showID',
            templateUrl: 'app/components/deadlines/deadlineShowView.html',
            controller: 'DeadlineShowCtrl'

        })
        // Archive
        .state('archive', {
            url: '/archive',
            templateUrl: 'app/components/archive/archiveView.html',
            controller: 'ArchiveCtrl'

        }).state('archive.edit', {
            url: '/edit/:editID',
            templateUrl: 'app/components/archive/deadlineEditView.html',
            controller: 'DeadlineEditCtrl'

        }).state('archive.show', {
            url: '/:showID',
            templateUrl: 'app/components/archive/deadlineShowView.html',
            controller: 'DeadlineShowCtrl'

        })
        // Signin
        .state('signin', {
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
        });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/deadlines");
    }]);

