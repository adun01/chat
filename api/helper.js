const config = require('../config'),
    _ = require('lodash');

class Helper {

    clearUser(obj) {
        if (typeof obj.length !== 'undefined') {
            let clearCollection = obj.map(user => {
                return this.clearUser(user);
            });
            return clearCollection;
        } else {
            return _.pick(obj, config.user.field);

        }
    }

    clearMessage() {
        return _.pick(obj, ['id', 'users', 'create']);
    }

    clearRoom() {
        return _.pick(obj, ['id', 'users', 'create']);
    }
}

module.exports = new Helper();