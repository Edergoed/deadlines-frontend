app
.service('signup', function($http, $q, urls){
    this.signup = function(user){
        return $http.post(urls.BASE_API + '/users', {user: {email: user.email, password: user.password, password_confirmation: user.password_confirmation, klass: user.klass, firstname: user.firstname, lastname: user.lastname, prefix: user.prefix} });
    }

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

    this.activate = function(activationToken){
        var defer = $q.defer();

        //$http.get(urls.BASE_API + '/deadlines')
        $http.post(urls.BASE_API + '/activate', {activationToken: activationToken})
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }
})
