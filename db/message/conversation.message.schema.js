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
        },
        conversationId: Number,
        id: Number
    });

const AutoIncrement = require('mongoose-sequence');

messageSchema.plugin(AutoIncrement, {id: 'conversationId', inc_field: 'id', reference_fields: ['conversationId']});

module.exports = messageSchema;