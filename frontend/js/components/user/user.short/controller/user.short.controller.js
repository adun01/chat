import module from '../../../';

module.controller('userShortController',
    function (userService, $rootScope) {
        const _ctrlUser = this;

        _ctrlUser.user = userService.get();

        _ctrlUser.photo = userService.photo;

        _ctrlUser.editUser = userService.editUser;

        $rootScope.$on('userReboot', () => {
            _ctrlUser.user = userService.get();
        });
    });