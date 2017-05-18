const roomApi = require('../room/'),
    roomsModel = require('../../db/room/room.model'),
    roomUserAgreedApi = require('../room/room.userAgreed'),
    roomUserInvitedApi = require('../room/room.userInvited'),
    _ = require('lodash');

module.exports = {
    get: function (data) {
        return new Promise(function (resolve) {

            roomUserInvitedApi.get({id: data.id}).then(function (rooms) {

                let notifyRoom = rooms.filter(function (room) {

                    if (!room.userAgreed.length) {
                        return true;
                    }

                    return !room.userAgreed.some(function (id) {
                        return id === +data.id;
                    });
                });

                let result = notifyRoom.map(function (room) {
                    return {
                        id: room.id,
                        name: room.name,
                        photo: room.photo
                    }
                });

                resolve(result);
            });
        });
    },
    save: function (id, userId) {

        return new Promise(function (resolve) {
            roomsModel.findOne({
                id: +id
            }).then(function (room) {

                if (!room) {
                    resolve({
                        success: false,
                        message: 'Комната не найдена'
                    });
                }

                let allow = room.userInvited.some(function (userInvitedId) {
                    return userInvitedId === userId;
                });

                if (allow) {
                    let issetAgreed = room.userAgreed.some(function (userAgreedId) {
                        return userAgreedId === userId;
                    });

                    if (!issetAgreed) {
                        roomUserAgreedApi.add(room, userId).then(function (result) {
                            resolve({
                                success: true
                            });
                        });
                    } else {
                        resolve({
                            success: true
                        });
                    }
                } else {
                    resolve({
                        success: false,
                        message: 'Вас не пригласили в комнату'
                    });
                }

            });
        });
    },
    remove: function (id, userId) {

        return new Promise(function (resolve) {
            roomsModel.findOne({
                id: +id
            }).then(function (room) {

                roomUserAgreedApi.remove(room, userId).then(function () {
                    roomUserInvitedApi.remove(room, userId).then(function () {
                        resolve({
                            success: true
                        });
                    });
                });
            });

        });
    }
};