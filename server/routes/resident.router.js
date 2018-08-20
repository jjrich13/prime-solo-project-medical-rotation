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
        SUM(feedback."iv") as sum_iv, 
        SUM(feedback."a_line") as sum_a_line, 
        SUM(feedback."mask_ventilation") as sum_mask_ventilation, 
        SUM(feedback."insert_lma") as sum_insert_lma, 
        SUM(feedback."intubation") as sum_intubation, 
        SUM(feedback."planned_airway_management") as sum_planned_airway_management, 
        SUM(feedback."airway_assessment") as sum_airway_assessment, 
        SUM(feedback."assess_asa_score") as sum_assess_asa_score
        FROM users
        LEFT OUTER JOIN initial_survey ON users.id = initial_survey.user_id
        LEFT OUTER JOIN feedback ON users.id = feedback.user_id
        WHERE users.resident = false and users.active = true
        GROUP BY users.id, initial_survey."year";`
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