const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Save to DB
    const newContact = await Contact.create({ name, email, message });

    // Try sending email (Optional: will just log if not configured properly)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER.includes('@')) {
      try {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Portfolio Message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };
        
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error('Email sending failed:', mailError);
        // Continue response even if email fails
      }
    }
    
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: newContact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
