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

router.post('/', rejectUnauthenticated, (req, res) => {
  let resident_code;
  let signed;
  const { discussionTopics,
    date,
    resident,
    attendingPhysician,
    ventilatorSettings,
    inductionDrugs,
    inhaledAgents,
    vasopressors,
    monitors,
    airwayManagement,
    iv,
    aLine,
    maskVentilation,
    insertLMA,
    intubation,
    plannedAirwayManagement,
    airwayAssessment,
    assessASAScore,
    appliedMonitors,
    setupRoom,
    plannedInduction,
    preparingMedication,
    readListened } = req.body;

    const valuesArray = [
      req.user.id,
      date,
      resident,
      attendingPhysician,
      ventilatorSettings,
      inductionDrugs,
      inhaledAgents,
      vasopressors,
      monitors,
      airwayManagement,
      iv,
      aLine,
      maskVentilation,
      insertLMA,
      intubation,
      plannedAirwayManagement,
      airwayAssessment,
      assessASAScore,
      appliedMonitors,
      setupRoom,
      plannedInduction,
      preparingMedication,
      discussionTopics,
      readListened
  ];

  const query = `INSERT INTO feedback (
    user_id, 
    date, 
    resident, 
    attending_physician, 
    ventilator_settings, 
    induction_drugs, 
    inhaled_agents, 
    vasopressors, 
    monitors, 
    airway_management, 
    iv,
    a_line, 
    mask_ventilation, 
    insert_lma, 
    intubation, 
    planned_airway_management, 
    airway_assessment, 
    assess_asa_score, 
    applied_monitors,
    setup_room, 
    planned_induction, 
    preparing_medication, 
    discussion_topics, 
    read_listened, 
    signed_by_resident
  ) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
$14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)`
  pool.query('SELECT * FROM resident_code').then(response => {
    resident_code = response.rows[0].resident_code;
    
    if(req.body.residentSignature == resident_code){
      signed = true;
    } else {
      signed = false;
    }
    pool.query(query, [...valuesArray, signed]).then(response => {
      res.sendStatus(201);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
      
    })
    
  }).catch(err => {
    res.sendStatus(500);
    console.log(err);
    
  })
})

router.get('/goals', rejectUnauthenticated, (req,res) => {
  console.log('Hit goals');
  pool.query(`
    SELECT 
    SUM("iv") as iv, 
    SUM("a_line") as a_line, 
    SUM("mask_ventilation") as mask_ventilation, 
    SUM("insert_lma") as insert_lma, 
    SUM("intubation") as intubation, 
    SUM("planned_airway_management") as planned_airway_management, 
    SUM("airway_assessment") as airway_assessment, 
    SUM("assess_asa_score") as assess_asa_score 
    FROM "feedback" WHERE "user_id" = $1;`,[req.user.id]
  ).then(response => {
    console.log(response.rows[0]);
    
    res.send(response.rows[0])
  })
  
})

module.exports = router;
