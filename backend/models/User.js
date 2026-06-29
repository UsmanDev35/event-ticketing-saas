// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Prevents duplicate accounts
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'organizer', 'admin'],
      default: 'customer',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Mongoose Hook: Run this BEFORE saving a user to the database
userSchema.pre('save', async function () {
  // If the password wasn't modified, skip this
  if (!this.isModified('password')) return;

  // Hash the password with a salt round of 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Helper Method: Compare plain text password to hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;