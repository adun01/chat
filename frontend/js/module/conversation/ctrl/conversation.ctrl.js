import module from '../';
import userSearchTpl from '../../room/view/user.search.html';

module.controller('conversationController',
    function (roomService, socketService) {

        const _ctrlConversation = this;

        _ctrlConversation.room = roomService.getCurrentRoom();

        socketService.emit('roomOpen', {
            roomId: _ctrlConversation.room.id
        });
    });