// getting-started.js
const mongoose = require('mongoose'),
    db = mongoose.connection;

mongoose.connect('mongodb://localhost/chatexpress');

db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    console.log('mongoose connect!');
});

module.exports = mongoose;