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
  pool.query(`SELECT * FROM users WHERE resident = true AND active = true;`).then( response => {
    res.send(response.rows)
  }).catch( err => {
    console.log(err);
    res.sendStatus(500);
  })
});

router.get('/history', rejectUnauthenticated, (req, res) => {
  
  pool.query(`SELECT array_agg(
        json_build_object(
          'topic_id', discussion_topics.id, 'topic_name', discussion_topics.topic, 'podcast', discussion_topics.podcast, 'podcast_link', discussion_topics.podcast_link
        )
      ) AS discussion_topics_list,
      feedback.*
    FROM feedback
    LEFT OUTER JOIN feedback_discussion_topics ON feedback.id = feedback_discussion_topics.feedback_id
    LEFT OUTER JOIN discussion_topics ON discussion_topics.id = feedback_discussion_topics.discussion_topic_id
    WHERE user_id = $1
    GROUP BY feedback.id
    ORDER BY feedback.id;`,[req.user.id]).then( response => {
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
    read_listened, 
    signed_by_resident
  ) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
  $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
  RETURNING feedback.id;`
//Checking if the resident signature matches 
  pool.query('SELECT * FROM resident_code').then(response => {
    resident_code = response.rows[0].resident_code;
    
    if(req.body.residentSignature == resident_code){
      signed = true;
    } else {
      signed = false;
    }
    pool.query(query, [...valuesArray, signed]).then(response => {
      console.log('RESPONSE ID:', response.rows[0].id);
      const feedbackID = response.rows[0].id
      
      let junctionQuery = 'INSERT INTO feedback_discussion_topics (discussion_topic_id, feedback_id) VALUES';

      //making the QUERY but make sure there is no comma on the end
      if(discussionTopics.length > 0){
        for (let i = 0; i < discussionTopics.length; i++) {
        //check for the last thing in the array, don't put a comma
        if(i == (discussionTopics.length - 1)){
          junctionQuery = junctionQuery + `(${discussionTopics[i]}, ${feedbackID})`
        } else {
          junctionQuery = junctionQuery + `(${discussionTopics[i]}, ${feedbackID}),`
        }
        
        }
        console.log('JCT QUERY JCT QUERY', junctionQuery);
        pool.query(junctionQuery).then(response => {
          res.sendStatus(201);

        }).catch(err => {
          res.sendStatus(500);
          console.log(err);
          
        })
      } else{
        res.sendStatus(201);
      }
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
    // console.log(response.rows[0]);
    
    res.send(response.rows[0])
  }).catch( err => {
    console.log(err);
    res.sendStatus(500);
  })
  
})

module.exports = router;
