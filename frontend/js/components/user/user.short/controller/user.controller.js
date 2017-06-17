import module from '../../../';

module.controller('userController',
    function (userService) {
        const _ctrlUser = this;

        _ctrlUser.user = userService.get();

        _ctrlUser.photo = userService.photo;

        _ctrlUser.editUser = userService.editUser;
    });