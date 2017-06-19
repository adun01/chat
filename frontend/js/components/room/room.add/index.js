import module from '../../';
import roomAddTpl from './view/room.add.html';

module.component('roomAdd', {
    controller: 'roomAddController',
    controllerAs: '_ctrlRoom',
    template: roomAddTpl,
    scope: {
        room: '='
    }
});