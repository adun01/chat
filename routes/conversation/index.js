const room = require('./conversation'),
    message = require('./conversation.message');

module.exports = function (app) {
    app.use(message);
    app.use(room);
};