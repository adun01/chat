import module from '../../';
import roomHeaderTpl from './view/room.header.view.html';

module.component('roomHeader', {
    controller: 'roomHeaderController',
    controllerAs: '_ctrlHeaderList',
    template: roomHeaderTpl
});