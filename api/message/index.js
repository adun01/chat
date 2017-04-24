'use strict';
const messagesModel = require('../../dbsettings/message/message.model'),
    messageModel = require('../../dbsettings/message/messages.model'),
    userApi = require('../user/'),
    roomUserAgreed = require('../room/room.userAgreed'),
    response = require('../response')(),
    _ = require('lodash');

function searchAccessRoom(roomId, id) {
    let promise = new Promise(function (resolve) {
        roomUserAgreed.get({id: roomId}).then(function (userAgreed) {
            let access = userAgreed.some(function (user) {
                return user.id === id;
            });
            resolve(access);
        });
    });
    return promise;
}

module.exports = {
    add: function (data, user) {
        return new Promise(function (resolve, reject) {
            searchAccessRoom(data.room.id, user.id).then(function (access) {
                if (access) {
                    new messageModel({
                        message: data.message,
                        user: {
                            id: user.id,
                            name: user.name
                        },
                        roomId: data.room.id
                    }).save(function (err) {
                        resolve();
                    });
                } else {
                    reject('No access to this room');
                }
            });
        });
    },
    get: function (roomId, userId) {
        'use strict';
        return new Promise(function (resolve, reject) {
            searchAccessRoom(roomId, userId).then(function (access) {
                if (access) {
                    messagesModel.find({roomId: roomId}, function (err, messages) {
                        resolve(messages);
                    });
                } else {
                    reject('No access to this room');
                }
            });
        });
    }
};