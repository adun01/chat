const session = require('../session/'),
    userApi = require('../user/'),
    sessionApi = require('../session/'),
    config = require('../../config'),
    _ = require('lodash'),
    cryptoApi = require('../../db/crypto');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

module.exports = {
    logIn: async function (data) {

        return new Promise(async function (resolve) {

            let searchUser = await userApi.search(data), user;

            if (!searchUser.user) {
                return resolve({
                    success: false,
                    message: 'Пользователя с таким логином не существует'
                });
            }

            if (cryptoApi.generatePassword(data.password, searchUser.user.salt) === searchUser.user.password) {

                user = clearUserData(searchUser.user);

                sessionApi.save({
                    session: data.session,
                    extend: {user: user}
                });

                return resolve({
                    success: true,
                    user: user
                });
            }

            return resolve({
                success: false,
                message: 'Не правильный логин или пароль'
            });
        });
    },
    isAuth: function (data) {
        return new Promise(async function (resolve) {

            let session = await sessionApi.get(data.sessionID);

            if (!session.user || !session.user.id) {
                resolve({
                    success: false,
                    message: 'Не авторизован.'
                });
            } else {
                resolve({
                    success: true,
                    user: session.user
                });
            }
        });
    },
    logOut: function (data) {
        return session.destroy(data.sessionID);
    }
};