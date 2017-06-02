// required
const http = require('http')
    , config = require('./config.js')
    , express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , cookieParser = require('cookie-parser')
    , cookie = require('cookie')
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

// authorization
io.use(async function (socket, next) {
    let handshakeData = socket.request,
        cookieSigned = cookie.parse(handshakeData.headers.cookie),
        cookieId = cookieParser.signedCookies(cookieSigned, 'geawgagadg')['connect.sid'];

    await store.get(cookieId, function (err, session) {
        socket.user = session ? session.user : null;
    });

    if (socket.user) {
        next();
    }
});

// singe route
let index = require('./routes/index'),
    auth = require('./routes/auth'),
    conversation = require('./routes/conversation'),
    user = require('./routes/user');

require('./routes/room/')(app);

app.use(function (req, res, next) {
    let originalQuery = url.parse(req.originalUrl),
        pathName = originalQuery.pathname;

    if (!originalQuery.query && pathName[pathName.length - 1] !== '/') {
        if (req.method === 'POST') {
            res.redirect(307, pathName + '/');
        } else {
            res.redirect(301, pathName + '/');
        }
    } else {
        next();
    }
});

app.use(user);
app.use(auth);
app.use(conversation);
app.use('/', index);

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

require('./socketEvents')(io);