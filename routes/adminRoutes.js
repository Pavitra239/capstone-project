import express from 'express';
import {
  enrollStudent,
  sendEmails,
  postNotification,
  blockStudent,
  approveLeave,
  resetAdminPassword,
  getStudents,
} from '../controllers/adminController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateUser);

router.post('/enroll', enrollStudent);
router.post('/send-emails', sendEmails);
router.post('/post-notification', postNotification);
router.post('/block-student/:id', blockStudent);
router.post('/approve-leave/:id', approveLeave);
router.post('/reset-password', resetAdminPassword);
router.get('/students', getStudents);

export default router;
