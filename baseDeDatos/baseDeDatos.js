const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tallernodejs'
});

pool.query = util.promisify(pool.query);
module.exports = pool;