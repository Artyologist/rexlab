const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://rexlab.vercel.app',
    'https://rexlabs.vercel.app',
    /\.vercel\.app$/, // allow all vercel preview URLs
  ],
  credentials: true,
}));

// Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/beats', require('./routes/beatRoutes'));
app.use('/api/sessions', require('./routes/sessionRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
// app.use('/api/payment', require('./routes/paymentRoutes'));

app.get('/', (req, res) => {
  res.send('Rex Labs API is running...');
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error('Check your .env file and ensure MONGODB_URI is correct and your database is running.');
    // Do not exit process in dev mode so the server stays up
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
