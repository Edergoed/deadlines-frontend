angular.module('Deadlines')
  .service('deadline', function deadline($http, $q, $rootScope) {
  
  var deadline = this;
  deadline.deadlineList = {};

  deadline.getAllDeadlines = function(){
  	var defer = $q.defer();

  	$http.get($rootScope.endPoint + '/deadlines')
  	.success(function(res){
  		deadline.deadlineList = res;
  		defer.resolve(res);
  	})
  	.error(function(err, status){
  		defer.reject(err);
  	})

  	return defer.promise;
  }

  deadline.createDeadline = function(deadline){
  	var defer = $q.defer();

  	$http.post($rootScope.endPoint + '/newDeadline', deadline)
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

  	$http.delete($rootScope.endPoint + '/deleteDeadline?dealineId=' + id)
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