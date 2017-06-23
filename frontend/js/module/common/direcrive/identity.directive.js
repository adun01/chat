import module from '../';

module.directive('identity', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            password: '=identity'
        },
        link: function ($scope, $element, $attr, $model) {
            
            $scope.$watch(function () {
                return $scope.password;
            }, function () {
                checkIdentity();
            });

            $model.$parsers.push(checkIdentity);

            function checkIdentity() {

                $model.$setValidity('identity', false);
                if ($model.$viewValue && $model.$viewValue === $scope.password) {
                    $model.$setValidity('identity', true);
                    return $model.$viewValue;
                }
            }
        }
    };
});