const mysql = require ("mysql2");

require("dotenv").config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'work_db',
    port: 3001
});

module.export = connection;