const mongoose = require('mongoose'),
    config = require('../config');

// Connection URL
mongoose.connect(config.db.adres);

module.exports = mongoose;