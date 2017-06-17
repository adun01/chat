module.exports = {
    port: 5000,
    session: {
        live: 3000
    },
    user: {
        field: [
            'login',
            'email',
            'photo',
            'rooms',
            'conversations',
            'login',
            'id'
        ]
    },
    message: {
        field: [
            'text',
            'creatorId',
            'date',
            'roomId',
            'conversationId',
            'text',
            'id',
            'user'
        ]
    },
    room: {
        field: [
            'name',
            'create',
            'modify',
            'users',
            'bans',
            'creatorId',
            'photo',
            'message',
            'id',
            'lastMessage',
            'banned',
            'notification',
            'room',
            'conversation'
        ]
    }
};