angular.module('Deadlines')
	.controller('DeadlinesCtrl', function($scope, deadline){
		$scope.init = function(){
			$scope.getAll();
		}

		$scope.create = function(){
			//show information here
		}

		$scope.getAll = function(){
			deadline.getAllDeadlines()
			.then(function(res){
				//success
				$scope.deadlineList = deadline.deadlineList;
			}, function(res){
				//error
			})
		}

		$scope.deleteDeadline = function(id){
			deadline.deleteDeadline(id)
			.then(function(res){
				$scope.getAll();
				//success
			}, function(){
				//error
			})
		}

		$scope.init();
	})