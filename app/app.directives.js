app.directive('routeLoadingIndicator', function($rootScope) {
    return {
        restrict: 'E',
        template: '<div data-ng-show="isRouteLoading" style="width: 100%; height: 100%;"><div class="loading"></div></div>',
        link: function(scope, elem, attrs) {
            scope.isRouteLoading = false;

            $rootScope.$on('$stateChangeStart', function() {
                scope.isRouteLoading = true;
            });

            $rootScope.$on('$stateChangeSuccess', function() {
                scope.isRouteLoading = false;
            });
        }
    };
})

.directive("passwordVerify", function() {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});
