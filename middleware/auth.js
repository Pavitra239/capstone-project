import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Student from '../models/Student.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id).select('-password');
    } else {
      user = await Student.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = { ...user.toObject(), role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
