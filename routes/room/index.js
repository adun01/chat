const room = require('./room'),
    message = require('./room.message'),
    user = require('./room.user'),
    messageNotify = require('./room.message.notification');

module.exports = (app) => {
    app.use(messageNotify);
    app.use(message);
    app.use(user);
    app.use(room);
};