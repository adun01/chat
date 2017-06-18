const config = require('../config'),
    _ = require('lodash');

class Helper {

    clearUser(obj) {
        if (obj && typeof obj.length !== 'undefined') {
            return obj.map(user => {
                return this.clearUser(user);
            });
        } else {
            return obj ? _.pick(obj, config.user.field) : obj;

        }
    }

    clearMessage(obj) {
        if (obj && typeof obj.length !== 'undefined') {
            return obj.map(user => {
                return this.clearMessage(user);
            });
        } else {
            return obj ? _.pick(obj, config.message.field) : obj;

        }
    }

    clearRoom(obj) {
        if (obj && typeof obj.length !== 'undefined') {
            return obj.map(user => {
                return this.clearRoom(user);
            });
        } else {
            return obj ? _.pick(obj, config.room.field) : obj;

        }
    }
}

module.exports = new Helper();