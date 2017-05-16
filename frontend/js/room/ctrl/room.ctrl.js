import module from '../';

module.controller('roomController', function (userData, $state) {

    const _ctrlRoom = this;

    _ctrlRoom.data = {
        name: $state.params.name,
        users: []
    };
});