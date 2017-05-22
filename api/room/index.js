const roomModel = require('../../db/room/room.model'),
    _ = require('lodash'),
    fieldAllow = ['name', 'id', 'modify', 'photo'];

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
    create: function (data, creatorId) {
        let userInvited = data.userInvited ? data.userInvited.split(',') : [];

        userInvited = userInvited.map(function (id) {
            return +id;
        });

        return new Promise(function (resolve) {

            new roomModel({
                name: data.name,
                creatorId: creatorId,
                userInvited: userInvited
            }).save().then(function (room) {
                resolve(clearRoomField(room));
            });
        });
    },
    get: function (roomId, userId) {
        return new Promise(function (resolve) {

            if (!roomId) {
                roomModel.find({$or: [{userAgreed: userId}, {creatorId: userId}]}).then(function (rooms) {
                    if (!rooms.length) {
                        resolve({
                            success: false,
                            message: 'Не создано ни одной комнаты'
                        });
                    }
                    resolve({success: true, list: clearRoomField(rooms)});
                });
            } else {
                roomModel.findOne({id: +roomId}, function (err, room) {
                    if (err) {
                        resolve({
                            success: false,
                            message: 'Нет такой комнаты'
                        });
                    } else {
                        if (room) {
                            if (allowRoom(userId, room.userAgreed)) {
                                resolve({
                                    success: true,
                                    room: clearRoomField(room)
                                })
                            } else {
                                resolve({
                                    success: false,
                                    message: 'Нет доступа'
                                });
                            }
                        } else {
                            resolve({
                                success: false,
                                message: 'Нет такой комнаты'
                            });
                        }
                    }
                });
            }
        });
    },
    updateRoom: function (data, userId) {

        return new Promise(function (resolve, reject) {

            roomModel.findOne({id: data.id}, function (err, room) {

                if (room.creatorId !== userId) {
                    reject(new Error('not quite right!'));
                }

                if (!room) {
                    reject(new Error('not isset room ' + data.id));
                }

                if (!data.name) {
                    reject(new Error('a name for the room is not allowed'));
                }

                room.name = data.name;
                room.modify = Date.now();

                room.markModified('name');
                room.markModified('modify');

                room.save(function (err, room) {
                    if (err) {
                        reject(err);
                    }

                    resolve(clearRoomField(room));
                });
            });
        });
    },

    addMessage: function (data) {
        return new Promise(function (resolve) {
            roomModel.findOne({id: data.room.id}).then(function (room) {

                room.message.push({
                    creatorId: data.creatorId,
                    text: data.text
                });

                room.markModified('message');

                room.save(function (err, room) {
                    resolve({
                        success: true
                    });
                });

            })
        });
    },
    getMessage: function (data) {
        return new Promise(function (resolve) {
            roomModel.findOne({id: +data.id}).then(function (room) {
                resolve({
                    success: true,
                    message: room.message
                });
            })

        });
    }
};