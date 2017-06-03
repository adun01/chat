import module from '../../';
import roomSearhTpl from './view/room.search.view.html';

module.component('roomSearch', {
    controller: 'roomSearchController',
    controllerAs: '_ctrlRoomSearch',
    template: roomSearhTpl
});