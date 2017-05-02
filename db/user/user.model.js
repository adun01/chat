const connect = require('../index'),
    userSchema = require('./user.schema');

module.exports = connect.model('user', userSchema);