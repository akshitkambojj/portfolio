require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/services', require('./routes/services'));
app.use('/api/contact', require('./routes/contact'));

// CV Download route
const path = require('path');
app.get('/api/download-cv', (req, res) => {
  const filePath = path.resolve(__dirname, '..', 'client', 'public', 'ak new cv 26.pdf');
  res.download(filePath, 'Akshit_Kamboj_CV.pdf', (err) => {
    if (err) {
      console.error('CV download error:', err);
      if (!res.headersSent) res.status(500).send('Could not download the file.');
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
