const store = require('../../store-session');

class SessioApi {

    get(sessionID) {

        return new Promise(async resolve => {

            let session = await store.get(sessionID);

            resolve({
                success: true,
                session: session,
                user: session ? session.user : null
            });
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