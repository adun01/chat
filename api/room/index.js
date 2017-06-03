const roomModel = require('../../db/room/room.model'),
    _ = require('lodash'),
    fieldAllow = ['name', 'id', 'modify', 'photo', 'creatorId', 'userAgreed', 'public'];

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
                userAgreed: userAgreed,
                public: data.public ? data.public : true
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
    searchQuery: function (data) {
        return new Promise(function (resolve) {
            let reg = new RegExp(data.query, 'img');

            roomModel.find({name: {$regex: reg, $options: "sig"}}).then(function (rooms) {

                resolve({
                    rooms: rooms,
                    success: true
                });
            });
        });
    },
    get: function (data) {
        let self = this;
        return new Promise(async function (resolve) {

            if (data.search) {

                let searchRooms = await self.searchQuery({
                    query: data.query
                });

                return resolve({
                    success: true,
                    rooms: clearRoomField(searchRooms.rooms)
                });
            }

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

                if (!room.public) {
                    if (!allowRoom(data.userId, room.userAgreed)) {
                        return resolve({
                            success: false,
                            message: 'Нет доступа'
                        });
                    }
                }

                resolve({
                    success: true,
                    room: clearRoomField(room)
                })
            }
        });
    }
};