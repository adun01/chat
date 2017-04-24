const usersModel = require('../../dbsettings/user/users.model'),
    cryptoApi = require('../../dbsettings/crypto');

module.exports = {
    logIn: function (name) {
        return usersModel.findOne({name: name});
    },
    comparePassword: function (user, pass) {
        return cryptoApi.generatePasswort(pass, user.salt) === user.password;
    }
};