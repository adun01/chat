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

            if (conversation) {
                conversation.conversation = true;

                conversation.usersCollection = await userApi.getSimple([userId, userInterlocutor]);
            }

            return resolve(conversation);
        })
    }

    create(userId = false, userInterlocutorId = false) {
        return new Promise(async resolve => {
            let sId = userId + '' + userInterlocutorId,
                conversation, users = await userApi.getSimple([userInterlocutorId, userId]);

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
            conversation.usersCollection = users;

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

                let conversation = await this.search(userId, userInterlocutorId);

                if (conversation) {

                    conversation = helper.clearRoom(conversation);

                    conversation.lastMessage = await this.getLastMessage(conversation);

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

                    conversation.usersCollection = await userApi.getSimple([userId, userInterlocutorId]);

                    return resolve({
                        success: true,
                        conversation: conversation
                    });
                }
            } else {
                let conversations = await conversationModel.find({users: {$in: [userId]}}),
                    user = await userApi.getSimple(userId),
                    messageList, idUsers, users;

                messageList = await this.getLastMessage(conversations);

                conversations = conversations.filter((conversation) => {
                    return conversation.message.length;
                });

                idUsers = conversations.reduce((prev, currentConversation) => {

                    currentConversation.users.forEach((userId) => {

                        if (prev.indexOf(userId) === -1) {
                            prev.push(userId);
                        }
                    });

                    return prev;
                }, []);

                users = await userApi.getSimple(idUsers);

                conversations = conversations.map(conversation => {

                    conversation = helper.clearRoom(conversation);

                    conversation.conversation = true;

                    conversation.usersCollection = users.filter((user) => {
                        return conversation.users.indexOf(user.id) !== -1;
                    });

                    conversation.lastMessage = messageList.find(message => {
                        return message.conversationId === conversation.id;
                    });

                    conversation.notification = this.notification(user, conversation.lastMessage);

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

        if (!lastMessage) {
            return 0;
        }

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

                messages = conversations.filter((conversation) => {
                    return conversation.message.length;
                }).map(conversation => {
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
                user = await userApi.getSimple(userId);

            if (!conversation) {

                return resolve({
                    success: false,
                    message: 'Диалог не найден.'
                });
            }

            conversation.message.push({
                creatorId: userId,
                text: message,
                conversationId: conversation.id
            });

            conversation.markModified('message');

            await conversation.save();

            conversation.lastMessage = await this.getLastMessage(conversation);

            conversation.notification = this.notification(user, conversation.lastMessage);

            resolve({
                success: true,
                conversation: helper.clearRoom(conversation)
            });

        });
    }

    getMessage(userId, userInterlocutor) {
        return new Promise(async resolve => {

            let conversation = await this.search(userId, userInterlocutor),
                messages, users = await userApi.getSimple([userId, userInterlocutor]);

            if (!conversation) {

                return resolve({
                    success: false,
                    message: 'Диалог не найден.'
                });
            }

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
}

module.exports = new ConversationApi();