const mysql = require ("mysql2");
const path = require("path");

require("dotenv").config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'employees_db',
    connectTimeout: 5000
});

module.exports = connection;