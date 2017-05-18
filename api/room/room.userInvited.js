const roomsModel = require('../../db/room/room.model'),
    _ = require('lodash');

module.exports = {

    get: function (data) {
        return new Promise(function (resolve) {
            roomsModel.find({userInvited: {$in: [+data.id]}}, function (err, rooms) {
                resolve(rooms);
            });
        });
    },

    add: function (room, userId) {
        room.userAgreed.push(userId);
        room.markModified('userInvited');
        return room.save();
    },

    remove: function (room, userId) {
        room.userInvited = room.userInvited.filter(function (id) {
            return id !== userId;
        });
        room.markModified('userInvited');
        return room.save();
    }
};