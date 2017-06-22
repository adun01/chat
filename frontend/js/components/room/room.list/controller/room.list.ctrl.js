import module from '../../../';

module.controller('roomListController',
    function ($scope, roomService, userService, $timeout, $rootScope) {
        const _ctrlRoomList = this;

        _ctrlRoomList.user = userService.get();

        _ctrlRoomList.data = {
            collection: []
        };

        _ctrlRoomList.getUserConversation = (users) => {

            return users.find((user) => {
                return _ctrlRoomList.user.id !== user;
            });
        };

        let getListRoom = () => {
            roomService.get().then(response => {
                _ctrlRoomList.data.collection = response.collection;
            });
        };

        getListRoom();

        let messageNotificationRemove = $rootScope.$on('newNotification', ($event, room) => {

            let issetRoom = _ctrlRoomList.data.collection.some(iRoom => {
                return iRoom.id === room.id;
            });

            if (!issetRoom) {

                $timeout(() => {
                    _ctrlRoomList.data.collection.push(room);
                });
            }
        });

        $scope.$on('destroy', () => {
            messageNotificationRemove();
        });
    });