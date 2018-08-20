const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/code', (req, res) => {
    console.log('hit resident');
    pool.query(`SELECT * FROM resident_code WHERE id = 1`).then(response => {
        res.send(`${response.rows[0].resident_code}`)
    }).catch(err => {
        console.log(err);
        
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;