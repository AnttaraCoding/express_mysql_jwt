const mysql = require('mysql2/promise');

const connection = async(req, res, next) => {
    try{
        const con = mysql.createConnection({
            host: "localhost",
            user: "antarra",
            password: "P@ssw0rd",
            database: "express_db"
        });
        req.con = con;
        next();
    }catch(err){
        res.status(401).send({
            err: true,
            msg: 'Database not Connect'
        })
    }
}
 

module.exports = connection;