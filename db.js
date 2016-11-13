var Client = require('mariasql');
var db = new Client({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    db: 'pokemongo'
});

module.exports = db;
