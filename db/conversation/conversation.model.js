const connect = require('../'),
    conversationSchema = require('./conversation.schema');

module.exports = connect.model('conversation', conversationSchema);