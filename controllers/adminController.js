import Student from '../models/Student.js';
import Notification from '../models/Notification.js';
import Leave from '../models/Leave.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/email.js';

export const enrollStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const prefix = 'IT2024';
    const count = await Student.countDocuments();
    if (!count) throw new Error('Something went wrong!');
    const newId = prefix + (count + 1).toString().padStart(3, '0');
    const student = new Student({ name, email, newId });
    await sendEmail(
      email,
      'registration number',
      `Your registration number is: ${newId}`
    );
    await student.save();
    res.status(201).json({ message: 'Student enrolled successfully', student });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error enrolling student', error: error.message });
  }
};

export const sendEmails = async (req, res) => {
  try {
    const students = await Student.find({});
    for (let student of students) {
      await sendEmail(
        student.email,
        'Registration Information',
        `Your registration number is: ${student.registrationNumber}`
      );
    }
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error sending emails', error: error.message });
  }
};

export const postNotification = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const notification = new Notification({ title, content, type });
    await notification.save();
    res
      .status(201)
      .json({ message: 'Notification posted successfully', notification });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error posting notification', error: error.message });
  }
};

export const blockStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    student.isBlocked = !student.isBlocked;
    await student.save();
    res.status(200).json({
      message: `Student ${
        student.isBlocked ? 'blocked' : 'unblocked'
      } successfully`,
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error blocking/unblocking student',
      error: error.message,
    });
  }
};

export const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }
    leave.status = req.body.status; // 'approved' or 'rejected'
    await leave.save();
    res
      .status(200)
      .json({ message: 'Leave application updated successfully', leave });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating leave application',
      error: error.message,
    });
  }
};

export const resetAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.adminId);
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error resetting password', error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find({}).select('-password');
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching students', error: error.message });
  }
};
