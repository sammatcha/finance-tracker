import fs = require('fs');
import path = require('path');
import db = require('./db');

const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

async function ensureSchema() {
    await db.query(sql);
}

export = ensureSchema;
