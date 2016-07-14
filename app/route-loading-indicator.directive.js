// angular
// .module('Deadlines')
// directive('routeLoadingIndicator', function($rootScope) {
//     return {
//         restrict: 'E',
//         template: '<div data-ng-show="isRouteLoading" style="width: 100%; height: 100%;"><div class="loading"></div></div>',
//         link: function(scope, elem, attrs) {
//             scope.isRouteLoading = false;
//
//             $rootScope.$on('$stateChangeStart', function() {
//                 scope.isRouteLoading = true;
//             });
//
//             $rootScope.$on('$stateChangeSuccess', function() {
//                 scope.isRouteLoading = false;
//             });
//         }
//     };
// })
//
