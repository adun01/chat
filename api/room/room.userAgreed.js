const roomModel = require('../../db/room/room.model'),
    userApi = require('../user/');

module.exports = {
    get: function (data) {
        return new Promise(async function (resolve) {

            let room = await roomModel.findOne({id: data.roomId});

            let access = room.userAgreed.some(function (id) {
                return id === data.userId;
            });

            if (!access) {
                return resolve({
                    success: false,
                    message: 'Нет доступа'
                });
            }

            let userIds = room.userAgreed.map(function (id) {
                return id;
            });

            let usersCollection = await userApi.searchCollection(userIds);

            resolve({
                success: true,
                list: usersCollection.users
            });

        });
    },
    add: function (data) {

        return new Promise(async function (resolve) {
            let room = await roomModel.findOne({id: data.roomId});

            if (!room) {
                return resolve({
                    success: false,
                    message: 'Комната не найдена'
                });
            }

            let access = room.userInvited.some(function (id) {
                return id === data.userId;
            });

            if (!access) {
                return resolve({
                    success: false,
                    message: 'Нет доступа'
                });
            }

            let searchId = room.userAgreed.some(function (id) {
                return id === data.userId;
            });

            if (searchId) {
                return resolve({
                    success: true
                });
            }

            room.userAgreed.push(data.userId);

            room.markModified('userAgreed');

            await room.save();

            resolve({
                success: true,
                alert: true
            });

        });
    },
    remove: function (data) {
        return new Promise(async function (resolve) {
            let room = await roomModel.findOne({id: data.roomId});

            if (!room) {
                return resolve({
                    success: false,
                    message: 'Комната не найдена'
                });
            }

            if (room.creatorId !== data.userId && data.userDeleted !== data.userId) {
                return resolve({
                    success: false,
                    message: 'Удалить из комнаты может только создатель.'
                });
            }

            room.userAgreed = room.userAgreed.filter(function (id) {
                return id !== data.userDeleted;
            });

            room.markModified('userAgreed');

            await room.save();

            resolve({
                success: true
            });

        });
    }
};