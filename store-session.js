const session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require('./db');


module.exports = new MongoStore({mongooseConnection: mongoose.connection});