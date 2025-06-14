const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const contentRoutes = require('./routes/contentRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/content', contentRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.error('MongoDB connection error ❌:', err));

// Health Check Route
app.get('/', (req, res) => res.send('API is running'));

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
