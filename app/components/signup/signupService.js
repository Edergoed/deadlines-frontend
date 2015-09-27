app
.service('signup', function($http){
    this.signup = function(user){
        return $http.post('http://api.deadlinesapi.dev:88/users', {user: {email: user.email, password: user.password, password_confirmation: user.password_confirmation, klass: user.klass} });
    }

    this.getAllKlasses = function(){
        var defer = $q.defer();

        //$http.get(urls.BASE_API + '/deadlines')
        $http.get(urls.BASE_API + '/klasses')
        .success(function(res){
            klass.klasses = res;
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }
})
