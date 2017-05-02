const sessionSchema = require('./session.schema'),
    session = require('mongoose').model('sessions', sessionSchema);

module.exports = session;