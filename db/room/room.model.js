const connect = require('../'),
    roomSchema = require('./room.schema');

module.exports = connect.model('room', roomSchema);