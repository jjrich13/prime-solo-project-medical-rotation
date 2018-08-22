const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.put('/toggleActive/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`UPDATE users SET active = NOT active WHERE id = $1;`, [req.params.id]
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

router.post('/topic', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    
    pool.query(`INSERT INTO discussion_topics 
        ("topic", "podcast", "podcast_link", "additional_material")
        VALUES ($1, $2, $3, $4);`,
        [req.body.topic, req.body.podcast, req.body.podcast_link, req.body.additional_material]
    ).then(response => {
        res.sendStatus(200);
        
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        
    })
})

router.delete('/topic/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    
    pool.query(`DELETE FROM discussion_topics 
        WHERE id = $1`,
        [req.params.id]
    ).then(response => {
        res.sendStatus(200);
        
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
        
    })
})

router.get('/inactiveResident', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM users WHERE resident = true AND active = false;`).then( response => {
      res.send(response.rows)
    }).catch( err => {
      console.log(err);
      res.sendStatus(500);
    })
});

router.get('/inactiveStudent', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM users WHERE resident = false AND active = false;`).then( response => {
      res.send(response.rows)
    }).catch( err => {
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