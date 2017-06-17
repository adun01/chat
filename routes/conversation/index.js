const room = require('./conversation'),
    messageNotification = require('./conversation.message.notification'),
    message = require('./conversation.message');

module.exports = (app) => {
    app.use(messageNotification);
    app.use(message);
    app.use(room);
};