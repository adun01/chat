const store = require('../../store-session'),
    config = require('../../config'),
    _ = require('lodash');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

module.exports = {
    get: function (sessionID) {
        return new Promise(function (resolve, reject) {
            store.get(sessionID, function (err, session) {
                resolve({
                    success: true,
                    session: session,
                    user: session ? clearUserData(session.user) : null
                });
            });
        });
    },
    save: function (data) {
        let session = data.session;
        if (data.extend) {
            session = _.assign(session, data.extend);
        }

        store.set(session.id, session);
    },
    destroy: function (sessionId) {
        store.destroy(sessionId);
    }
};