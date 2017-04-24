const connect = require('../connect'),
    messageSchema = require('./message.schema');

module.exports = connect.model('messages', messageSchema);