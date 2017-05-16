const Schema = require('mongoose').Schema,
    roomSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        create: {
            type: Date,
            default: Date.now
        },
        modify: {
            type: Date,
            default: Date.now
        },
        userAgreed: [Number],
        userInvited: [Number],
        creatorId: {
            type: Number,
            default: 0
        },
        photo: {
            type: String,
            default: ''
        }
    });

autoIncrement = require('mongoose-auto-increment');

roomSchema.plugin(autoIncrement.plugin, {model: 'room', field: 'id'});

module.exports = roomSchema;