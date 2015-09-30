var app = angular.module('Deadlines', [
    'ui.router',
    'textAngular'
]);

app
.constant('urls', {
    BASE: 'http://deadlines.dev',
    //BASE_API: 'http://188.226.192.169'
   BASE_API: 'http://deadlinesapi.dev:88'
});

app.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('auth:login-success', function() {
        $location.path('/');
    });
}]);

app.directive('froala', function () {
    return {
        require: 'ngModel'
    };
});

app.run(function($http) {
    $http.defaults.headers.common.Accept = 'application/vnd.deadlines.v1'
});

app.factory('authInterceptor', function (urls, auth) {
    return {
        //automatically attach Authorization header
        request: function(config) {
            var token = auth.getToken();
            if(config.url.indexOf(urls.BASE_API) === 0 && token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },

        //If a token was sent back, save it
        response: function(res) {
            if(res.config.url.indexOf(urls.BASE_API) === 0 && res.data.token) {
                auth.saveToken(res.data.token);
            }

            return res;
        },
    }
})
.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
app.config(function($provide){
    $provide.decorator('taOptions', ['$delegate', function(taOptions){

        taOptions.toolbar = [
            [],
            ['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
            [],
            ['insertImage', 'insertLink']
        ];
        return taOptions; // whatever you return will be the taOptions
    }]);
});
