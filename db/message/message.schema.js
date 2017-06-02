const Schema = require('mongoose').Schema,
    messageSchema = new Schema({
        text: {
            type: String,
            default: ''
        },
        creatorId: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    });

module.exports = messageSchema;