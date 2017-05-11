import module from '../';

module.controller('editUserController', function (FileUploader, userService, $mdDialog) {
    const _ctrlShowUser = this;

    _ctrlShowUser.data = {
        user: userService.get()
    };

    _ctrlShowUser.getPathPhoto = userService.photo;

    _ctrlShowUser.close = function () {
        $mdDialog.hide();
    };
});
