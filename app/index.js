const express = require('express');
const port = 3002;

const app = express();


app.get('/', (req, res)=>{
    res.send({app : "express_js_mysql", version : "1.0.0", message : "hello wordl"})
})

app.listen(port, ()=>{
    console.log(`Running on localhost:${port}`);
})