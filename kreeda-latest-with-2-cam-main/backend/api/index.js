// require('dotenv').config(); 
// // In api/server.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const contactFormRouter = require('./contactForm');
// const connectToDatabase = require('./db');

// const app = express();
// const PORT = process.env.PORT || 5000; // Use PORT environment variable or default to 5000

// app.use(cors({
//     origin: '*', // Allows any origin (for local development). Adjust as needed for production.
// }));
// app.use(bodyParser.json());

// connectToDatabase();

// app.use('/api/contact', contactFormRouter);


// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// require('dotenv').config(); 
// // In api/server.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const contactFormRouter = require('./contactForm');
// const connectToDatabase = require('./db');

// const app = express();
// const PORT = process.env.PORT || 5000; // Use PORT environment variable or default to 5000

// const yogaRouter = require('./yoga');

// app.use(cors({
//     origin: '*', // Allows any origin (for local development). Adjust as needed for production.
// }));
// app.use(bodyParser.json());

// connectToDatabase();

// app.use('/api/contact', contactFormRouter);

// app.use('/api/yoga', yogaRouter);

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (for demo)
let yogas = [];

// GET all yogas
app.get('/api/yoga', (req, res) => {
  res.json(yogas);
});

// POST a new yoga asana
app.post('/api/yoga', (req, res) => {
  const { name, videoUrl, audioUrl, description, benefits } = req.body;
  const newAsana = {
    id: yogas.length + 1,
    name,
    videoUrl,
    audioUrl,
    description,
    benefits
  };
  yogas.push(newAsana);
  res.status(201).json({ message: 'Yoga asana added!', asana: newAsana });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
