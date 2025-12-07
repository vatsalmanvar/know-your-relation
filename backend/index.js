
const express = require('express');
const ConnectToMongo=require('./db');
const app = express()
const port = 5001
var cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(require('./auth'))

// Connect to MongoDB and then start the server
ConnectToMongo().then(() => {
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`)
    })
}).catch((err) => {
    console.error('Failed to start server:', err);
});


// mongodb connection