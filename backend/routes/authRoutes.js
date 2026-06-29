// backend/routes/authRoutes.js
import express from 'express';
import { loginUser, registerUser, googleLogin } from '../controllers/authController.js'; // Import it here

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/google', googleLogin); // The new Google endpoint

export default router;