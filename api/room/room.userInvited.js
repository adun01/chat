const roomModel = require('../../db/room/room.model');

module.exports = {
    add: function (data) {
        return new Promise(async function (resolve) {
            let room = await roomModel.findOne({id: data.roomId});

            if (!room) {
                return resolve({
                    success: false,
                    message: 'Комната не найдена'
                });
            }

            let access = room.userAgreed.some(function (id) {
                return id === data.userId;
            });

            if (!access) {
                return resolve({
                    success: false,
                    message: 'Только пользователи комнаты могут пригласить нового члена.'
                });
            }

            if (room.userInvited.indexOf(data.addedUserId) !== -1) {
                return resolve({
                    success: true
                });
            }

            room.userInvited.push(data.addedUserId);

            room.markModified('userInvited');

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

            room.userInvited = room.userInvited.filter(function (id) {
                return data.userId !== id;
            });

            room.markModified('userInvited');

            await room.save();

            resolve({
                success: true
            });

        });
    }
};