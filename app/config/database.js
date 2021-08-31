const mysql = require('mysql2/promise');

const con = mysql.createConnection({
    host: "localhost",
    user: "antarra",
    password: "P@ssw0rd",
    database: "express_db"
})

module.exports = con;