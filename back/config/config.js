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


/*
 async function db(){
    try {
        const db = await mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            port: 3306,
            database: 'appbook'
        });

        console.log('Se ha conectado con éxito a la base de datos');
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        throw error;
    }
 } 
module.exports = db;
*/
