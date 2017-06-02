const roomModel = require('../../db/room/room.model'),
    _ = require('lodash'),
    fieldAllow = ['name', 'id', 'modify', 'photo', 'creatorId'];

function clearRoomField(rooms) {
    if (_.isArray(rooms)) {
        return rooms.map(function (room) {
            return _.pick(room, fieldAllow);
        })
    } else {
        return _.pick(rooms, fieldAllow);
    }
}

function allowRoom(userId, userAgreed) {
    return userAgreed.some(function (id) {
        return id === userId;
    })
}

module.exports = {
    create: function (data) {
        let userInvited = data.userInvited ? data.userInvited.split(',') : [],
            userAgreed = [];

        userInvited = userInvited.map(function (id) {
            return +id;
        });

        if (userInvited.indexOf(+data.user.id) === -1) {
            userInvited.push(+data.user.id);
        }

        userAgreed.push(+data.user.id);

        return new Promise(async function (resolve) {

            let newRoom = await new roomModel({
                name: data.name,
                creatorId: +data.user.id,
                userInvited: userInvited,
                userAgreed: userAgreed
            }).save();

            return resolve({
                success: true,
                room: clearRoomField(newRoom)
            });
        });
    },

    search: function (id) {
        return new Promise(function (resolve) {
            roomModel.findOne({id: id}, function (err, room) {
                if (err) {
                    return resolve({
                        success: false,
                        message: err
                    });
                }
                if (!room) {
                    return resolve({
                        success: false,
                        message: 'Комната не найдена'
                    });
                }
                resolve({
                    success: true,
                    room: clearRoomField(room)
                });
            });
        });
    },

    get: function (data) {
        return new Promise(async function (resolve) {

            if (typeof data.roomId === 'undefined') {

                let rooms = await roomModel.find({userAgreed: {$in: [data.userId]}});

                if (!rooms.length) {
                    return resolve({
                        success: false,
                        message: 'Не создано ни одной комнаты'
                    });
                }

                resolve({success: true, rooms: clearRoomField(rooms)});

            } else if (Number.isNaN(+data.roomId)) {
                return resolve({
                    success: false,
                    message: 'Нет такой комнаты'
                });
            } else {
                let room = await roomModel.findOne({id: +data.roomId});

                if (!room) {
                    return resolve({
                        success: false,
                        message: 'Нет такой комнаты'
                    });
                }

                if (!allowRoom(data.userId, room.userAgreed)) {
                    return resolve({
                        success: false,
                        message: 'Нет доступа'
                    });
                }

                resolve({
                    success: true,
                    room: clearRoomField(room)
                })
            }
        });
    }
};