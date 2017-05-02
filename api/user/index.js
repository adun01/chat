const userModel = require('../../db/user/user.model'),
    sessions = require('../../db/session/sessions.model'),
    _ = require('lodash');


module.exports = {
    create: function (data) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.search(data).then(function (result) {

                if (!result.user) {
                    new userModel({
                        login: data.login,
                        password: data.password,
                        email: data.email
                    }).save(function (err, user) {
                        resolve({
                            success: true,
                            user: user
                        });
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Пользователь с таким именем или email, уже зарегестрирован'
                    });
                }

            }, function (data) {
                reject(data);
            });
        });
    },
    search: function (data) {
        let searchCollection = [],
            resolveKey = ['id', 'login', 'email'];

        return new Promise(function (resolve, reject) {
            resolveKey.forEach(function (val) {
                if (_.has(data, val)) {
                    let currentObjSearch = {};
                    currentObjSearch[val] = data[val];
                    searchCollection.push(currentObjSearch);
                }
            });

            if (!searchCollection.length) {
                reject({
                    success: false,
                    message: 'search only by name, id, email'
                });
            }

            userModel.findOne({$or: searchCollection}, function (err, user) {
                resolve({
                    success: true,
                    user: user
                });
            });
        });
    }
};