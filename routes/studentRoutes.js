import express from 'express';
import {
  updateProfile,
  applyLeave,
  resetStudentPassword,
  getNotifications,
  getExamTimetable,
  getExamGatePass,
} from '../controllers/studentController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateUser);

router.put('/profile', updateProfile);
router.post('/apply-leave', applyLeave);
router.post('/reset-password', resetStudentPassword);
router.get('/notifications', getNotifications);
router.get('/exam-timetable', getExamTimetable);
router.get('/exam-gate-pass', getExamGatePass);

export default router;
