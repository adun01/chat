import module from '../../../';

module.controller('userItemController',
    function ($scope, userService, $state) {
        const _ctrlUserItem = this;

        _ctrlUserItem.currentUser = userService.get();
        _ctrlUserItem.user = $scope.user;
        _ctrlUserItem.lastMessage = $scope.lastMessage;
        _ctrlUserItem.hideActions = $scope.hideActions;
        _ctrlUserItem.align = $scope.align || 'left';

        _ctrlUserItem.photo = userService.photo;

        _ctrlUserItem.openConversation = function ($event) {

            if (_ctrlUserItem.currentUser.id === _ctrlUserItem.user.id) {
                userService.showUser($event, _ctrlUserItem.user);
            } else {
                $state.go('main.conversation', {
                    id: _ctrlUserItem.user.id
                });
            }
        };

    });