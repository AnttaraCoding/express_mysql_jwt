
const connection = require('../config/database');

class Users {
    static async simpanData(req, res){
        const con = await connection;
        const { username, nama, password, level } = req.body
        try{
            await con.execute(`INSERT INTO tbl_users (username, nama, password, level) VALUES('${username}', '${nama}', '${password}', '${level}')`);

            res.status(200).send({
                err : false,
                msg : "data berhasil di tambahkan",
                data: req.body
            })
        }catch(err){
            res.status(401).send({
                err : true,
                msg : err
            })
        }
    }

    static async getAll(req, res){
        const con = await connection;
        try{
            const [result, fields] = await con.execute(`SELECT * FROM tbl_users`);

            res.status(200).send({
                err : false,
                msg : "data berhasil di dipanggil",
                data: result
            })
        }catch(err){
            res.status(401).send({
                err : true,
                msg : err
            })
        }
    }

    static async getById(req, res){
        const con = await connection;
        const { username } = req.params;
        try{
            const [result, fields] = await con.execute(`SELECT * FROM tbl_users WHERE username='${username}'`);

            res.status(200).send({
                err : false,
                msg : "data berhasil di dipanggil",
                data: result
            })
        }catch(err){
            res.status(401).send({
                err : true,
                msg : err
            })
        }
    }

    static async updateData(req, res){
        const con = await connection;
        const { username, nama, password, level } = req.body
        try{
            await con.execute(`UPDATE tbl_users SET nama= '${nama}', password = '${password}', level = '${level}' WHERE username = '${username}'`);

            res.status(200).send({
                err : false,
                msg : "data berhasil di update",
                data: req.body
            })
        }catch(err){
            res.status(401).send({
                err : true,
                msg : err
            })
        }
    }

    static async hapusData(req, res){
        const con = await connection;
        const { username } = req.params;
        try{
            await con.execute(`DELETE FROM tbl_users WHERE username='${username}'`);

            res.status(200).send({
                err : false,
                msg : `data username ${username} berhasil di hapus`,
            })
        }catch(err){
            res.status(401).send({
                err : true,
                msg : err
            })
        }
    }
}

module.exports = Users;