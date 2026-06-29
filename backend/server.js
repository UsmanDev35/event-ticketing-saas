// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// 1. Load environment variables
dotenv.config();

// 2. Connect to Local MongoDB
connectDB();

// 3. Initialize Express
const app = express();

// 4. Global Middlewares (Security & Parsing)
app.use(express.json()); // Allows us to accept JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(cookieParser()); // Allows Express to read secure cookies from the browser

// CORS Configuration (Crucial for connecting to your React frontend)
app.use(cors({
  origin: 'http://localhost:5173', // The exact URL of your Vite React app
  credentials: true, // MUST be true to allow cookies to be sent back and forth
}));

// 5. Mount Routes
app.use('/api/auth', authRoutes);

// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'API Route not found' });
});

// 6. Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});