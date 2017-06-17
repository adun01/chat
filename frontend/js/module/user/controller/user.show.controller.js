import module from '../';

module.controller('userShowController', function ($mdDialog, userService, userData, commonService) {
    const _ctrlUser = this;

    _ctrlUser.user = angular.copy(userData);

    _ctrlUser.user.date = commonService.createDateFromW3C(_ctrlUser.user.date);

    _ctrlUser.getPathPhoto = userService.photo;

    _ctrlUser.close = function () {
        $mdDialog.cancel();
    };
});
