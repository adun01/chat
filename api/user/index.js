const userModel = require('../../db/user/user.model'),
    config = require('../../config'),
    sessionEvents = require('../session/'),
    formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

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
                    message: 'Поиск осуществляется только по разрешенным полям : имя, идентификатор, емайл'
                });
            }

            userModel.findOne({$or: searchCollection}, function (err, user) {
                resolve({
                    success: true,
                    user: clearUserData(user)
                });
            });
        });
    },
    searchQuery: function (data) {
        return new Promise(function (resolve) {
            let reg = new RegExp(data.query.query, 'img');
            userModel.find({login: {$regex: reg, $options: "sig"}}).then(function (result) {
                let users = result.map(function (user) {
                    return clearUserData(user);
                });
                if (!users.length) {
                    return resolve({
                        users: users,
                        success: false
                    });
                }
                resolve({
                    users: users,
                    success: true
                });
            });
        });
    },
    changeLogin: function (req) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.search({id: req.session.user.id}).then(function (response) {
                if (!response.user) {
                    return reject({
                        success: false,
                        message: 'Пользователь не найден.'
                    });
                }

                if (req.session.user && req.session.user.id === response.user.id) {
                    response.user.login = req.body.login;

                    self.search({login: req.body.login}).then(function (isset) {

                        if (!isset.user) {
                            response.user.save(function (err, user) {
                                if (err) {
                                    return reject({
                                        success: false,
                                        message: err.message
                                    });
                                }
                                return resolve({
                                    success: true,
                                    message: 'Данные сохранены.'
                                });
                            });
                        } else {
                            return reject({
                                success: false,
                                message: 'Пользователь с таким именем уже существует.'
                            });
                        }
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Не достаточно прав.'
                    });
                }
            }, function (err) {
                reject(err);
            });
        });
    },
    upload: function (req) {
        let self = this,
            fileName;
        return new Promise(function (resolve, reject) {

            form = new formidable.IncomingForm(),
                imageDirectory = path.resolve('public/images/users/') + '/' + req.session.user.id + '/';

            form.uploadDir = imageDirectory;
            form.encoding = 'utf-8';
            form.keepExtensions = true;
            form.maxFields = 1;

            if (!fs.existsSync(form.uploadDir)) {
                fs.mkdirSync(form.uploadDir);
            }

            form.on('fileBegin', function (name, file) {
                fileName = file.name;
                file.path = imageDirectory + file.name;
            });
            form.on('aborted', function (err) {
                reject(err);
            });
            form.on('error', function (err) {
                reject(err);
            });

            form.on('end', function () {

                self.search({id: req.session.user.id}).then(function (result) {

                    result.user.photo = fileName;

                    result.user.save().then(function () {
                        return resolve({
                            success: true,
                            message: 'Данные сохранены.'
                        });
                    });
                });
            });
            form.parse(req, function (err, fields, files) {
            });
        });
    },
    update: function (req) {
        let promiseLogin,
            promiseUpload,
            promiseList = [],
            self = this;

        return new Promise(function (resolve) {
            if (req.body.login) {
                promiseLogin = self.changeLogin(req);
                promiseList.push(promiseLogin);
            }

            if (req.headers['content-type'].indexOf('multipart/form-data;') !== -1) {
                promiseUpload = self.upload(req);
                promiseList.push(promiseUpload);
            }
            Promise.all(promiseList).then(function (response) {
                self.search({id: req.session.user.id}).then(function (result) {

                    sessionEvents.save({
                        session: req.session,
                        extend: {user: result.user}
                    });

                    resolve({
                        user: clearUserData(result.user),
                        success: true,
                        message: 'Данные сохранены.'
                    });
                });
            }, function (err) {
                resolve({
                    success: false,
                    message: err.message
                });
            });
        });
    }
};