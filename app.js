// required
const http = require('http')
    , config = require('./config.js')
    , express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , socketIo = require('socket.io')
    , sharedsession = require("express-socket.io-session")
    , session = require('express-session')
    , url = require('url')
    , ioRouter = require('socket.io-events')();


const store = require('./store-session');

// проверка авторизован ли пользователь
ioRouter.on('*', function (socket, args, next) {
    next();
});

// init
const app = express(),
    server = http.createServer(app),
    io = socketIo(server),
    sessionInstance = session({
        secret: 'geawgagadg',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true
        },
        store: store
    });

io.set('authorization', function (handshakeData, callback) {
    //console.log(handshakeData.headers.cookie);
    callback(null, true); // error first, 'authorized' boolean second
});

io.use(ioRouter);

app.use(sessionInstance);

io.use(sharedsession(sessionInstance, {
    autoSave: true
}));

// public directory
app.use(express.static(path.join(__dirname, 'public/')));

app.set('port', config.port);

// view engine setup
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// singe route
let route = require('./routes/index'),
    auth = require('./routes/auth'),
    room = require('./routes/room'),
    user = require('./routes/user');

app.use(function (req, res, next) {
    let originalQueery = url.parse(req.originalUrl),
        pathName = originalQueery.pathname;
    if (!originalQueery.query && pathName[pathName.length - 1] !== '/') {
        res.redirect(307, pathName + '/');
    } else {
        next();
    }
});

app.use(user);
app.use(room);
app.use(auth);
app.use('/', route);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('error');
});

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

require('./eventsMediator')(io);