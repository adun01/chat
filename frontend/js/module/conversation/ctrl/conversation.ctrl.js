import module from '../';
import userSearchTpl from '../../room/view/user.search.html';

module.controller('conversationController',
    function (roomService, conversationData) {

        const _ctrlConversation = this;

        roomService.set(conversationData);

        _ctrlConversation.room = roomService.getCurrentRoom();
    });