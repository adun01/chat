const roomModel = require('../../db/room/room.model'),
    roomMessage = require('./message'),
    userApi = require('../user/'),
    helper = require('../helper');

class RoomApi {
    create(name, userId, userInvited = '') {
        return new Promise(async resolve => {
            let users = userInvited.split(','),
                inviteSelf, repeatRoom, room;

            users = users.map(iUserId => {
                return +iUserId;
            });

            inviteSelf = users.some(iUserId => {
                return userId === iUserId;
            });

            if (!inviteSelf) {
                users.push(userId);
            }

            repeatRoom = await roomModel.findOne({name: name});

            if (repeatRoom) {

                return resolve({
                    success: false,
                    message: 'Комната с таким именем уже существует.'
                });
            }

            room = await new roomModel({
                name: name,
                creatorId: userId,
                users: users
            }).save();

            return resolve({
                success: true,
                room: helper.clearRoom(room)
            });
        });
    }

    query(query) {

        return new Promise(async resolve => {
            let reg = new RegExp(query, 'img'), rooms;

            rooms = await roomModel.find({name: {$regex: reg, $options: "sig"}});

            resolve({
                rooms: helper.clearRoom(rooms),
                success: true
            });

        });
    }

    getSimple(ids) {
        return new Promise(async resolve => {
            if (typeof ids === 'number') {
                resolve(await roomModel.findOne(ids));
            } else {
                resolve(await roomModel.find({id: {$in: ids}}));
            }
        });
    }

    get(ids, userId) {
        return new Promise(async resolve => {
            let user = await userApi.getSimple(userId);
            if (typeof ids === 'number') {
                let room = await this.getSimple(ids),
                    banned;

                if (!room) {

                    return resolve({
                        success: false,
                        message: 'Нет такой комнаты'
                    });
                }

                banned = room.bans.some(iBanned => {
                    return iBanned === userId;
                });

                room.banned = banned;

                room.lastMessage = await roomMessage.getLastMessage(room.id);

                room.notification = this.notification(user, room.lastMessage);

                return resolve({
                    success: true,
                    room: helper.clearRoom(room)
                });
            } else {
                let rooms = await this.getSimple(ids),
                    messageList;

                messageList = await roomMessage.getLastMessage(rooms.map(room => {
                    return room.id;
                }));

                rooms = rooms.map(room => {
                    room.lastMessage = messageList.find(message => {
                        return message.roomId = room.id;
                    });
                    room.room = true;
                    room.notification = this.notification(user, room.lastMessage);

                });

                return resolve({
                    success: true,
                    rooms: rooms
                });

            }
        });
    }

    notification(user, lastMessage) {
        let userRead = user.rooms.find(room => {
            return room.id === lastMessage.roomId;
        });

        if (!userRead) {
            return 0;
        }

        return lastMessage.id - userRead.messageId;
    }

    getUser(id) {
        return new Promise(async resolve => {
            let room = await roomModel.getSimple(id), users;

            if (!room) {
                resolve({
                    success: false,
                    message: 'Такой комнаты нет.'
                });
            }

            users = await userApi.getSimple(room.users);

            return resolve({
                success: true,
                users: helper.clearUser(users)
            });
        });
    }

    addUser(id, userId) {
        return new Promise(async resolve => {
            let room = await this.getSimple(id),
                userInside, newRoom;

            if (!room) {

                return resolve({
                    success: false,
                    message: 'Такой комнаты нет.'
                });
            }

            userInside = room.users.some(iId => {
                return userId === iId;
            });

            if (userInside) {

                return resolve({
                    success: true,
                    room: helper.clearRoom(room)
                });
            }

            room.users.push(userId);

            room.markModified('users');

            newRoom = await room.save();

            return resolve({
                success: true,
                room: helper.clearRoom(newRoom)
            });
        });
    }

    removeUser(id, userId) {
        return new Promise(async resolve => {

            let room = await roomModel.findOne({id: id}),
                userInside, newRoom;

            if (!room) {

                resolve({
                    success: false,
                    message: 'Такой комнаты нет.'
                });
            }

            userInside = room.users.some(iId => {
                return userId === iId;
            });

            if (!userInside) {

                return resolve({
                    success: true,
                    room: history.clearRoom(room)
                });
            }

            room.users = room.users.filter(iuserId => {
                return userId !== iuserId;
            });

            room.markModified('users');

            newRoom = room.save();

            return resolve({
                success: true,
                room: history.clearRoom(newRoom)
            });

        });
    }

    bannedUser(id, userId, bannedId) {

        return new Promise(async resolve => {
            let room = await roomModel.getSimple(id), bannedInside,
                helper;

            if (!room) {

                return resolve({
                    success: false,
                    message: 'Такой комнаты нет.'
                });
            }

            if (room.creatorId !== userId) {

                return resolve({
                    success: false,
                    message: 'Только создатель комнаты, может банить.'
                });
            }

            bannedInside = room.bans.some(iId => {
                return bannedId === iId;
            });

            if (bannedInside) {

                return resolve({
                    success: true,
                    room: helper.clearRoomField(room)
                });
            }

            room.bans.push(bannedId);

            room.markModified('users');

            newRoom = await room.save();

            return resolve({
                success: true,
                room: helper.clearRoom(newRoom)
            });

        });

    }
}

module.exports = new RoomApi();