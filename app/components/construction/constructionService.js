app.service('construction', function($http, $q, urls){
    this.getAllKlasses = function(){
        var defer = $q.defer();

        //$http.get(urls.BASE_API + '/deadlines')
        $http.get(urls.BASE_API + '/klasses')
        .success(function(res){
            //klass.klasses = res;
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }
})
