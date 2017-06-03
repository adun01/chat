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
    }
};