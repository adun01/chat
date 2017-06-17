import module from '../../../';

module.controller('roomListController',
    function ($scope, roomService, userService, $timeout, $rootScope, $state) {
        const _ctrlRoomList = this;

        _ctrlRoomList.data = {
            collection: []
        };

        function getListRoom() {
            roomService.get().then(function (response) {
                _ctrlRoomList.data.collection = response.collection;
            });
        }

        function getRoom(data) {
            roomService.get(data).then(function () {
                debugger;
            });
        }

        getListRoom();

        $rootScope.$on('messageNotification', function ($event, data) {

            let issetList = _ctrlRoomList.data.collection.find(function (room) {
                return room.id === data.roomId;
            });

            if (!issetList) {

                $timeout(function () {
                    getRoom({
                        id: data.roomId
                    });
                });
            }
        });
    });