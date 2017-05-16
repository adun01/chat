import module from '../';

module.controller('userShowController', function ($mdDialog, userService, userData, commonService) {
    const _ctrlUserShow = this;

    _ctrlUserShow.data = {
        user: angular.copy(userData)
    };

    _ctrlUserShow.data.user.date = commonService.createDateFromW3C(_ctrlUserShow.data.user.date);

    _ctrlUserShow.getPathPhoto = userService.photo;

    _ctrlUserShow.close = function () {
        $mdDialog.cancel();
    };
});
