import express = require('express');
const app = express();
const port = 3001;

app.get('/health',(req, res) => 
    res.status(200).send('ok'));

app.listen(port, ()=> console.log('Server running on port 3001'));