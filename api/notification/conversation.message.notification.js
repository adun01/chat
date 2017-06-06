const userApi = require('../user/'),
    conversationApi = require('../conversation/'),
    conversationMessage = require('../message/conversation.message'),
    _ = require('lodash'),
    config = require('../../config');

function clearRoomField(rooms) {

    let fieldAccess = _.remove(_.clone(config.room.field), function (name) {
        return ['message', 'userAgreed', 'userInvited'].indexOf(name) === -1;
    });

    if (_.isArray(rooms)) {
        return rooms.map(function (room) {
            return _.pick(room, fieldAccess);
        });
    } else {

        return _.pick(rooms, fieldAccess);
    }
}

function allowRoom(userId, accessUserId) {
    return accessUserId.some(function (id) {
        return id === userId;
    })
}

module.exports = {
    get: function (data) {
        return new Promise(async function (resolve) {
            let userSearch = await userApi.search({id: data.userId});

            if (!userSearch.success) {
                return resolve(userSearch);
            }

            let user = userSearch.user;

            let conversationIds = user.conversations.map(function (conversation) {
                return conversation.id;
            });

            let conversationsLastMessage = await conversationMessage.getConversationsLastMessage({conversationIds: conversationIds});

            let notifications = [];

            user.conversations.forEach(function (conversation) {

                conversationsLastMessage.find(function (conversationMessageLast) {

                    if (+conversationMessageLast.id === conversation.id) {

                        let count = conversationMessageLast.lastMessageId - conversation.messageId;
                        if (count > 0) {
                            notifications.push({
                                conversationId: conversation.id,
                                count: count
                            });
                        }
                    }
                });

            });

            resolve({
                success: true,
                notifications: notifications
            });

        });
    },
    save: function (data) {
        return new Promise(async function (resolve) {
            let userSearch = await userApi.search({
                id: data.userId
            });

            if (!userSearch.success) {
                return resolve(userSearch);
            }

            let user = userSearch.user;

            let conversationSearch = await conversationApi.search(data);

            if (!conversationSearch.success) {
                return resolve(conversationSearch);
            }

            let conversation = conversationSearch.conversation;

            if (!allowRoom(data.userId, conversation.accessUserId)) {

                return resolve({
                    success: false,
                    message: 'Нет доступа'
                });
            }

            user.conversations.forEach(function (conversation) {
                let conversationId = '' + conversation.id;
                if (+conversationId.replace(data.userId, '') === data.userInterlocutor) {
                    if (conversation.messageId < data.messageId) {
                        conversation.messageId = data.messageId;
                    }
                }
            });

            user.markModified('conversations');

            await user.save();

            resolve({
                success: true
            });

        });
    }

};