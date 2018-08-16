const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/discussion', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM discussion_topics;`).then( response => {
    res.send(response.rows)
  }).catch( err => {
    console.log(err);
    res.sendStatus(500);
  })
});


module.exports = router;