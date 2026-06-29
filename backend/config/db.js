// backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // We are using local MongoDB as requested
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventrix');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Stop the server if DB fails
  }
};

export default connectDB;