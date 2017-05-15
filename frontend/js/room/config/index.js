import module from '../';
import roomTpl from '../view/room.view.html'

export default module.config(function ($stateProvider) {
    $stateProvider
        .state('resolve.main.room', {
            url: 'room/:name/',
            controller: 'roomController',
            controllerAs: '_ctrlRoom',
            template: roomTpl,
            params: {
                name: {value: 'main'}
            },
        })
});