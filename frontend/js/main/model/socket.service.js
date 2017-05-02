import module from '../';

module.service('socketService', function () {
    const socket = io();
    return socket;
});