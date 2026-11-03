import express = require('express');
import entries = require('./entries');
import ensureSchema = require('./schema');


const app = express();
const cors = require('cors');
const port = 8081;

app.get('/health',(req, res) => 
    res.status(200).send('ok'));

app.use(cors())
app.use(express.json());
app.use('/entries', entries);

async function start() {
    try {
        await ensureSchema();
        console.log('Database table entries is ready');
    } catch (err) {
        console.error('Database setup failed', err);
    }

    app.listen(port, () => console.log('Server running on port 8081'));
}

start();
