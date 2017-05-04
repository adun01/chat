const userModel = require('../../db/user/user.model'),
    config = require('../../config'),
    sessionEvents = require('../session/'),
    _ = require('lodash');

module.exports = {
    create: function (req) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.search(req.body).then(function (result) {

                if (!result.user) {
                    new userModel({
                        login: req.body.login,
                        password: req.body.password,
                        email: req.body.email
                    }).save(function (err, user) {
                        sessionEvents.save({
                            session: req.session,
                            extend: {user: user}
                        });
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