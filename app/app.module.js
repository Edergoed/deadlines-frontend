var deadlinesApp = angular.module('Deadlines', [
    'ui.router',
    'templates'
    ])
    .run(function ($rootScope){
        $rootScope.endPoint = 'http://localhost:8000'
    })
