require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port: 3306,
    database: 'appbook'
});
console.log('Se ha conectado con éxito a la base de datos');


module.exports = pool;

