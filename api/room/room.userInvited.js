const roomsModel = require('../../dbsettings/room/room.model'),
    _ = require('lodash');

module.exports = {
    get: function (data) {
        'use strict';
        const roomQuery = JSON.parse(data.room),
            userQuery = JSON.parse(data.user);

        let promise = new Promise(function (resp, reject) {
            roomsModel.findOne({id: roomQuery.id}).then(function (room) {
                if (!room) {
                    reject('There is no such room');
                }
                if (userQuery.id !== room.creatorId) {
                    reject('Information only for the creator of the room');
                }
                resp(room);
            });
        });

        return promise;
    },
    add: function (data) {
        'use strict';
        let promise = new Promise(function (resp, reject) {

            roomsModel.findOne({id: data.room.id}).then(function (room) {
                if (room.creatorId !== data.user.id) {
                    reject('Only the creator can invite');
                }

                data.addUser.forEach(function (id) {
                    if (room.userInvited.indexOf(id) === -1) {
                        room.userInvited.push(id);
                    }
                });

                room.markModified('userInvited');
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
            userQuery = JSON.parse(data.user),
            removeUser = data.removeUser;

        let promise = new Promise(function (resp, reject) {
            roomsModel.findOne({id: roomQuery.id}).then(function (room) {
                if (!room) {
                    reject('There is no room with aidi ' + roomQuery.id);
                }
                if (room.creatorId !== userQuery.id) {
                    reject('Only the creator can delete user');
                }
                room.userInvited = _.filter(room.userInvited, function (userId) {
                    if (removeUser.indexOf('' + userId) === -1) {
                        return userId;
                    }
                });
                room.markModified('userInvited');
                room.save().then(function (room) {
                    resp(room);
                });
            });
        });

        return promise;
    }
};