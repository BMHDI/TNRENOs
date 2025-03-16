const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();  // Load environment variables from .env

const app = express();
const upload = multer();

app.use(cors()); // Enable CORS for all routes

const multerErrorHandling = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(413).json({ error: 'Image limit exceeded, please upload no more than 5 images', details: err.message });
    } else {
      next(err);
    }
  };

  app.post('/send-email', upload.fields([{ name: 'images', maxCount: 5 }]), multerErrorHandling, async (req, res) => {
    const { name, email, message, phone } = req.body;
    const file = req.files && req.files.images;
        if (req.files.images && req.files.images.length > 5) {
        res.status(413).json({ error: 'Image limit exceeded. Please upload no more than 5 images.' });
        return;
      }
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
        attachments: file ? file.map((image) => ({
            filename: image.originalname,
            content: image.buffer
          })) : []
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email', details: error.message });
      }
});

app.listen(3000, () => console.log('Server is running on port 3000'));