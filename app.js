// required
const http = require('http')
    , config = require('./config.js')
    , express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , mongoose = require('./db')
    , socketIo = require('socket.io')
    , sharedsession = require("express-socket.io-session")
    , session = require('express-session')
    , MongoStore = require('connect-mongo')(session);

// init
const app = express(),
    server = http.createServer(app),
    io = socketIo(server),
    sessionInstance = session({
        secret: 'geawgagadg',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 6000000
        },
        store: new MongoStore({mongooseConnection: mongoose.connection})
    });

io.use(sharedsession(sessionInstance, {
    autoSave: true
}));

// public directory
app.use(express.static(path.join(__dirname, 'public/')));

// singe route
let route = require('./routes/index');
app.use('/', route);

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

require('./eventsManager')(io);