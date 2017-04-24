const Schema = require('mongoose').Schema,
    criptoApi = require('../crypto');

var userSchema = new Schema({
    name: {
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
    date: {type: Date, default: Date.now}
});

userSchema.path('password').set(function (pass) {
    return criptoApi.generatePasswort(pass, this.salt);
});

userSchema.plugin(autoIncrement.plugin, {model: 'user', field: 'id'});

module.exports = userSchema;