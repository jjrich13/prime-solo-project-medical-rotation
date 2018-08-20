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
/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;