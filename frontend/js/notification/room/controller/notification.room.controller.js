import module from '../../';
import showNotificationTpl from '../view/notification.room.show.view.html';

module.controller('notificationRoomController', function ($mdDialog, notificationRoomService) {
    const _ctrlNotificationRoom = this;

    _ctrlNotificationRoom.data = {
        notifications: []
    };

    _ctrlNotificationRoom.showNotification = function (e) {
        $mdDialog.show({
            template: showNotificationTpl,
            controller: 'notificationShowController',
            controllerAs: '_ctrlNSRoom',
            parent: angular.element(document.body),
            targetEvent: e,
            clickOutsideToClose: true,
            resolve: {
                notificationsData: function () {
                    return _ctrlNotificationRoom.data.notifications;
                }
            }
        }).then(function (notifications) {
            _ctrlNotificationRoom.data.notifications = notifications;
        });
    };

    _ctrlNotificationRoom.init = function () {
        notificationRoomService.get().then(function (rooms) {
            _ctrlNotificationRoom.data.notifications = rooms;
        });
    };

    _ctrlNotificationRoom.init();
});