angular.module('Deadlines.config', [])
.constant('myConfig', {
    'backend': 'http://api.deadlinesapi:88',
    'version': 0.2
});

var deadlinesApp = angular.module('Deadlines', [
    'ui.router',
    'ng-token-auth',
    'Deadlines.config'
    ])

deadlinesApp
.config(function($authProvider) {
    $authProvider.configure({
        apiUrl: 'http://api.deadlinesapi.com:88'
    });
});

deadlinesApp.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('auth:login-success', function() {
        $location.path('/');
    });
}]);

deadlinesApp.run(function($http) {
    $http.defaults.headers.common.Accept = 'application/vnd.deadlines.v1'
});

deadlinesApp.factory('authInterceptor', function (API, auth) {
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
            console.log("response");
            console.log(res.data);
            if(res.config.url.indexOf(API) === 0 && res.data.token) {
                auth.saveToken(res.data.token);
                console.log("toke saved");
            }

            return res;
        },
    }
});

deadlinesApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

