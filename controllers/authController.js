import Admin from '../models/Admin.js';
import Student from '../models/Student.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginStudent = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    const student = await Student.findOne({ registrationNumber });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (student.isBlocked) {
      return res.status(403).json({
        message:
          'Your account has been blocked. Please contact the administrator.',
      });
    }
    const token = jwt.sign(
      { id: student._id, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        registrationNumber: student.registrationNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const { name, email, registrationNumber, password } = req.body;
    let student = await Student.findOne({ registrationNumber });
    if (!student) {
      return res.status(400).json({ message: 'Invalid registration number' });
    }
    if (student.password) {
      return res.status(400).json({ message: 'Student already registered' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    student.name = name;
    student.email = email;
    student.password = hashedPassword;
    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error registering student', error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log(isMatch);

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: 'admin',
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching user data', error: error.message });
  }
};
