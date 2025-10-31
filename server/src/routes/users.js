import { Router } from 'express';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
import { auth, errorHandler } from '../middleware/auth.js';

const router = Router();

// List all chefs (public)
router.get('/chefs', async (_req, res, next) => {
  try {
    const chefs = await User.find({ role: 'chef' }).select('name role');
    res.json(chefs);
  } catch (e) {
    next(e);
  }
});

// Get public profile by user id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.role === 'user') {
      const recipes = await Recipe.find({ author: user._id }).sort({ createdAt: -1 });
      return res.json({ user, recipes });
    }

    // Chef profile: ratings they have left
    const recipesWithRatings = await Recipe.find({ 'ratings.chef': user._id })
      .select('title ratings createdAt')
      .populate('author', 'name');

    const ratings = [];
    recipesWithRatings.forEach((r) => {
      r.ratings.forEach((rt) => {
        if (String(rt.chef) === String(user._id)) {
          ratings.push({
            recipeId: r._id,
            recipeTitle: r.title,
            score: rt.score,
            comment: rt.comment,
            createdAt: rt.createdAt,
            author: r.author?.name || 'User'
          });
        }
      });
    });

    res.json({ user, ratings });
  } catch (e) {
    next(e);
  }
});

// Current user's dashboard data (requires auth)
router.get('/me/dashboard', auth, async (req, res, next) => {
  try {
    if (req.user.role === 'user') {
      const recipes = await Recipe.find({ author: req.user._id }).sort({ createdAt: -1 });
      return res.json({ user: req.user, recipes });
    }

    const recipesWithRatings = await Recipe.find({ 'ratings.chef': req.user._id })
      .select('title ratings createdAt')
      .populate('author', 'name');

    const ratings = [];
    recipesWithRatings.forEach((r) => {
      r.ratings.forEach((rt) => {
        if (String(rt.chef) === String(req.user._id)) {
          ratings.push({
            recipeId: r._id,
            recipeTitle: r.title,
            score: rt.score,
            comment: rt.comment,
            createdAt: rt.createdAt,
            author: r.author?.name || 'User'
          });
        }
      });
    });

    res.json({ user: req.user, ratings });
  } catch (e) {
    next(e);
  }
});

router.use(errorHandler);

export default router;
