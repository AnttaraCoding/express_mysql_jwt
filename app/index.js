const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;

const app = express();

const Connection = require('./config/database');
const Users = require('./controlllers/users');
const Auth = require('./middleware/Auth');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.post('/user', Connection, Auth, Users.simpanData)
app.get('/users', Connection, Auth, Users.getAll)
app.get('/user/:username', Connection, Auth, Users.getById)
app.put('/user', Connection, Auth, Users.updateData)
app.delete('/user/:username', Connection, Auth, Users.hapusData)
app.post('/login', Connection, Users.loginUser)

app.get('/', (req, res)=>{
    res.send({app : "express_js_mysql", version : "1.0.0", message : "hello wordl"})
})

app.listen(port, ()=>{
    console.log(`Running on localhost:${port}`);
})