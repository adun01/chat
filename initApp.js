'use strict';

const app = require('./app'),
    http = require('http'),
    config = require('./config.js'),
    server = http.createServer(app),
    io = require('socket.io')(server);

app.set('port', config.port);

server.listen(config.port);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    console.log(error);
}

function onListening() {
    console.log('Listening on port ' + server.address().port);
    console.log('http://localhost:' + server.address().port + '/');
}

io.on('connection', function (socket) {
    console.log('a user connected');
});