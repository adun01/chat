const crypto = require('crypto'), api = {};

api.generatePasswort = function (pass, salt) {
    return crypto.createHmac('sha256', pass)
        .update(salt)
        .digest('hex');
};

module.exports = api;