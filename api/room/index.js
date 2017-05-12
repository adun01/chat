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

module.exports = {
    add: function (data) {
        'use strict';

        let promise = new Promise(function (resolve) {
            new roomModel({
                id: data.id,
                name: data.name,
                creatorId: data.creatorId
            }).save().then(function (room) {
                resolve(clearRoomField(room));
            });
        });
        return promise;
    },
    get: function (roomId, userId) {

        'use strict';
        let promise = new Promise(function (resolve) {
            if (!roomId) {
                roomModel.findOne({creatorId: 0}).then(function (mainRoom) {
                    roomModel.find({userAgreed: {$elemMatch: {id: userId}}}).then(function (rooms) {
                        rooms.push(mainRoom);
                        resolve(clearRoomField(rooms));
                    });

                });
            } else {
                roomModel.findOne({id: roomId}).then(function (room) {
                    resolve(clearRoomField(room));
                });
            }
        });
        return promise;
    },
    updateRoom: function (data, userId) {

        'use strict';

        let promise = new Promise(function (resolve, reject) {

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

        return promise;
    }
};