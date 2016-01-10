'use strict';

app.service('user', function($http, $q, urls, auth){
    var self = this;
    self.user ={};

    self.current = function(){
        //return auth.parseJwt(auth.getToken());

        var token = auth.getToken();
        if(token) {
            self.user = auth.parseJwt(auth.getToken());
            return self.user
        } else {
            return false;
        }
    }

    self.gravatar = function (hash, size) {

        var size = size || 30;

        return 'https://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
    }

    self.signin = function(user){
        var defer = $q.defer();
        return $http.post(urls.BASE_API + '/sessions', {email: user.email, password: user.password })
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })
    }

    self.signup = function(user){
        var defer = $q.defer();
        return $http.post('http://api.deadlinesapi.dev:88/users', {user: {email: user.email, password: user.password, password_confirmation: user.password_confirmation, firstname: user.firstname, lastname: user.lastname, prefix: user.prefix} })
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })
    }

    self.getUser = function(id){
        var defer = $q.defer();
        return $http.get(urls.BASE_API + '/users/' + id)
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(res){
            defer.resolve(res);
        })
    }

    self.updateUser = function(user){
        var defer = $q.defer();
        return $http.patch(urls.BASE_API + '/users/' + user.id, {user: {klass: user.klass}})
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(res){
            defer.resolve(res);
        })
    }
    self.resetPassword = function(user){
        var defer = $q.defer();
        return $http.patch(urls.BASE_API + '/users/' + user.id + '/reset_password', {user: {password: user.klass, password_confirmation: user.password_confirmation}})
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(res){
            defer.resolve(res);
        })
    }
});

