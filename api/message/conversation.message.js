'use strict';
const conversation = require('../conversation'),
    userApi = require('../user/'),
    conversationApi = require('../conversation/'),
    config = require('../../config'),
    _ = require('lodash');

function searchAccessRoom(conservation, userId) {
    return conservation.accessUserId.some(function (idAccess) {
        return idAccess === userId;
    });
}

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

function clearMesagerData(obj) {
    return _.pick(obj, config.message.field);
}
function clearRoomData(obj) {
    return _.pick(obj, ['id', 'accessUserId', 'create']);
}
module.exports = {
    add: function (data) {
        return new Promise(async function (resolve) {

            let searchConservation = await conversation.search(data);

            if (!searchConservation.success) {
                return resolve({
                    success: false,
                    message: 'Беседа не найдена.'
                });
            }

            if (!searchAccessRoom(searchConservation.conversation, data.userId)) {
                return resolve({
                    success: false,
                    message: 'Нет доступа.'
                });
            }

            searchConservation.conversation.message.push({
                creatorId: data.userId,
                text: data.message
            });

            searchConservation.conversation.markModified('message');

            let conservationChange = await searchConservation.conversation.save(),
                lastMessage = clearMesagerData(conservationChange.message[conservationChange.message.length - 1]);

            let searchUser = await userApi.search({
                id: lastMessage.creatorId
            });

            conservationChange = clearRoomData(conservationChange);

            conservationChange.user = clearUserData(searchUser.user);

            resolve({
                success: true,
                conversationId: +searchConservation.conversation.id,
                message: lastMessage,
                conversation: conservationChange
            });

        });
    },
    get: function (data) {
        return new Promise(async function (resolve) {

            let searchConservation = await conversation.search(data);

            if (!searchConservation.success) {
                return resolve({
                    success: false,
                    message: 'Беседа не найдена.'
                });
            }

            if (!searchAccessRoom(searchConservation.conversation, data.userId)) {
                return resolve({
                    success: false,
                    message: 'Нет доступа.'
                });
            }

            let userIdList = searchConservation.conversation.message.map(function (mess) {
                return mess.creatorId;
            });

            let usersList = await userApi.searchCollection(userIdList);

            let messages = searchConservation.conversation.message.map(function (mess) {

                mess = clearMesagerData(mess);

                mess.user = usersList.users.find(function (user) {
                    return mess.creatorId === user.id;
                });

                return mess;
            });

            resolve({
                success: true,
                messages: messages
            });
        });
    },
    getConversationsLastMessage: function (data) {
        return new Promise(async function (resolve) {
            let conversationSearch = await conversationApi.searchCollection(data.conversationIds);
            let conversationsLastMessage = conversationSearch.conversations.map(function (conversation) {
                if (conversation.message.length) {
                    return {
                        id: conversation.id,
                        lastMessageId: conversation.message[conversation.message.length - 1]['id']
                    };
                } else {
                    return {
                        id: conversation.id,
                        lastMessageId: 0
                    };
                }
            });
            resolve(conversationsLastMessage);
        });

    }
};