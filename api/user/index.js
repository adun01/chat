const userModel = require('../../dbsettings/user/user.model'),
    usersModel = require('../../dbsettings/user/users.model'),
    sessions = require('../../dbsettings/session/sessions.model');

module.exports = {
    create: function (data) {
        return new userModel({
            name: data.data.login,
            id: data.id,
            password: data.data.password,
            email: data.data.email,
            salt: Date.now() + ''
        }).save();
    },
    allCollection: function () {
        return usersModel.find({});
    },
    search: {
        online: function () {
            return sessions.find({});
        },
        byName: function (name) {
            return usersModel.find({name: name});
        },
        byEmail: function (email) {
            return usersModel.find({email: email});
        },
        byId: function (id) {
            return usersModel.findOne({id: id});
        }
    }
};