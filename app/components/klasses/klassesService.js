
'use strict';

app
.service('klass', function($q, $http, urls){
    var klass = this;
    klass.klassList = {};
    klass.getAllKlasses = function(){
        var defer = $q.defer();

        //$http.get(urls.BASE_API + '/deadlines')
        $http.get(urls.BASE_API + '/klasses')
        .success(function(res){
            klass.klassList = res;
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }
});
