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
    get: function (data) {

        return new Promise(async function (resolve) {
            let sId = data.userId + '' + data.userInterlocutor,
                sId2 = data.userInterlocutor + '' + data.userId;

            let issetConversation = await conversationModel.findOne({$or: [{id: sId}, {id: sId2}]});

            let userSearch = await userApi.search({id: data.userInterlocutor});

            if (issetConversation) {

                let conversation = clearRoomData(issetConversation);

                conversation.user = clearUserData(userSearch.user);

                return resolve({
                    success: true,
                    conversation: conversation
                });
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
        });
    }
};