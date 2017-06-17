const userApi = require('../user/'),
    helper = require('../helper'),
    sessionApi = require('../session/'),
    cryptoApi = require('../../db/crypto');

class AuthApi {
    logIn(login, password, session) {

        return new Promise(async(resolve) => {

            let searchUser = await userApi.search({
                login: login
            }), user;

            if (!searchUser.users.length) {

                return resolve({
                    success: false,
                    message: 'Пользователя с таким логином не существует'
                });
            }

            user = searchUser.users[0];

            if (cryptoApi.generatePassword(password, user.salt) === user.password) {

                user = helper.clearUser(user);

                await sessionApi.save(
                    session, {
                        user: helper.clearUser(user),
                        auth: true
                    }
                );

                return resolve({
                    success: true,
                    user: helper.clearUser(user)
                });
            }

            return resolve({
                success: false,
                message: 'Не правильный логин или пароль'
            });
        });
    }

    isAuth(sessionID) {

        return new Promise(async(resolve) => {

            let session = await sessionApi.get(sessionID);

            if (!session.auth) {

                return resolve({
                    success: false,
                    message: 'Не авторизован.'
                });

            } else {

                return resolve({
                    success: true,
                    user: session.user
                });
            }
        });
    }

    async logOut(sessionID) {
        return await sessionApi.destroy(sessionID);
    }
}

module.exports = new AuthApi();