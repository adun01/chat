const connect = require('../connect'),
    userSchema = require('./user.schema');

module.exports = connect.model('user', userSchema);