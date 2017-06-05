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
    rooms: [
        {
            id: {
                type: Number,
                require: true
            },
            messageId: {
                type: Number,
                require: true
            }
        }
    ],
    conversations: [
        {
            id: {
                type: Number,
                require: true
            },
            messageId: {
                type: Number,
                require: true
            }
        }
    ],
    date: {type: Date, default: Date.now}
});

userSchema.path('password').set(function (pass) {
    return criptoApi.generatePassword(pass, this.salt);
});

userSchema.plugin(autoIncrement.plugin, {model: 'user', field: 'id'});

module.exports = userSchema;