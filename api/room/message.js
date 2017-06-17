const userApi = require('../user/'),
    roomApi = require('../room/'),
    helper = require('../helper');

class roomMessage {

    getLastMessage(roomIds) {

        return new Promise(async resolve => {

            if (typeof roomIds === 'number') {

                let room = await roomApi.getSimple(roomIds),
                    message, user;

                message = room.message[room.message.length - 1];

                user = await userApi.getSimple(message.creatorId);

                message.user = helper.clearUser(user);

                message.roomId = roomIds;

                return resolve(message);
            } else {
                let rooms = await roomApi.getSimple(roomIds),
                    messages, users;

                messages = rooms.map(room => {
                    return room.message[room.message - 1];
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

    add(userId, roomId, message) {
        return new Promise(async resolve => {
            let room = await roomApi.search(roomId),
                user = await userApi.getSimple(userId), lastMessage;

            if (room) {

                return resolve({
                    success: false,
                    message: 'Диалог не найдена.'
                });
            }

            room.message.push({
                creatorId: userId,
                text: message,
                roomId: room.id,
                user: helper.clearUser(user)
            });

            room.markModified('message');

            await room.save();

            lastMessage = await this.getLastMessage(room.id);

            resolve({
                success: true,
                lastMessage: lastMessage,
                room: helper.clearRoom(room)
            });

        });
    }

    get(roomId) {
        return new Promise(async resolve => {
            let room = await roomApi.search(roomId);

            if (room) {

                return resolve({
                    success: false,
                    message: 'Диалог не найдена.'
                });
            }

            resolve({
                success: true,
                message: helper.clearMessage(room.message)
            });

        });

    }
}


module.exports = new roomMessage();