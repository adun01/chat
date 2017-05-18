const roomsModel = require('../../db/room/room.model'),
    userApi = require('../user/'),
    config = require('../../config'),
    _ = require('lodash');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

module.exports = {
    get: function (data) {
        return new Promise(function (resolve) {
            roomsModel.findOne({id: data.id}, function (err, room) {
                resolve(room.userAgreed);
            });
        });
    },
    add: function (room, userId) {
        room.userAgreed.push(userId);
        room.markModified('userAgreed');
        return room.save();
    },
    remove: function (room, userId) {
        room.userAgreed = room.userAgreed.filter(function (id) {
            return id !== userId;
        });
        room.markModified('userAgreed');
        return room.save();
    }
};