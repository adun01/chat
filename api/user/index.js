const usersOnline = require('../../listUserOnline'),
    userModel = require('../../db/user/user.model'),
    config = require('../../config'),
    sessionApi = require('../session/'),
    formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    _ = require('lodash');

function clearUserData(obj) {
    return _.pick(obj, config.user.field);
}

module.exports = {
    create: function (data) {

        let self = this;

        return new Promise(async function (resolve) {

            let searchUser = await self.search(data);

            if (!searchUser.success) {
                let newUser = await new userModel({
                    login: data.login,
                    password: data.password,
                    email: data.email
                }).save(), clearUser;

                clearUser = clearUserData(newUser);

                sessionApi.save({
                    session: data.session,
                    extend: {user: clearUser}
                });

                resolve({
                    success: true,
                    user: clearUser
                });
            } else {
                resolve({
                    success: false,
                    message: 'Пользователь с таким логином или email уже зарегестрирован.'
                });
            }
        });
    },
    searchCollection: function (collection) {
        let self = this, users = [], allPromise = [];

        return new Promise(function (resolve) {
            collection.forEach(function (id, i, arr) {
                let Ipromise = self.search({id: id});

                allPromise.push(Ipromise);

                Ipromise.then(function (res) {
                    users.push(clearUserData(res.user));
                });
            });
            Promise.all(allPromise).then(function () {
                resolve({
                    success: true,
                    users: users
                });
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

                if (!user) {
                    return resolve({
                        success: false,
                        message: 'Пользователь не найден'
                    });
                }

                user.online = !!usersOnline.get(user.id);

                return resolve({
                    success: true,
                    user: user
                });
            });
        });
    },
    searchQuery: function (data) {
        return new Promise(function (resolve) {
            let reg = new RegExp(data.query.query, 'img');
            userModel.find({login: {$regex: reg, $options: "sig"}}).then(function (result) {
                let users = result.map(function (user) {
                    user.online = !!usersOnline.get(user.id);
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
    _changeLogin: function (data) {
        let search = this.search;

        return new Promise(async function (resolve, reject) {
            let searchResultId = await search({id: data.id});
            let searchResultLogin = await search({login: data.login});

            if (!searchResultId.success) {
                return resolve({
                    success: false,
                    message: 'Пользователь не найден.'
                });
            }

            if (searchResultLogin.success) {
                return resolve({
                    success: false,
                    message: 'Это имя уже занято.'
                });
            }

            searchResultId.user.login = data.login;

            let userChange = await searchResultId.user.save();

            return resolve({
                success: true,
                user: clearUserData(userChange),
                message: 'Данные сохранены.'
            });

        });
    },
    _upload: function (data) {
        let self = this,
            fileName;

        return new Promise(function (resolve) {

            form = new formidable.IncomingForm(),
                imageDirectory = path.resolve('public/images/users/') + '/' + data.user.id + '/';

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
                resolve({
                    success: false,
                    message: err.message
                });
            });

            form.on('error', function (err) {
                resolve({
                    success: false,
                    message: err.message
                });
            });

            form.on('end', async function () {

                let userSearchResult = await self.search({id: data.user.id});

                if (userSearchResult.success) {

                    userSearchResult.user.photo = fileName;

                    let userChange = await userSearchResult.user.save();

                    return resolve({
                        success: true,
                        user: clearUserData(userChange),
                        message: 'Данные сохранены.'
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Пользователь не найден.'
                    });
                }

            });

            form.parse(data.req);
        });
    },
    update: function (data) {
        let self = this;

        return new Promise(async function (resolve) {

            if (data.user.id !== data.id) {
                resolve({
                    success: false,
                    message: 'Нет прав.'
                });
            }

            if (data.login) {

                let changeLoginResult = await self._changeLogin(data);

                if (!changeLoginResult.success) {
                    return resolve(changeLoginResult);
                }
            }

            if (data.headers['content-type'].indexOf('multipart/form-data;') !== -1) {

                let changeImageResult = await self._upload(data);

                if (!changeImageResult.success) {
                    return resolve(changeLoginResult);
                }
            }

            let changeUserSearch = await self.search({id: data.user.id});

            sessionApi.save({
                session: data.session,
                extend: {user: clearUserData(changeUserSearch.user)}
            });

            resolve({
                user: clearUserData(changeUserSearch.user),
                success: true,
                message: 'Данные сохранены.'
            });
        });
    }
};