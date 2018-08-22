const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.put('/deactivate/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`UPDATE users SET active = false WHERE id = $1;`, [req.params.id]
    ).then(response => {
        res.sendStatus(200);
        
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        
    })
})

router.delete('/deleteAttending/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM attending_physicians WHERE id = $1;`, [req.params.id]
    ).then(response => {
        res.sendStatus(200);
        
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        
    })
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;