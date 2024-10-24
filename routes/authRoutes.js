import express from 'express';
import {
  loginAdmin,
  loginStudent,
  registerStudent,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/admin/login', loginAdmin);
router.post('/student/login', loginStudent);
router.post('/student/register', registerStudent);

export default router;
