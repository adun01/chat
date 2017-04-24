const connect = require('../connect'),
    roomSchema = require('./room.schema');

module.exports = connect.model('room', roomSchema);