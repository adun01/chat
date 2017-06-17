const usersOnline = require('../../listUserOnline'),
    userModel = require('../../db/user/user.model'),
    sessionApi = require('../session/'),
    formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    helper = require('../helper');

class userApi {
    create(login, password, email, session) {
        return new Promise(async resolve => {

            let searchUser = await this.search({
                login: login,
                email: email
            });

            if (!searchUser.users.length) {
                let newUser = await new userModel({
                    login: login,
                    password: password,
                    email: email
                }).save(), clearUser;

                clearUser = helper.clearUser(newUser);

                sessionApi.save(
                    session, {
                        user: clearUser
                    }
                );

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
    }

    getSimple(ids) {
        return new Promise(async resolve => {
            if (typeof ids === 'number') {
                let user = await userModel.findOne({id: ids});
                return resolve(helper.clearUser(user));
            } else {
                let user = await userModel.find({id: {$in: ids}});
                return resolve(helper.clearUser(user));
            }
        });
    }

    get(ids) {
        return new Promise(async resolve => {

            if (typeof ids === 'number') {
                let user = await this.getSimple(ids);

                return resolve({
                    success: true,
                    user: helper.clearUser(user)
                });
            } else {

                let users = await this.getSimple(ids);

                return resolve({
                    success: true,
                    users: helper.clearUser(users)
                });
            }
        });
    }

    search(fieldsSearch) {
        return new Promise(async resolve => {
            let resolveKey = ['id', 'login', 'email'],
                query = [], users;

            for (let nameFieldQuery in fieldsSearch) {

                let access = resolveKey.find((nameFieldAccess) => {
                    return nameFieldQuery === nameFieldAccess;
                });

                if (access) {
                    let newSearch = {};
                    newSearch[nameFieldQuery] = fieldsSearch[nameFieldQuery];
                    query.push(newSearch);
                }
            }

            if (!query.length) {

                resolve({
                    success: false,
                    message: 'Поиск осуществляется только по разрешенным полям : имя, идентификатор, емайл'
                });
            }

            users = await userModel.find({$or: query});

            users = users.map(user => {
                user.online = usersOnline.get(user.id);
                return user;
            });

            return resolve({
                success: true,
                users: users
            });
        });
    }

    query(query) {
        return new Promise(async resolve => {
            let reg = new RegExp(query, 'img'), result, users;

            result = await userModel.find({
                $or: [
                    {login: {$regex: reg, $options: "sig"}},
                    {email: {$regex: reg, $options: "sig"}}
                ]
            });

            users = result.map(user => {
                user.online = !!usersOnline.get(user.id);
                return helper.clearUser(user);
            });

            resolve({
                users: users,
                success: true
            });
        });
    }

    update(login = false, id, headers, request, session) {

        return new Promise(async resolve => {

            let user = await this.getSimple(id);

            if (login) {

                let changeLogin = await this._changeLogin(login, id);

                if (!changeLogin.success) {
                    return resolve(changeLogin);
                } else {
                    user = changeLogin.user;

                    sessionApi.save(
                        session, {
                            user: user
                        }
                    );
                }
            }

            if (headers) {
                if (headers['content-type'].indexOf('multipart/form-data;') !== -1) {

                    let changeImage = await this._upload(request, id);

                    if (!changeImage.success) {
                        return resolve(changeImage);
                    } else {
                        user = changeImage.user;
                        sessionApi.save(
                            session, {
                                user: user
                            }
                        );
                        return resolve(changeImage);
                    }
                } else {
                    return resolve({
                        success: true,
                        user: user
                    });
                }
            }
        });
    }

    _changeLogin(login, id) {

        return new Promise(async resolve => {
            let user = await userModel.findOne({id: id}),
                searchUserLogin = await this.search({login: login}),
                userChange;

            if (!user) {
                return resolve({
                    success: false,
                    message: 'Пользователь не найден.'
                });
            }

            if (searchUserLogin.users.length > 1) {
                return resolve({
                    success: false,
                    message: 'Это имя уже занято.'
                });
            }

            if (searchUserLogin.users.length == 1 && searchUserLogin.users[0].id !== user.id) {
                return resolve({
                    success: false,
                    message: 'Это имя уже занято.'
                });
            }

            user.login = login;

            userChange = await user.save();

            return resolve({
                success: true,
                user: helper.clearUser(userChange),
                message: 'Данные сохранены.'
            });

        });
    }

    _upload(request, id) {
        return new Promise(async resolve => {
            let form = new formidable.IncomingForm(),
                fileName,
                imageDirectory = path.resolve('public/images/users/') + '/' + id + '/',
                user = await userModel.findOne({id: id});

            form.uploadDir = imageDirectory;
            form.encoding = 'utf-8';
            form.keepExtensions = true;
            form.maxFields = 1;

            if (!fs.existsSync(form.uploadDir)) {
                fs.mkdirSync(form.uploadDir);
            }


            form.on('fileBegin', (name, file) => {
                fileName = file.name;
                file.path = imageDirectory + fileName;
            });

            form.on('aborted', (err) => {

                resolve({
                    success: false,
                    message: err.message
                });
            });

            form.on('error', (err) => {

                resolve({
                    success: false,
                    message: err.message
                });
            });

            form.on('end', async() => {

                if (user) {

                    user.photo = fileName;

                    let userUpdate = await user.save();

                    return resolve({
                        success: true,
                        user: helper.clearUser(userUpdate),
                        message: 'Данные сохранены.'
                    });
                } else {

                    resolve({
                        success: false,
                        message: 'Пользователь не найден.'
                    });
                }

            });

            form.parse(request);
        });
    }

    setNewReadMessage(id, roomId, messageId, collectionName = 'rooms') {
        return new Promise(async resolve => {
            let user = this.getSimple(id);

            let room = user[collectionName].find(room => {
                return room.id === roomId;
            });

            room.messageId = messageId;

            user.markModified(collectionName);

            await user.save();

            resolve({
                success: true
            });
        });
    }
}

module.exports = new userApi();