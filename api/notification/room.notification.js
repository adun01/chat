const roomModel = require('../../db/room/room.model'),
    _ = require('lodash'),
    config = require('../../config');

function clearRoomField(rooms) {

    let fieldAccess = _.remove(_.clone(config.room.field), function (name) {
        return ['message', 'userAgreed', 'userInvited'].indexOf(name) === -1;
    });

    if (_.isArray(rooms)) {
        return rooms.map(function (room) {
            return _.pick(room, fieldAccess);
        });
    } else {

        return _.pick(rooms, fieldAccess);
    }
}

module.exports = {
    get: function (data) {
        return new Promise(async function (resolve) {
            let roomsInvited = await roomModel.find({userInvited: {$in: [data.userId]}});

            let roomsNotification = roomsInvited.filter(function (room) {

                return !room.userAgreed.some(function (id) {
                    return id === data.userId;
                });
            });

            let clearRooms = clearRoomField(roomsNotification);

            resolve({
                success: true,
                rooms: clearRooms
            });

        });
    }

};