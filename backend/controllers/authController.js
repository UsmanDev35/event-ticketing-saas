// backend/controllers/authController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Add this to the top of backend/controllers/authController.js
import { OAuth2Client } from 'google-auth-library';

// Initialize the Google Client (We will add the CLIENT_ID to our .env later)
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Helper function to generate JWT and attach it to an HttpOnly cookie
const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'supersecretkey', {
    expiresIn: '30d',
  });

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('jwt', token, {
    httpOnly: true, // Prevents JavaScript (XSS) from reading the cookie
    secure: isProduction, // Only secure in production
    sameSite: 'none', // Required for cross-origin cookie behavior between frontend and backend
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });

    // 2. TIMING ATTACK PREVENTION
    // If user doesn't exist, we STILL run a bcrypt hash so the server takes 
    // the exact same amount of time to respond, confusing attackers.
    if (!user) {
      await bcrypt.hash(password, 10); // Dummy hash
      return res.status(401).json({ message: 'Invalid email or password' }); // Generic message
    }

    // 3. Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' }); // Identical generic message
    }

    // 4. Success! Generate token and secure cookie
    const token = generateTokenAndSetCookie(res, user._id);

    // 5. Send user data back to frontend (without the password)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token // We send it here temporarily so Redux can grab it, but the cookie is the real security
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
};



// Add this below loginUser in backend/controllers/authController.js

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation: Ensure all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // 3. Create the user
    // (Remember: The pre-save hook in User.js automatically hashes the password!)
    const user = await User.create({
      name,
      email,
      password,
      role: 'customer', // Default role
    });

    if (user) {
      // 4. Generate token and set secure HttpOnly cookie
      const token = generateTokenAndSetCookie(res, user._id);

      // 5. Send back the user data
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body; // This is the JWT Google gives the frontend

    // 1. Verify the Google JWT using Google's public keys
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });

    // 2. Extract the user's identity from the verified payload
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload; 

    // 3. Check if this user already exists in our database
    let user = await User.findOne({ email });

    if (!user) {
      // 4. If they don't exist, create a new account for them automatically.
      // We generate a random, highly secure password since they will always log in via Google.
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      
      user = await User.create({
        name,
        email,
        password: randomPassword, 
        role: 'customer',
      });
    }

    // 5. Generate OUR Eventrix token and set the secure HttpOnly cookie
    const token = generateTokenAndSetCookie(res, user._id);

    // 6. Send the user data back to the frontend Redux brain
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Invalid Google Identity Token' });
  }
};