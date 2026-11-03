import db = require('./db');
import express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const results = await db.query('SELECT * FROM entries');
        res.json(results.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: 'Could not retrieve entries',
            detail: err instanceof Error ? err.message : String(err)
        });
    }
})

router.post('/', async (req, res) => {
    try {
      const result =  await db.query('INSERT INTO entries (date, total, emergency, loan, student_loan, travel, invest, left_over) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', 
            [req.body.date, req.body.total, req.body.emergency, req.body.loan, req.body.student_loan, req.body.travel, req.body.invest, req.body.left_over]);
            res.status(201).json(result.rows[0]);
            
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: 'Could not create entry',
            detail: err instanceof Error ? err.message : String(err)
        });
}
})





export = router;