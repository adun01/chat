import module from '../../';
import showNotificationTpl from '../view/notification.room.show.view.html';

module.controller('notificationRoomController', function ($scope, $mdDialog, notificationRoomService, socketService) {
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

    socketService.subscribe.subscribes({
        name: 'addUserInvited',
        fn: function (data) {
            let issetNotification = _ctrlNotificationRoom.data.notifications.some(function (room) {
                return +room.id === +data.room.id;
            });

            if (!issetNotification) {
                $scope.$apply(function () {
                    _ctrlNotificationRoom.data.notifications.push(data.room);
                });
            }
        }
    });

    _ctrlNotificationRoom.init();
});