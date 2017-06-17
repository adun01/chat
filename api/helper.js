const config = require('../config'),
    _ = require('lodash');

class Helper {

    clearUser(obj) {
        if (obj && typeof obj.length !== 'undefined') {
            let clearCollection = obj.map(user => {
                return this.clearUser(user);
            });
            return clearCollection;
        } else {
            return _.pick(obj, config.user.field);

        }
    }

    clearMessage(obj) {
        if (obj && typeof obj.length !== 'undefined') {
            let clearCollection = obj.map(user => {
                return this.clearMessage(user);
            });
            return clearCollection;
        } else {
            return _.pick(obj, config.message.field);

        }
    }

    clearRoom(obj) {
        if (obj && typeof obj.length !== 'undefined') {
            let clearCollection = obj.map(user => {
                return this.clearRoom(user);
            });
            return clearCollection;
        } else {
            return _.pick(obj, config.room.field);

        }
    }
}

module.exports = new Helper();