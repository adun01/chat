// getting-started.js
const mongoose = require('mongoose'),
    db = mongoose.connection;

mongoose.connect('mongodb://localhost/chatexpress');

db.on('error', function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log('mongoose connect!');
});

module.exports = mongoose;