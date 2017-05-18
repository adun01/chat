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
            default: Date.now()
        }
    });

autoIncrement = require('mongoose-auto-increment');

messageSchema.plugin(autoIncrement.plugin, {model: 'message', field: 'id'});

module.exports = messageSchema;