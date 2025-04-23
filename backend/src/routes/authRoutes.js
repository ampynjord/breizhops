// authRoutes.js
import express from 'express';
import validateRegister from '../middlewares/validateRegister.js';
import { registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);

export default router;