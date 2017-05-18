'use strict';
const roomModel = require('../../db/room/room.model'),
    roomUserAgreed = require('../room/room.userAgreed'),
    _ = require('lodash');

function searchAccessRoom(roomId, userId) {
    return new Promise(function (resolve) {
        roomUserAgreed.get({id: roomId}).then(function (userAgreed) {
            let access = userAgreed.some(function (iUserId) {
                return iUserId === userId;
            });
            resolve(access);
        });
    });
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
                                message: room.message
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
                        resolve({
                            success: true,
                            message: room.message
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