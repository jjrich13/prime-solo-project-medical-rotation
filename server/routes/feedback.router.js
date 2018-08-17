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

router.get('/attending', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM attending_physicians;`).then( response => {
    res.send(response.rows)
  }).catch( err => {
    console.log(err);
    res.sendStatus(500);
  })
});

router.get('/resident', rejectUnauthenticated, (req, res) => {
  pool.query(`SELECT * FROM users WHERE resident = true;`).then( response => {
    res.send(response.rows)
  }).catch( err => {
    console.log(err);
    res.sendStatus(500);
  })
});

module.exports = router;
