const session = require('../session/'),
    userEvents = require('../user/'),
    sessionEvents = require('../session/'),
    config = require('../../config'),
    _ = require('lodash'),
    cryptoApi = require('../../db/crypto');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

module.exports = {
    logIn: function (req) {
        return new Promise(function (resolve, reject) {

            userEvents.search(req.body).then(function (result) {

                if (!result.user) {
                    resolve({
                        success: false,
                        message: 'Пользователя с таким логином не существует'
                    });
                    return;
                }

                if (cryptoApi.generatePassword(req.body.password, result.user.salt) === result.user.password) {
                    sessionEvents.save({
                        session: req.session,
                        extend: {user: result.user}
                    });
                    resolve({
                        success: true,
                        user: clearUserData(result.user)
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Не правильный логин или пароль'
                    });
                }

            }, function (err) {
                reject(err);
            });
        });
    },
    isAuth: function (req) {
        return session.get(req.sessionID);
    }
};