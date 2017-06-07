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
        roomId: Number,
        id: Number
    });

const AutoIncrement = require('mongoose-sequence');

messageSchema.plugin(AutoIncrement, {id: 'roomId', inc_field: 'id', reference_fields: ['roomId']});

module.exports = messageSchema;