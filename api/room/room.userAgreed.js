const roomsModel = require('../../dbsettings/room/room.model'),
    _ = require('lodash');

module.exports = {
    get: function (data) {
        'use strict';
        let promise = new Promise(function (resp, reject) {
            roomsModel.findOne({id: data.id}).then(function (room) {
                if (!room) {
                    reject('There is no such room');
                }
                resp(room.userAgreed);
            });
        });

        return promise;
    },
    add: function (data) {
        'use strict';
        let promise = new Promise(function (resp, reject) {
            roomsModel.findOne({id: data.room.id}).then(function (room) {
                if (room.userInvited.indexOf(data.user.id) === -1) {
                    reject('You were not invited');
                }
                if (!room.userAgreed.indexOf(data.user.id) === -1) {
                    room.userAgreed.push(data.user.id);
                }

                room.markModified('userAgreed');
                room.save().then(function (room) {
                    resp(room);
                });
            });
        });

        return promise;
    },
    remove: function (data) {
        'use strict';
        const roomQuery = JSON.parse(data.room),
            userQuery = JSON.parse(data.user);

        let promise = new Promise(function (resp, reject) {
            roomsModel.findOne({id: roomQuery.id}).then(function (room) {
                if (!room) {
                    reject('There is no room with id ' + roomQuery.id);
                }
                if (room.creatorId === userQuery.id || room.userAgreed.indexOf(userQuery.id) !== -1) {
                    room.userAgreed = _.filter(room.userAgreed, function (userId) {
                        if (userId !== data.room.id) {
                            return userId;
                        }
                    });
                } else {
                    reject('You must be either the creator of the room or its participant');
                }
                room.markModified('userAgreed');
                room.save().then(function (room) {
                    resp(room);
                });
            });
        });

        return promise;
    }
};