import Student from '../models/Student.js';
import Leave from '../models/Leave.js';
import Notification from '../models/Notification.js';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = await Student.findById(req.studentId);
    if (name) student.name = name;
    if (email) student.email = email;
    await student.save();
    res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating profile', error: error.message });
  }
};

export const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const leave = new Leave({
      student: req.studentId,
      startDate,
      endDate,
      reason,
    });
    await leave.save();
    res
      .status(201)
      .json({ message: 'Leave application submitted successfully', leave });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error applying for leave', error: error.message });
  }
};

export const resetStudentPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const student = await Student.findById(req.studentId);
    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);
    await student.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error resetting password', error: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort('-createdAt');
    res.status(200).json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching notifications', error: error.message });
  }
};

export const getExamTimetable = async (req, res) => {
  try {
    const timetable = await Notification.findOne({
      type: 'exam_timetable',
    }).sort('-createdAt');
    if (!timetable) {
      return res.status(404).json({ message: 'Exam timetable not found' });
    }
    res.status(200).json(timetable);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching exam timetable', error: error.message });
  }
};

export const getExamGatePass = async (req, res) => {
  try {
    const gatePass = await Notification.findOne({
      type: 'exam_gate_pass',
      student: req.studentId,
    }).sort('-createdAt');
    if (!gatePass) {
      return res.status(404).json({ message: 'Exam gate pass not found' });
    }
    res.status(200).json(gatePass);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching exam gate pass', error: error.message });
  }
};
