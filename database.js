"use strict";

const source = './database.db';

const sqlite = require('sqlite3');

const db = new sqlite.Database(source, 
(err) => { 
    if (err){
        // Non si riesce ad aprire il db
        console.err(err.message);
        throw err;
    }
    else{
        console.log('Il Database RoadToSushi è stato aperto con successo'); 
    }
});

module.exports = db;