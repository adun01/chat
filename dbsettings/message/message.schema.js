const connect = require('../connect'),
    Schema = connect.Schema,
    autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connect);

messageSchema = new Schema({
    message: String,
    userId: {
        type: Number
    },
    roomId: {
        type: Number,
        default: 0
    },
    create: {
        type: Date,
        default: Date.now()
    },
    modify: {
        type: Date,
        default: Date.now()
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

messageSchema.plugin(autoIncrement.plugin, {model: 'message', field: 'id'});

module.exports = messageSchema;