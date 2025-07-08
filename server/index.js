const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');

// Route imports
const stationRoutes = require('./routes/stationRoutes');
const boothRoutes = require('./routes/boothRoutes');
const voterRoutes = require('./routes/voterRoutes');

const app = express();

// ✅ Middleware setup
app.use(cors());

// ✅ Handle form-data body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Optional: serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.use('/api/stations', stationRoutes);
app.use('/api/booths', boothRoutes);
app.use('/api/voters', voterRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
