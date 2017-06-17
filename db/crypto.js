const crypto = require('crypto'), api = {};

api.generatePassword = (pass, salt) => {
    return crypto.createHmac('sha256', pass)
        .update(salt)
        .digest('hex');
};

module.exports = api;