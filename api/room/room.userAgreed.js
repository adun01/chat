const roomsModel = require('../../db/room/room.model'),
    userApi = require('../user/'),
    config = require('../../config'),
    _ = require('lodash');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

module.exports = {
    get: function (data) {
        return new Promise(function (resp, reject) {
            roomsModel.findOne({id: data.id}).then(function (room) {
                if (!room) {
                    resp({
                        success: false,
                        message: 'Комната не найдена'
                    });
                } else {

                    let promiseAll = [], users = [];

                    room.userAgreed.forEach(function (id) {
                        let defer = userApi.search({id: id});
                        promiseAll.push(defer);
                        defer.then(function (result) {
                            users.push(clearUserData(result.user));
                        });
                    });

                    Promise.all(promiseAll).then(function () {
                        resp({
                            success: true,
                            userAgreed: users
                        });
                    });

                }
            });
        });
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