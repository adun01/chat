const Schema = require('mongoose').Schema,
    messageSchema = require('../message/room.message.schema.js');

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    create: {
        type: Date,
        default: Date.now
    },
    modify: {
        type: Date,
        default: Date.now
    },
    users: [Number],
    bans: [Number],
    creatorId: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: ''
    },
    message: [messageSchema]
});

autoIncrement = require('mongoose-auto-increment');

roomSchema.plugin(autoIncrement.plugin, {model: 'room', field: 'id'});

module.exports = roomSchema;