const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { dateToString } = require('../modules/dateToString');

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
const feedbackReminderEmailHTML = `<p>This is a reminder to submit your feedback for the day.</p>
    <p>If you are not with your resident feel free to submit without a signature.</p>
    <a href="trackmyrotation.com">Submit Here</a>`;

const output = `<p>This email should arrive at 5pm</p>`;


let mailOptions = {
    from: process.env.EMAIL, // sender address
    to: 'jjrich13@gmail.com', // list of receivers
    subject: 'This is a demo email', // Subject line
    text: `Sup homeboy?`, // plain text body
    html: output // html body
};
// END NODEMAILER STUFF THAT YOU MIGHT WANT TO MOVE

router.post('/sendEmail', (req, res) => {
    console.log('hit sendEmail');
    console.log('Email:', process.env.EMAIL);
    console.log('Password:', process.env.PASSWORD);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.sendStatus(500);
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('info rawL ', info);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log('email has been sent');
        res.sendStatus(200);
    });
});

//this will run monday-friday at 17:00 or 5pm
//'0 22 * * 1-5', i.e.: the 0th minute of the 22nd hour, everyday of the month, every month, but only monday through friday,
// this results in an email going out at 5pm central time
// cron.schedule('0 22 * * 1-5', () => {
//     pool.query(
//         `SELECT * FROM users LEFT OUTER JOIN feedback on feedback.id = (SELECT id from feedback
//             WHERE feedback.user_id = users.id
//             ORDER BY feedback.date desc
//             LIMIT 1)
//         WHERE users.active = true and users.resident = false;`
//     ).then( response => {
//         const dateLong = new Date()
        
//         let emailArray = []
//         for(response of response.rows){
//             console.log(response.email);
//             if(dateToString(response.date) === dateToString(dateLong)){
//                 emailArray.push(response.email)
//             }
            
//         }

//         for(email of emailArray){
//             let sample = {
//                 from: process.env.EMAIL, // sender address
//                 to: email, // list of receivers
//                 subject: 'Feedback Reminder', // Subject line
//                 text: `Demo`, // plain text body
//                 html: feedbackReminderEmailHTML // html body
//             };

//             transporter.sendMail(sample, (error, info) => {
//                 if (error) {
//                     return console.log(error);
//                 }
//                 console.log('Message sent: %s', info.messageId);
//                 console.log('info rawL ', info);
//                 console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//                 console.log('email has been sent');
//             });

//         }
        
//     }).catch( err => {
//       console.log(err);
//     })
// });

cron.schedule('11 22 * * 1-5', () => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('info rawL ', info);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log('email has been sent');
    });
});

module.exports = router;