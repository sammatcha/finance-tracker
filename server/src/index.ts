import express = require('express');
import entries = require('./entries');


const app = express();
const cors = require('cors');
const port = 3001;

app.get('/health',(req, res) => 
    res.status(200).send('ok'));

app.use(cors())
app.use(express.json());
app.use('/entries', entries);

app.listen(port, () => console.log('Server running on port 3001'));