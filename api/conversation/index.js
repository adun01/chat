const conversationModel = require('../../db/conversation/conversation.model'),
    config = require('../../config'),
    _ = require('lodash'),
    userApi = require('../user/');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

function clearRoomData(obj) {
    return _.pick(obj, ['id', 'accessUserId', 'create']);
}

module.exports = {
    search: function (data) {
        return new Promise(async function (resolve) {

            let sId = data.userId + '' + data.userInterlocutor,
                sId2 = data.userInterlocutor + '' + data.userId;

            let conversation = await conversationModel.findOne({$or: [{id: sId}, {id: sId2}]});

            if (conversation) {

                return resolve({
                    success: true,
                    conversation: conversation
                });
            }

            return resolve({
                success: false,
                message: 'Беседа не найдена.'
            });
        })
    },
    getAll: function (data) {
        return new Promise(async function (resolve) {

            let conversations = await conversationModel.find({accessUserId: {$in: [data.userId]}});

            let userIds = conversations.map(function (conservation) {
                return +conservation.id.replace(data.userId, '');
            });

            let usersList = await userApi.searchCollection(userIds);

            conversations = conversations.map(function (conversation) {
                let userId = +conversation.id.replace(data.userId, '');

                let user = usersList.users.find(function (user) {
                    return user.id === userId;
                });

                conversation = clearRoomData(conversation);

                conversation.user = user;
                return conversation;
            });

            resolve({
                success: true,
                conversations: conversations
            });

        });
    },
    get: function (data) {

        let self = this;

        return new Promise(async function (resolve) {

            let searchConversation = await self.search(data);

            if (searchConversation.success) {
                searchConversation.conversation = clearRoomData(searchConversation.conversation);
                let userSearch = await userApi.search({id: data.userInterlocutor});

                if (!userSearch.success) {
                    return resolve(userSearch);
                }

                if (userSearch.success && userSearch.user.id === data.userId) {
                    return resolve({
                        success: false,
                        message: 'Нельзя начать беседу с самим собой.'
                    })
                }

                searchConversation.conversation.user = clearUserData(userSearch.user);

                return resolve(searchConversation);
            } else {
                let sId = data.userId + '' + data.userInterlocutor;

                let userSearch = await userApi.search({id: data.userInterlocutor});

                if (!userSearch.success) {
                    return resolve(userSearch);
                }

                if (userSearch.success && userSearch.user.id === data.userId) {
                    return resolve({
                        success: false,
                        message: 'Нельзя начать беседу с самим собой.'
                    })
                }

                let conversation = await new conversationModel({
                    id: sId,
                    accessUserId: [data.userId, data.userInterlocutor]
                }).save();

                conversation = clearRoomData(conversation);

                conversation.user = clearUserData(userSearch.user);

                return resolve({
                    success: true,
                    conversation: conversation
                });
            }
        });
    },
    searchCollection: function (collection) {
        let conversations = [], allPromise = [];

        return new Promise(function (resolve) {

            collection.forEach(function (id) {
                let Ipromise = conversationModel.findOne({id:id});

                allPromise.push(Ipromise);

                Ipromise.then(function (conversation) {
                    conversations.push(conversation);
                });
            });

            Promise.all(allPromise).then(function () {
                resolve({
                    success: true,
                    conversations: conversations
                });
            });

        });
    },
};