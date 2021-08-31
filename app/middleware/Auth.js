const jwt = require('jsonwebtoken');

const Auth = async(req, res, next)=>{
    if(!req.header('Authorization')) return res.status(401).send('Access Denied');
    const token = req.header('Authorization').replace('Bearer ', '');

    try{
        const con = await req.con;
        const data = jwt.verify(token, 'S3cr3tK3y');
        const [rows, fields] = await con.execute(`SELECT * FROM tbl_users WHERE username = '${data.username}'`);
        req.user = rows[0];
        req.token = token;
        next();
    } catch(err){
        res.status(401).send({
            err : true,
            msg : 'Not autorization to access this route'
        })
    }
}

module.exports = Auth;