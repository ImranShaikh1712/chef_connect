import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
  {
    chef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true }
  },
  { timestamps: true }
);

const RecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ingredients: [{ type: String }],
    steps: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratings: [RatingSchema]
  },
  { timestamps: true }
);

RecipeSchema.virtual('averageRating').get(function () {
  if (!this.ratings?.length) return 0;
  const avg = this.ratings.reduce((acc, r) => acc + r.score, 0) / this.ratings.length;
  return Math.round(avg * 10) / 10;
});

RecipeSchema.set('toJSON', { virtuals: true });
RecipeSchema.set('toObject', { virtuals: true });

export default mongoose.model('Recipe', RecipeSchema);
