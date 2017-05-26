const room = require('./room'),
    message = require('./room.message'),
    roomUserAgreed = require('./room.userAgreed'),
    roomUserInvited = require('./room.userInvited'),
    notification = require('./room.notification');

module.exports = function (app) {
    app.use(message);
    app.use(roomUserInvited);
    app.use(roomUserAgreed);
    app.use(notification);
    app.use(room);
};