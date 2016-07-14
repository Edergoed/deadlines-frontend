angular
.module('Deadlines')
.service('deadline', function deadline($http, $q, $rootScope, urls, deadlineDistance) {

    var deadline = this;
    deadline.deadlines = {};
    deadline.deadline = {};
    deadline.backgroundColor = {};

    deadline.getAllDeadlines = function(archive){
        var defer = $q.defer();

        if(archive == true){

            $http.get(urls.BASE_API + '/archive')
            .success(function(res){
                deadline.deadlines = deadlineDistance.getDistance(res);
                deadline.backgroundColor = deadlineDistance.backgroundColor;
                //deadline.deadlines = res;
                defer.resolve(res);
            })
            .error(function(err, status){
                defer.reject(err);
            })
        } else {

            //$http.get(urls.BASE_API + '/deadlines')
            $http.get(urls.BASE_API + '/deadlines')
            .success(function(res){
                deadline.deadlines = deadlineDistance.getDistance(res);
                //deadline.deadlines = res;
                deadline.backgroundColor = deadlineDistance.backgroundColor;
                defer.resolve(res);
            })
            .error(function(err, status){
                defer.reject(err);
            })
        }
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

    deadline.updateDeadline = function(user, deadline){
        var defer = $q.defer();

        $http.patch(urls.BASE_API + '/users/' + user + '/deadlines/' + deadline.id, {deadline : deadline, klass_ids : deadline.klass_ids})
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

        $http.post(urls.BASE_API + '/users/' + user + '/deadlines', {deadline : deadline.deadline, klass_ids : deadline.deadline.klass_ids})
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
