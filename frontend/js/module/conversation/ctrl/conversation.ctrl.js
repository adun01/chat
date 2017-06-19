import module from '../';

module.controller('conversationController',
    function (roomService, conversationData) {

        const _ctrlConversation = this;

        roomService.set(conversationData);

        _ctrlConversation.room = roomService.getCurrentRoom();
    });