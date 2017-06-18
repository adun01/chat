const conversationModel = require('../../db/conversation/conversation.model'),
    userApi = require('../user/'),
    helper = require('../helper');

class ConversationApi {

    search(userId, userInterlocutor) {
        return new Promise(async resolve => {

            let sId = userId + '' + userInterlocutor,
                sId2 = userInterlocutor + '' + userId,
                conversation;

            conversation = await conversationModel.findOne({
                $or: [
                    {id: sId},
                    {id: sId2}
                ]
            });

            conversation.conversation = true;

            if (conversation) {
                conversation.user = await userApi.getSimple(userInterlocutor);
            }

            return resolve(conversation);
        })
    }

    create(userId = false, userInterlocutorId = false) {
        return new Promise(async resolve => {
            let sId = userId + '' + userInterlocutorId,
                conversation;

            if (typeof userId !== 'number' || typeof userInterlocutorId !== 'number') {

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

            conversation.conversation = true;

            return resolve({
                success: true,
                conversation: conversation
            });
        })
    }

    get(userId, userInterlocutorId = false) {
        return new Promise(async resolve => {

            if (typeof userInterlocutorId === 'number') {

                if (userId === userInterlocutorId) {

                    return resolve({
                        success: false,
                        message: 'Нельзя начать беседу с самим собой.'
                    });
                }

                let conversation = await this.search(userId, userInterlocutorId),
                    user = await userApi.getSimple(userInterlocutorId);

                if (conversation) {

                    conversation = helper.clearRoom(conversation);
                    conversation.user = helper.clearUser(user);

                    conversation.user.lastMessage = await this.getLastMessage(conversation);

                    return resolve({
                        success: true,
                        conversation: conversation
                    });

                } else {

                    let conversationCreate = await this.create(userId, userInterlocutorId),
                        conversation;

                    if (!conversationCreate.success) {
                        return resolve(conversationCreate);
                    }

                    conversation = helper.clearRoom(conversationCreate.conversation);

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

                messageList = await this.getLastMessage(conversations);

                conversations = await this.searchUserFoConversation(conversations, userId);

                conversations = conversations.map(conversation => {

                    conversation = helper.clearRoom(conversation);

                    conversation.conversation = true;

                    conversation.user.lastMessage = messageList.find(message => {
                        return message.conversationId === conversation.id;
                    });

                    conversation.notification = this.notification(user, conversation.user.lastMessage);

                    return conversation;
                });

                return resolve({
                    success: true,
                    conversations: conversations
                });
            }
        });
    }

    notification(user, lastMessage) {
        let userRead = user.conversations.find(conversation => {
            return conversation.id === lastMessage.conversationId;
        });


        if (!userRead) {
            return 0;
        }

        return lastMessage.id - userRead.messageId;
    }

    getLastMessage(conversations) {

        return new Promise(async resolve => {

            if (typeof conversations.length === 'undefined') {

                let message, user;

                message = conversations.message[conversations.message.length - 1];

                if (message) {
                    user = await userApi.getSimple(message.creatorId);
                    message.user = helper.clearUser(user);
                    message.conversationId = conversations.id;
                }

                return resolve(helper.clearMessage(message));
            } else if (conversations && typeof conversations.length !== 'undefined') {

                let messages, users = [];

                messages = conversations.map(conversation => {
                    return conversation.message[conversation.message.length - 1];
                });

                users.push(...await userApi.getSimple(messages.map(message => {
                    return message.creatorId;
                })));

                messages.forEach(message => {
                    message.user = users.find(user => {
                        return user.id === message.creatorId;
                    });
                });

                return resolve(helper.clearMessage(messages));
            }
        });
    }

    addMessage(userId, userInterlocutor, message) {
        return new Promise(async resolve => {
            let conversation = await this.search(userId, userInterlocutor),
                user = await userApi.getSimple(userId), lastMessage;

            if (!conversation) {

                return resolve({
                    success: false,
                    message: 'Диалог не найден.'
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

            conversation = await this.searchUserFoConversation(conversation, userId);

            conversation.user.lastMessage = await this.getLastMessage(conversation);

            resolve({
                success: true,
                conversation: helper.clearRoom(conversation)
            });

        });
    }

    getMessage(userId, userInterlocutor) {
        return new Promise(async resolve => {

            let conversation = await this.search(userId, userInterlocutor),
                users, messages;

            if (!conversation) {

                return resolve({
                    success: false,
                    message: 'Диалог не найден.'
                });
            }

            users = await userApi.getSimple(conversation.users);

            messages = conversation.message.map((message) => {

                message.user = users.find((user) => {
                    return user.id === message.creatorId;
                });

                return message;
            });

            resolve({
                success: true,
                messages: helper.clearMessage(messages)
            });

        });

    }

    searchUserFoConversation(conversations, userId) {
        return new Promise(async (resolve) => {
            if (typeof conversations.length !== 'undefined') {
                let users = await userApi.getSimple(conversations.map((conversation) => {
                    return +conversation.users.join('').replace(userId, '');
                }));

                conversations = conversations.map((conversation) => {

                    let userInterlocutorId = +conversation.users.join('').replace(userId, '');

                    conversation.user = users.find((user) => {
                        return user.id === userInterlocutorId;
                    });

                    return conversation;
                });

                return resolve(conversations);
            } else {
                conversations.user = await userApi.getSimple(+conversations.users.join('').replace(userId, ''));

                return resolve(conversations);
            }
        });
    }
}

module.exports = new ConversationApi();