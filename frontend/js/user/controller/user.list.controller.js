import module from '../';

module.controller('userListController', function (userService, roomService, roomUserAgreedService, $state) {
    const _ctrlUserList = this;

    _ctrlUserList.data = {
        room: {
            id: $state.params.id
        },
        userAgreed: []
    };

    _ctrlUserList.showUser = userService.showUser;

    _ctrlUserList.getPathPhoto = userService.photo;

    roomUserAgreedService.get({id: $state.params.id}).then(function (response) {
        _ctrlUserList.data.userAgreed = response.userAgreed;
    });
});