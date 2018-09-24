const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const { dateToString } = require('../modules/dateToString');
const nodemailer = require('nodemailer');

// NODEMAILER STUFF THAT YOU MIGHT WANT TO MOVE
let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    // for handling request from local host 
    tls: {
        rejectUnauthorized: false
    }
}); //creates an email transporter.

const output = `<p>There should be two of these</p>`;


let mailOptions = {
    from: process.env.EMAIL, // sender address
    to: 'jjrich13@gmail.com', // list of receivers
    subject: 'This is a demo email and you should receive it twice', // Subject line
    text: `Demo`, // plain text body
    html: output // html body
};
// END NODEMAILER STUFF THAT YOU MIGHT WANT TO MOVE

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


//this route is for testing
router.get('/test', (req, res) => {
    pool.query(
        `SELECT * FROM users LEFT OUTER JOIN feedback on feedback.id = (SELECT id from feedback
            WHERE feedback.user_id = users.id
            ORDER BY feedback.date desc
            LIMIT 1)
        WHERE users.active = true and users.resident = false;`
    ).then( response => {
        const dateLong = new Date()
        console.log('dateLong:', dateLong);
        
        console.log('response date', response.rows[2].date.toISOString().substring(0,10));
        
        
        let emailArray = []
        for(response of response.rows){
            console.log(response.email);
            if(dateToString(response.date) === dateToString(dateLong)){
                emailArray.push(response.email)
            }
            
        }

        for(email of emailArray){
            let sample = {
                from: process.env.EMAIL, // sender address
                to: email, // list of receivers
                subject: 'This is a demo email and you should receive it twice', // Subject line
                text: `Demo`, // plain text body
                html: output // html body
            };

            transporter.sendMail(sample, (error, info) => {
                if (error) {
                    res.sendStatus(500);
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('info rawL ', info);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                console.log('email has been sent');
            });

        }
        
        res.sendStatus(200)
    }).catch( err => {
      console.log(err);
      res.sendStatus(500);
    })
});
//end test

module.exports = router;