const userEvents = require('../user/'),
    cryptoApi = require('../../db/crypto');

module.exports = {
    logIn: function (data) {
        return new Promise(function (resolve, reject) {

            userEvents.search(data).then(function (result) {
                if (!result.user) {
                    resolve({
                        success: false,
                        message: 'Пользователя с таким логином не существует'
                    });
                }

                if (cryptoApi.generatePassword(data.password, result.user.salt) === result.user.password) {
                    resolve({
                        success: true,
                        user: result.user
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
    }
};