const Schema = require('mongoose').Schema,
    messageSchema = require('../message/message.schema.js');

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
    userAgreed: [Number],
    userInvited: [Number],
    creatorId: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: ''
    },
    message: [messageSchema],
    public: {
        type: Boolean,
        default: true
    }
});

autoIncrement = require('mongoose-auto-increment');

roomSchema.plugin(autoIncrement.plugin, {model: 'room', field: 'id'});

module.exports = roomSchema;