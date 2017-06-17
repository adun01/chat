import module from '../../../';

module.controller('userItemController',
    function ($scope, userService, $state) {
        const _ctrlUserItem = this;

        _ctrlUserItem.currentUser = userService.get();
        _ctrlUserItem.user = $scope.user;
        _ctrlUserItem.lastMessage = $scope.lastMessage;
        _ctrlUserItem.hideActions = $scope.hideActions;

        _ctrlUserItem.photo = userService.photo;

        _ctrlUserItem.openConversation = function () {

            if (_ctrlUserItem.currentUser.id === _ctrlUserItem.user.id) {
                userService.editUser();
            } else {
                $state.go('main.conversation', {
                    id: _ctrlUserItem.user.id
                });
            }
        };

    });