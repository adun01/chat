import module from '../../';
import roomListTpl from './view/room.list.html';

module.component('roomList', {
    controller: 'roomListController',
    controllerAs: '_ctrlRoomList',
    template: roomListTpl
});