import module from '../../../';
import showNotificationTpl from '../view/notification.room.show.view.html';

module.controller('notificationRoomController',
    function ($scope, $timeout, $mdDialog, notificationRoomService, $rootScope) {
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
            }).then(function () {
                _ctrlNotificationRoom.init();
            }, function () {
                _ctrlNotificationRoom.init();
            });
        };

        _ctrlNotificationRoom.init = function () {
            notificationRoomService.get().then(function (rooms) {
                _ctrlNotificationRoom.data.notifications = rooms;
            });
        };

        _ctrlNotificationRoom.init();

        let newNotifyRoom = $rootScope.$on('newNotificationRoom', function () {
            $timeout(function () {
                _ctrlNotificationRoom.init();
            });
        });

        $scope.$on('$destroy', function () {
            newNotifyRoom();
        });

    });