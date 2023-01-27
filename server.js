import express, { json } from 'express'
import sgMail from '@sendgrid/mail'
import * as dotenv from 'dotenv'

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express()
app.use(json())

import EmailSchema from "./EmailSchema.js";

app.post('/contact-us', async (req, res) => {

    const mailBody = {
        to: process.env.FROM_EMAIL,
        from: req.body.from,
        subject: req.body.subject,
        text: req.body.text,
    };

    EmailSchema
        .isValid(mailBody)
        .then(function (valid) {
            if (!valid) {
                return res.status(400).json('Invalid email content')
            }
        });

    try {
        await sgMail.send(msg);
        res.status(200).json('Mail sent successfully.')
    }
    catch (error) {
        res.status(500).json('Error occured while sending the email, please try again.')
    }
})

app.listen(3000, () => console.log('server started'))
