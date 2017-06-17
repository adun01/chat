const store = require('../../store-session');

class SessioApi {

    get(sessionID) {

        return new Promise(async resolve => {
            resolve(await store.get(sessionID));
        });
    }

    save(session, extend) {

        if (extend) {
            session = Object.assign(session, extend);
        }

        store.set(session.id, session);
    }

    destroy(sessionId) {
        store.destroy(sessionId);
    }
}


module.exports = new SessioApi();