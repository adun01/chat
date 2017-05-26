'use strict';

module.exports = {
    port: 5000,
    session: {
        live: 3000
    },
    user: {
        field: ['login', 'id', 'photo', 'email', 'date']
    },
    message: {
        field: ['id', 'text', 'date', 'creatorId']
    },
    room: {
        field: ['id', 'creatorId', 'date', 'name', 'message', 'photo', 'create', 'userInvited', 'userAgreed']
    }
};