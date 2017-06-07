import module from '../../../';

module.controller('conversationListController',
    function (conversationService, $state, userService, $rootScope, $timeout, $scope, notificationConversationMessageService) {
        const _ctrlConversationList = this;

        _ctrlConversationList.data = {
            conversations: []
        };

        _ctrlConversationList.photo = userService.photo;

        _ctrlConversationList.openConversation = function (conversation) {
            $state.go('main.conversation', {
                id: conversation.user.id
            });
        };

        function getListConversation() {
            conversationService.get().then(function (response) {
                _ctrlConversationList.data.conversations = response.conversations;

                notificationConversationMessageService.get().then(function (response) {
                    response.notifications.forEach(function (notification) {
                        let conversationId = notification.conversationId;

                        let conversation = _ctrlConversationList.data.conversations.find(function (iConversation) {
                            return +iConversation.id === conversationId;
                        });

                        if (conversation) {
                            conversation.notificationCount = notification.count;
                        }

                    });
                });
            });
        }

        getListConversation();

        _ctrlConversationList.updateNotification = function (notification) {

            let conversation = _ctrlConversationList.data.conversations.find(function (conversationData) {
                return +notification.conversation.id === +conversationData.id;
            });

            if (conversation) {

                if (!conversation.notificationCount) {
                    conversation.notificationCount = 0;
                }

                conversation.notificationCount++;

            } else {

                let newConversation = notification.conversation;

                newConversation.notificationCount = 1;

                _ctrlConversationList.data.conversations.push(newConversation);
            }

        };

        _ctrlConversationList.clearNotification = function (notification) {
            _ctrlConversationList.data.conversations.forEach(function (iConversation) {
                if (iConversation.id === notification.roomId) {
                    iConversation.notificationCount = 0;
                }
            });
        };

        let newNotificationMessage = $rootScope.$on('newNotificationConversationMessage', function ($event, data) {
            $timeout(function () {
                _ctrlConversationList.updateNotification(data);
            });
        });

        let clearNotificationCount = $rootScope.$on('clearNotificationCount', function ($event, data) {
            $timeout(function () {
                _ctrlConversationList.clearNotification(data);
            });
        });

        let updateConversationList = $rootScope.$on('conversationListChange', function () {
            $timeout(function () {
                getListConversation();
            });
        });

        $scope.$on('$destroy', function () {
            clearNotificationCount();
            newNotificationMessage();
            updateConversationList();
        });


    });