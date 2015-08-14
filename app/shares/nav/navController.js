angular.module('Deadlines')
	.controller('NavCtrl', function($scope, $rootScope) {
		$scope.DocVisible = false;

		$scope.close = function(e) {
			$scope.DocVisible = false;
			console.log('close');
		};

		$scope.show = function(e) {
			$scope.DocVisible = true;
			e.stopPropagation();
			console.log('open');
		};

		//$rootScope.$on("documentClicked", _close);
	    //$rootScope.$on("escapePressed", _close);

	    function _close() {
	        $scope.$apply(function() {
	            $scope.close();
	        });
	        
	    };
	})
	.run(function($rootScope) {
        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 27)
                $rootScope.$broadcast("escapePressed", e.target);
        });

        document.addEventListener("click", function(e) {
            $rootScope.$broadcast("documentClicked", e.target);
               
        });
    });