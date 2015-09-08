angular.module('Deadlines.config', [])
.constant('myConfig', {
    'backend': 'http://api.deadlinesapi:88',
    'version': 0.2
});

var app = angular.module('Deadlines', [
    'ui.router',
    //'ng-token-auth',
    'Deadlines.config',
    'textAngular'
    ])

app
.constant('urls', {
   BASE: 'http://deadlines.dev',
   BASE_API: 'http://api.deadlinesapi.dev:88'
})
.constant('API', 'http://api.deadlinesapi.dev:88');

app.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('auth:login-success', function() {
        $location.path('/');
    });
}]);

app.run(function($http) {
    $http.defaults.headers.common.Accept = 'application/vnd.deadlines.v1'
});

app.factory('authInterceptor', function (API, auth) {
    return {
        //automatically attach Authorization header
        request: function(config) {
            var token = auth.getToken();
            if(config.url.indexOf(API) === 0 && token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },

        //If a token was sent back, save it
        response: function(res) {
            if(res.config.url.indexOf(API) === 0 && res.data.token) {
                auth.saveToken(res.data.token);
            }

            return res;
        },
    }
})
.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

