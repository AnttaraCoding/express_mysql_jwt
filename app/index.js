const express = require('express');
const bodyParser = require('body-parser');
const port = 3002;

const app = express();

const Users = require('./controlllers/users');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.post('/user', Users.simpanData)
app.get('/users', Users.getAll)
app.get('/user/:username', Users.getById)
app.put('/user', Users.updateData)
app.delete('/user/:username', Users.hapusData)

app.get('/', (req, res)=>{
    res.send({app : "express_js_mysql", version : "1.0.0", message : "hello wordl"})
})

app.listen(port, ()=>{
    console.log(`Running on localhost:${port}`);
})