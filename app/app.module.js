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
            ['bold', 'italics', 'underline'],
            ['ul', 'ol', 'indent', 'outdent'],
            ['insertImage', 'insertLink', 'insertVideo']
        ];
        return taOptions; // whatever you return will be the taOptions
    }]);

    $provide.decorator('taTools', ['$delegate', function(taTools){
        taTools.bold.iconclass = 'icon-bold';
        taTools.italics.iconclass = 'icon-italic';
        taTools.underline.iconclass = 'icon-underline';
        taTools.ul.iconclass = 'icon-ul';
        taTools.ol.iconclass = 'icon-ol';
        taTools.indent.iconclass = 'icon-indent';
        taTools.outdent.iconclass = 'icon-outdent';
        taTools.insertLink.iconclass = 'icon-link';
        taTools.insertImage.iconclass = 'icon-picture';
        taTools.insertVideo.iconclass = 'icon-video';
        // there is no quote icon in old font-awesome so we change to text as follows
        delete taTools.quote.iconclass;
        taTools.quote.buttontext = 'quote';
        return taTools;
    }]);
});

