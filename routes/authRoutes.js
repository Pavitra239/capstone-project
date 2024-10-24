import express from 'express';
import {
  getCurrentUser,
  loginAdmin,
  loginStudent,
  registerStudent,
} from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';
const router = express.Router();

router.post('/admin/login', loginAdmin);
router.post('/student/login', loginStudent);
router.post('/student/register', registerStudent);
router.get('/me', authenticateUser, getCurrentUser);

export default router;
