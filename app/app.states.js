deadlinesApp.config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state('deadlines', {
                url: '/',
                templateUrl: 'app/components/deadlines/deadlinesView.html',
                controller: 'DeadlinesCtrl',
            })

            $urlRouterProvider.otherwise('/');
        }])
    .config(["$locationProvider", function($locationProvider) {
      $locationProvider.html5Mode(true);
    }])

    .run(function ($rootScope){
        $rootScope.endPoint = 'http://localhost:8000'
    })

    .run(function($rootScope) {
        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 27)
                $rootScope.$broadcast("escapePressed", e.target);
        });

        document.addEventListener("click", function(e) {
            $rootScope.$broadcast("documentClicked", e.target);
        });
    });
