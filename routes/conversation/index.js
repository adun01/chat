const room = require('./conversation'),
    messageNotification = require('./conversation.message.notification'),
    message = require('./conversation.message');

module.exports = function (app) {
    app.use(messageNotification);
    app.use(message);
    app.use(room);
};