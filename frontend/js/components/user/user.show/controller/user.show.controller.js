import module from '../../../';

module.controller('userShowController',
    function ($scope, $mdDialog, userService, commonService, $state) {
        const _ctrlUser = this;

        _ctrlUser.user = angular.copy($scope.user);

        _ctrlUser.user.date = commonService.createDateFromW3C(_ctrlUser.user.date);

        _ctrlUser.getPathPhoto = userService.photo;

        _ctrlUser.openConversation = () => {
            $state.go('main.conversation', {
                id: _ctrlUser.user.id
            });
        };

        _ctrlUser.close = function () {
            $mdDialog.cancel();
        };
    });
