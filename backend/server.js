const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();  // Load environment variables from .env

const app = express();
const upload = multer();

app.use(cors()); // Enable CORS for all routes



app.post('/send-email', upload.fields([{ name: 'images', maxCount: 5 }]), async (req, res) => {
    const { name, email, message, phone } = req.body;
    const file = req.files && req.files.images && req.files.images[0];

    const transporter = nodemailer.createTransport({
        service: 'gmail',  // You can change this to another service if needed
        auth: {
            user: process.env.EMAIL_USER,  // Get the email from the .env file
            pass: process.env.EMAIL_PASS   // Get the app password from the .env file
        }
    });
    const mailOptions = {
        from: email,
        to: 'Tarikboumehdi91@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `message:${message}\n\nFrom: ${email}`,
        attachments: file ? [{
            filename: file.originalname,
            content: file.buffer
        }] : []
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));