angular.module('Deadlines')
	.controller('DeadlinesCtrl', function($scope, deadline){
		$scope.init = function(){
			$scope.getAllDeadlines();
		}

		$scope.create = function(){
			//show information here
		}

		$scope.getAll = function(){
			task.getAllDeadlines()
			.then(function(res){
				//success
				$scope.deadlines = task.deadlineList;
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
		})

		$scope.init();
	})