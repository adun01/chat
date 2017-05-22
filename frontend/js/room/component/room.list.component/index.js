import module from '../../';
import roomListTpl from './view/room.list.view.html';

module.component('roomList', {
    controller: 'roomListController',
    controllerAs: '_ctrlRoomList',
    template: roomListTpl
});