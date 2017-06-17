const conversationModel = require('../../db/conversation/conversation.model'),
    userApi = require('../user/'),
    helper = require('../helper');

class ConversationApi {

    getById(conversationIds) {
        return new Promise(async resolve => {
            if (typeof conversationIds === 'number') {
                return resolve(await conversationModel.findOne({id: conversationIds}));
            } else {
                return resolve(await conversationModel.find({id: {$in: conversationIds}}));
            }
        });
    }

    search(userId, userInterlocutor) {
        return new Promise(async resolve => {

            let sId = userId + '' + userInterlocutor,
                sId2 = userInterlocutor + '' + userId,
                conversation;

            conversation = await conversationModel.findOne({$or: [{id: sId}, {id: sId2}]});

            conversation.user = await userApi.getSimple(userInterlocutor);

            return resolve(conversation);
        })
    }

    create(userId = false, userInterlocutorId = false) {
        return new Promise(async resolve => {
            let sId = userId + '' + userInterlocutorId,
                conversation;

            if (!userId || !userInterlocutorId) {
                resolve({
                    success: false,
                    message: 'Нет данных.'
                });
            }

            conversation = await new conversationModel({
                id: sId,
                users: [userId, userInterlocutorId]
            }).save();

            conversation = helper.clearRoom(conversation);

            return resolve({
                success: true,
                conversation: conversation
            });
        })
    }

    get(userId, userInterlocutorId = false) {
        return new Promise(async resolve => {

            if (userInterlocutorId) {

                if (userId === userInterlocutorId) {

                    return resolve({
                        success: false,
                        message: 'Нельзя начать беседу с самим собой.'
                    });
                }

                let conversation = this.search(userId, userInterlocutorId),
                    user = await userApi.getSimple(userInterlocutorId);

                if (conversation) {

                    conversation = helper.clearRoom(conversation);
                    conversation.user = helper.clearUser(user);

                    conversation.lastMessage = await this.getLastMessage(conversation.id);

                    return resolve({
                        success: true,
                        conversation: conversation
                    });

                } else {

                    conversation = await this.create(userId, userInterlocutorId);

                    conversation = helper.clearRoom(conversation);

                    conversation.user = user;

                    return resolve({
                        success: true,
                        conversation: conversation
                    });
                }
            } else {
                let conversations = await conversationModel.find({users: {$in: [userId]}}),
                    user = await userApi.getSimple(userId),
                    messageList;

                messageList = await this.getLastMessage(conversations.map(conversation => {
                    return conversation.id;
                }));

                conversations = conversations.forEach(conversation => {

                    conversation = helper.clearRoom(conversation);

                    conversation.conversation = true;

                    conversation.lastMessage = messageList.find(message => {
                        return message.conversationId === conversation.id;
                    });

                    conversation.notification = this.notification(user, conversation.lastMessage);
                });


                return resolve({
                    success: true,
                    conversations: conversations
                });
            }
        });
    }

    notification(user, lastMessage) {
        let userRead = user.conversation.find(conversation => {
            return conversation.id === lastMessage.conversationId;
        });


        if (!userRead) {
            return 0;
        }

        return lastMessage.id - userRead.messageId;
    }

    getLastMessage(conversationIds) {

        return new Promise(async resolve => {

            if (typeof conversationIds === 'number') {

                let conversation = await this.getById(conversationIds),
                    message, user;

                message = conversation.message[conversation.message.length - 1];

                user = await userApi.getSimple(message.creatorId);

                message.user = helper.clearUser(user);

                message.conversationId = conversationIds;

                return resolve(message);
            } else {

                let conversations = await this.getById(conversationIds),
                    messages, users;

                messages = conversations.map(conversation => {
                    return conversation.message[conversation.message - 1];
                });

                users = userApi.getSimple(messages.map(message => {
                    return message.creatorId;
                }));

                messages = messages.forEach(message => {
                    messages.user = users.find(user => {
                        return user.id === message.creatorId;
                    })
                });

                return resolve(messages);

            }
        });
    }

    addMessage(userId, userInterlocutor, message) {
        return new Promise(async resolve => {
            let conversation = await conversationApi.search(userId, userInterlocutor),
                user = await userApi.getSimple(userId), lastMessage;

            if (conversation) {

                return resolve({
                    success: false,
                    message: 'Диалог не найдена.'
                });
            }

            conversation.message.push({
                creatorId: userId,
                text: message,
                conversationId: conversation.id,
                user: helper.clearUser(user)
            });

            conversation.markModified('message');

            await conversation.save();

            lastMessage = await this.getLastMessage(conversation.id);

            resolve({
                success: true,
                lastMessage: lastMessage,
                conversation: helper.clearRoom(conversation)
            });

        });
    }

    getMessage(userId, userInterlocutor) {
        return new Promise(async resolve => {
            let conversation = await this.search(userId, userInterlocutor);

            if (conversation) {

                return resolve({
                    success: false,
                    message: 'Диалог не найдена.'
                });
            }

            resolve({
                success: true,
                message: helper.clearMessage(conversation.message)
            });

        });

    }
}

module.exports = new ConversationApi();