'use strict';
const roomModel = require('../../db/room/room.model'),
    userApi = require('../user/'),
    config = require('../../config'),
    _ = require('lodash');

function searchAccessRoom(room, userId) {
    return room.userAgreed.some(function (id) {
        return id === userId;
    });
}

function clearMesagerData(obj) {
    return _.pick(obj, config.message.field);
}

module.exports = {
    add: function (data) {
        return new Promise(async function (resolve) {

            let room = await roomModel.findOne({id: data.roomId});

            if (!searchAccessRoom(room, data.userId)) {
                return resolve({
                    success: false,
                    message: 'Нет доступа.'
                });
            }

            room.message.push({
                creatorId: data.userId,
                text: data.message
            });

            room.markModified('message');

            let roomChange = await room.save(),
                lastMessage = clearMesagerData(roomChange.message[roomChange.message.length - 1]);

            let searchUsser = await userApi.search({
                id: lastMessage.creatorId
            });

            lastMessage.user = searchUsser.user;

            resolve({
                success: true,
                message: lastMessage
            });

        });
    },
    get: function (data) {
        return new Promise(async function (resolve) {

            let room = await roomModel.findOne({id: data.roomId});

            if (!room) {
                return resolve({
                    success: false,
                    message: 'Комната не найдена.'
                });
            }

            if (!room.public) {
                if (!searchAccessRoom(room, data.userId)) {
                    return resolve({
                        success: false,
                        message: 'Нет доступа.'
                    });
                }
            }
            let userIdList = room.message.map(function (mess) {
                return mess.creatorId;
            });

            let usersList = await userApi.searchCollection(userIdList);

            let messages = room.message.map(function (mess) {

                mess = clearMesagerData(mess);

                mess.user = usersList.users.find(function (user) {
                    return mess.creatorId === user.id;
                });

                return mess;
            });

            resolve({
                success: true,
                messages: messages
            });
        });
    }
};