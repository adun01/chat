const mongoose = require('mongoose'),
    roomSchema = require('./room.schema'),
    roomsModel = mongoose.model('rooms', roomSchema);

module.exports = roomsModel;