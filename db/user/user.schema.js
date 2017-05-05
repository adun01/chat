const Schema = require('mongoose').Schema,
    criptoApi = require('../crypto'),
    autoIncrement = require('mongoose-auto-increment'),
    connect = require('../');

autoIncrement.initialize(connect);

var userSchema = new Schema({
    login: {
        type: String,
        unique: true
    },
    password: String,
    salt: {
        type: String,
        default: Date.now
    },
    email: {
        type: String,
        unique: true
    },
    photo: {
        type: String,
        default: ''
    },
    date: {type: Date, default: Date.now}
});

userSchema.path('password').set(function (pass) {
    return criptoApi.generatePassword(pass, this.salt);
});

userSchema.plugin(autoIncrement.plugin, {model: 'user', field: 'id'});

module.exports = userSchema;