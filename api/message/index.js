'use strict';
const roomModel = require('../../db/room/room.model'),
    userApi = require('../user/'),
    config = require('../../config'),
    roomUserAgreed = require('../room/room.userAgreed'),
    _ = require('lodash');

function searchAccessRoom(roomId, userId) {
    return new Promise(function (resolve) {
        roomUserAgreed.get({id: roomId}).then(function (userAgreed) {
            let access = userAgreed.list.some(function (user) {
                return user.id === userId;
            });
            resolve(access);
        });
    });
}

function clearMesagerData(obj) {
    return _.pick(obj, config.message.field);
}

module.exports = {
    add: function (data) {
        return new Promise(function (resolve, reject) {
            searchAccessRoom(data.roomId, data.creatorId).then(function (access) {
                if (access) {
                    roomModel.findOne({id: data.roomId}, function (err, room) {
                        room.message.push({
                            creatorId: data.creatorId,
                            text: data.message
                        });

                        room.markModified('message');

                        room.save(function (err, room) {
                            resolve({
                                success: true,
                                message: clearMesagerData(room.message[room.message.length-1])
                            });
                        });
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Нет доступа'
                    });
                }
            });
        });
    },
    get: function (data) {
        return new Promise(function (resolve, reject) {
            searchAccessRoom(data.roomId, data.creatorId).then(function (access) {
                if (access) {
                    roomModel.findOne({id: data.roomId}, function (err, room) {
                        let promiseAll = [];

                        let messages = room.message.map(function (mess) {
                            let currPromise = userApi.search({
                                id: mess.creatorId
                            });
                            mess = clearMesagerData(mess);
                            currPromise.then(function (result) {

                                mess.user = result.user;
                            });

                            promiseAll.push(currPromise);

                            return mess;
                        });
                        Promise.all(promiseAll).then(function () {

                            resolve({
                                success: true,
                                message: messages
                            });
                        });
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Нет доступа'
                    });
                }
            });
        });
    }
};