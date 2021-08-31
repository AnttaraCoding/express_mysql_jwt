const jwt = require('jsonwebtoken');

class Users {
    static async simpanData(req, res){
        const con = await req.con;
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
        const con = await req.con;
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
        const con = await req.con;
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
        const con = await req.con;
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
        const con = await req.con;
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

    static async loginUser(req, res){
        const con = await req.con;
        const { username, password } = req.body
        try{
            const [rows, fields] = await con.execute(`SELECT count(*) as numRow FROM tbl_users WHERE username = '${username}' AND password = '${password}' LIMIT 1`);

            if(rows[0].numRow == 0){
                return res.status(401).send({
                    err : true,
                    msg: 'Masuk aplikasi gagal!, periksa kembali username dan password!'
                })
            }

            const token = jwt.sign({username: username}, 'S3cr3tK3y', { expiresIn : '1d' })
            res.status(200).send({
                err : false,
                msg : "Login Berhasil",
                data: {username, token}
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