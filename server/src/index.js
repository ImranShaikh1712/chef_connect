import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import recipeRoutes from './routes/recipes.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'OK', service: 'chef-connect-api' });
});
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', usersRoutes);

// Start
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });
