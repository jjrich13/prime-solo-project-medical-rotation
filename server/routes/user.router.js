const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  console.log(req.user);
  // pool.query(`SELECT * FROM users WHERE id = $1`, [req.user.id]).then(response => {
  //   console.log(response.rows);
    
  //   res.send(response.rows)
  // })
  res.send(req.user)
});

router.get('/intro', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  console.log('checking questionnaire');
  pool.query(`SELECT * FROM initial_survey WHERE user_id = $1`, [req.user.id]).then( response => {
    res.send(response.rows)
  }).catch( err => {
    console.log(err);
    res.sendStatus(500);
  })
});

router.get('/details', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT 
    initial_survey.user_id, 
    initial_survey."year", 
    initial_survey.applying_to, 
    initial_survey.applied_to, 
    initial_survey.matched_in, 
    initial_survey.interested_in, 
    initial_survey.letter_interest, 
    initial_survey.intubations, 
    initial_survey.iv, 
    initial_survey.mask_ventilated, 
    initial_survey.central_line, 
    initial_survey.run_ventilator,
    goals.user_id, 
    goals.iv, 
    goals.a_line, 
    goals.mask_ventilation, 
    goals.insert_lma, 
    goals.intubation, 
    goals.planned_airway_management, 
    goals.airway_assessment, 
    goals.assess_asa_score,
    "users".first_name,
    "users".last_name,
    "users".email,
    "users".resident,
    "users".admin
    FROM "users"
    LEFT OUTER JOIN "goals" on "goals".user_id = "users".id
    LEFT OUTER JOIN "initial_survey" ON "initial_survey".user_id = "users".id
    WHERE users.id = $1;`
  // Send back user object from database
  console.log('getting details');
  pool.query(queryString, [req.user.id]).then( response => {
    console.log(response.rows);
    
    res.send(response.rows[0])
  }).catch( err => {
    console.log(err);
    res.sendStatus(500);
    
  })
});

router.post('/intro/questionnaire', rejectUnauthenticated, (req, res) => {
  console.log('posting questionnaire', req.body);
  const queryString = `INSERT INTO initial_survey (
      user_id, 
      year, 
      applying_to, 
      applied_to, 
      matched_in, 
      interested_in, 
      letter_interest, 
      intubations, 
      iv, 
      mask_ventilated, 
      central_line,
      arterial_line, 
      run_ventilator
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`
  const queryValues = [
    req.user.id, 
    req.body.year, 
    req.body.applyingTo, 
    req.body.appliedTo, 
    req.body.matchedIn,
    req.body.interestedIn, 
    req.body.letter, 
    req.body.experience.intubations, 
    req.body.experience.ivs, 
    req.body.experience.maskVentilations, 
    req.body.experience.centralLines, 
    req.body.experience.arterialLines, 
    req.body.runVentilator
  ]
  pool.query(queryString, queryValues).then(response => {
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
    
  })
})

router.post('/intro/goals', rejectUnauthenticated, (req, res) => {
  console.log('posting goals', req.body);
  const {airwayAssessments,
    arterialLines,
    asaScorings,
    intubations,
    ivs,
    lmaInsertions,
    maskVentilations,
    plannedAirwayMgmt} = req.body.goals

  const queryString = `INSERT INTO goals (
      user_id, 
      iv, 
      a_line, 
      mask_ventilation, 
      insert_lma, 
      intubation, 
      planned_airway_management, 
      airway_assessment, 
      assess_asa_score
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
  const queryValues = [
    req.user.id,
    airwayAssessments,
    arterialLines,
    asaScorings,
    intubations,
    ivs,
    lmaInsertions,
    maskVentilations,
    plannedAirwayMgmt
  ]
  pool.query(queryString, queryValues).then(response => {
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
    
  })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);
  
  const {username, firstName, lastName, email, resident} = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO users (username, password, first_name, last_name, email, resident) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
  pool.query(queryText, [username, password, firstName, lastName, email, resident])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
