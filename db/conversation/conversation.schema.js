const Schema = require('mongoose').Schema,
    messageSchema = require('../message/conversation.message.schema.js');

const conversationSchema = new Schema({
    id: {
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
    accessUserId: [Number],
    message: [messageSchema]
});

module.exports = conversationSchema;