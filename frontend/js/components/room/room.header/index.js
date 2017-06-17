import module from '../../';
import roomHeaderTpl from './view/room.header.html';

module.component('roomHeader', {
    controller: 'roomHeaderController',
    controllerAs: '_ctrlHeaderRoom',
    template: roomHeaderTpl
});