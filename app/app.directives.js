app.directive('initModel', function($compile) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope[attrs.initModel] = element[0].value;
            element.attr('ng-model', attrs.initModel);
            element.removeAttr('init-model');
            $compile(element)(scope);
        }
    };
});
