import { Router } from 'express';
import Recipe from '../models/Recipe.js';
import { auth, requireRole, errorHandler } from '../middleware/auth.js';

const router = Router();

// List recipes
router.get('/', async (req, res, next) => {
  try {
    const { q, authorId } = req.query;
    const filter = {};
    if (q) {
      const rx = new RegExp(q, 'i');
      filter.$or = [{ title: rx }, { description: rx }];
    }
    if (authorId) {
      filter.author = authorId;
    }

    const recipes = await Recipe.find(filter)
      .populate('author', 'name role')
      .sort({ createdAt: -1 });
    res.json(recipes);
  } catch (e) {
    next(e);
  }
});

// Get one
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name role').populate('ratings.chef', 'name');
    if (!recipe) return res.status(404).json({ error: 'Not found' });
    res.json(recipe);
  } catch (e) {
    next(e);
  }
});

// Create recipe (only common users)
router.post('/', auth, requireRole('user'), async (req, res, next) => {
  try {
    const { title, description, ingredients, steps } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const recipe = await Recipe.create({
      title,
      description: description || '',
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      steps: Array.isArray(steps) ? steps : [],
      author: req.user._id,
    });
    const populated = await recipe.populate('author', 'name role');
    res.status(201).json(populated);
  } catch (e) {
    next(e);
  }
});

// Rate recipe (only chefs)
router.post('/:id/rate', auth, requireRole('chef'), async (req, res, next) => {
  try {
    const { score, comment } = req.body;
    if (!score || score < 1 || score > 5) return res.status(400).json({ error: 'Score 1-5 required' });
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Not found' });

    const already = recipe.ratings.find((r) => String(r.chef) === String(req.user._id));
    if (already) return res.status(400).json({ error: 'You already rated this recipe' });

    recipe.ratings.push({ chef: req.user._id, score, comment: comment || '' });
    await recipe.save();

    const populated = await Recipe.findById(recipe._id).populate('author', 'name role').populate('ratings.chef', 'name');
    res.json(populated);
  } catch (e) {
    next(e);
  }
});

router.use(errorHandler);

export default router;
