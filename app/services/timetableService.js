app.service('timetable', function($http, $q, urls, auth){
    var self = this;
    self.user ={};

    self.getTimetable = function(type, klass){
        var defer = $q.defer();

        console.log(urls.BASE_API + '/timetable?usertype=' + type + '&klass=' + klass);
        $http.get(urls.BASE_API + '/timetable?usertype=' + type + '&klass=' + klass)
        // $http.get(urls.BASE_API + '/timetable', {usertype: type, klass: klass})
        .success(function(res){
            defer.resolve(res);
        })
        .error(function(res){
            defer.reject(res);
        })

        return defer.promise;
    }
});
