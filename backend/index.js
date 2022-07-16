
const express = require('express');
const ConnectToMongo=require('./db');
ConnectToMongo();
const app = express()
const port = 5000
var cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(require('./auth'))
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})