import module from '../';
import notificationTpl from './view/notification.room.view.html';

module.component('notificationRoom', {
    template: notificationTpl,
    controller: 'notificationRoomController',
    controllerAs: '_ctrlNotificationRoom'
});