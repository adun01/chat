const userApi = require('../user/'),
    roomApi = require('../room/'),
    roomMessage = require('../message/room.message'),
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

function allowRoom(userId, userAgreed) {
    return userAgreed.some(function (id) {
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

            let roomIds = user.rooms.map(function (room) {
                return room.id;
            });

            let roomsLastMessage = await roomMessage.getRoomsLastMessage({roomIds: roomIds});


            let notifications = [];

            user.rooms.forEach(function (room) {

                roomsLastMessage.find(function (roomMessageLast) {

                    if (roomMessageLast.id === room.id) {

                        let count = roomMessageLast.lastMessageId - room.messageId;
                        if (count > 0) {
                            notifications.push({
                                roomId: room.id,
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

            let roomSearch = await roomApi.search(data.roomId);

            if (!roomSearch.success) {
                return resolve(roomSearch);
            }

            let room = roomSearch.room;

            if (!allowRoom(data.userId, room.userAgreed)) {

                return resolve({
                    success: false,
                    message: 'Нет доступа'
                });
            }

            user.rooms.forEach(function (room) {
                if (room.id === data.roomId) {
                    if (room.messageId < data.messageId) {
                        room.messageId = data.messageId;
                    }
                }
            });

            user.markModified('rooms');

            await user.save();

            resolve({
                success: true
            });

        });
    }

};