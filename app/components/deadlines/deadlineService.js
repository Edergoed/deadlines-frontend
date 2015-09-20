angular.module('Deadlines')
.service('deadline', function deadline($http, $q, $rootScope, urls) {

    var deadline = this;
    deadline.deadlineList = {};
    deadline.deadline = {};

    deadline.getAllDeadlines = function(){
        var defer = $q.defer();

        //$http.get(urls.BASE_API + '/deadlines')
        $http.get(urls.BASE_API + '/deadlines')
        .success(function(res){
            deadline.deadlineList = res;
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }

    deadline.getDeadline = function(id){
        var defer = $q.defer();

        $http.get(urls.BASE_API + '/deadlines/' + id)
        .success(function(res){
            deadline.deadline = res;
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }

    deadline.updateDeadline = function(id){
        var defer = $q.defer();

        $http.patch(urls.BASE_API + 'user/' + iduser + '/deadlines/' + id)
        .success(function(res){
            deadline.deadline = res;
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }

    deadline.createDeadline = function(user, deadline){
        var defer = $q.defer();

        $http.post(urls.BASE_API + '/users/' + user + '/deadlines', deadline)
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }

    deadline.deleteDeadline = function(id){
        var defer = $q.defer();

        $http.delete(urls.BASE_API + '/deleteDeadline?dealineId=' + id)
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(err, status){
            defer.reject(err);
        })

        return defer.promise;
    }

    return deadline;

});
