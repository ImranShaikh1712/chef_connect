import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return next({ status: 401, message: 'No token' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select('-password');
    if (!req.user) return next({ status: 401, message: 'Invalid token' });
    next();
  } catch (e) {
    next({ status: 401, message: 'Unauthorized' });
  }
};

export const requireRole = (role) => (req, _res, next) => {
  if (!req.user) return next({ status: 401, message: 'Unauthorized' });
  if (req.user.role !== role) return next({ status: 403, message: 'Forbidden' });
  next();
};

export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Server error';
  res.status(status).json({ error: message });
};
