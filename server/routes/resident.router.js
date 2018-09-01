const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


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

router.get('/students', (req, res) => {
    console.log('getting students');
    
    pool.query(`SELECT users."id", users."first_name", users."last_name", initial_survey."year", 
        (SUM(feedback."iv") +
        SUM(feedback."a_line") +
        SUM(feedback."mask_ventilation")+
        SUM(feedback."insert_lma") +
        SUM(feedback."intubation")+
        SUM(feedback."planned_airway_management") +
        SUM(feedback."airway_assessment")  +
        SUM(feedback."assess_asa_score")) as progress_sum,
        (goals."iv" + 
        goals."a_line" +
        goals."mask_ventilation" +
        goals."insert_lma" +
        goals."intubation" +
        goals."planned_airway_management" +
        goals."airway_assessment" +
        goals."assess_asa_score") as goal_sum
        FROM users
        LEFT OUTER JOIN initial_survey ON users.id = initial_survey.user_id
        LEFT OUTER JOIN feedback ON users.id = feedback.user_id
        LEFT OUTER JOIN goals ON users.id = goals.user_id
        WHERE users.resident = false and users.active = true
        GROUP BY users.id, initial_survey."year", goal_sum;`
    ).then(response => {
        res.send(response.rows)
    }).catch(err => {
        console.log(err);
        
        res.sendStatus(500);
    })
});

router.get('/progress/:id', rejectUnauthenticated, (req,res) => {
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
      FROM "feedback" WHERE "user_id" = $1;`,[req.params.id]
    ).then(response => {
      // console.log(response.rows[0]);
      
      res.send(response.rows[0])
    }).catch( err => {
      console.log(err);
      res.sendStatus(500);
    })
    
})

router.get('/initialDetails/:id', rejectUnauthenticated, (req,res) => {
    console.log('Hit goals');
    pool.query(`SELECT 
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
    initial_survey.arterial_line,
    initial_survey.run_ventilator,
    goals.user_id, 
    goals.iv AS "goal_iv", 
    goals.a_line AS "goal_a_line", 
    goals.mask_ventilation AS "goal_mask_ventilation", 
    goals.insert_lma AS "goal_insert_lma", 
    goals.intubation AS "goal_intubation", 
    goals.planned_airway_management AS "goal_planned_airway_management", 
    goals.airway_assessment AS "goal_airway_assessment", 
    goals.assess_asa_score AS "goal_assess_asa_score",
    "users".first_name,
    "users".last_name,
    "users".email,
    "users".resident,
    "users".admin
    FROM "users"
    LEFT OUTER JOIN "goals" on "goals".user_id = "users".id
    LEFT OUTER JOIN "initial_survey" ON "initial_survey".user_id = "users".id
    WHERE users.id = $1;`, [req.params.id]
    ).then(response => {
      // console.log(response.rows[0]);
      
      res.send(response.rows[0])
    }).catch( err => {
      console.log(err);
      res.sendStatus(500);
    })
    
})

router.get('/feedback', (req, res) => {
    console.log('hit feedback');
    
    pool.query(`SELECT array_agg(
        json_build_object(
          'topic_id', discussion_topics.id, 'topic_name', discussion_topics.topic, 'podcast', discussion_topics.podcast, 'podcast_link', discussion_topics.podcast_link
        )
      ) AS discussion_topics_list,
      feedback.*,
      users.*
    FROM feedback
    LEFT OUTER JOIN feedback_discussion_topics ON feedback.id = feedback_discussion_topics.feedback_id
    LEFT OUTER JOIN discussion_topics ON discussion_topics.id = feedback_discussion_topics.discussion_topic_id
    LEFT OUTER JOIN users ON users.id = feedback.user_id
    GROUP BY feedback.id, users.id
    ORDER BY feedback.date DESC;`
    ).then(response => {
        res.send(response.rows)
        
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