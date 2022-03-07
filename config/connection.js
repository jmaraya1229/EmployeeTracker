const mysql = require ("mysql2");

require("dotenv").config();

const connection = mysql.createConnection({
    host: 'localhost',
    PORT: 3001,
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'work_db'
});

module.export = connection