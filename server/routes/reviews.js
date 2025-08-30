const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');

const router = express.Router();

// Get reviews for a restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'recent' } = req.query;

    let sort = {};
    switch (sortBy) {
      case 'recent':
        sort = { createdAt: -1 };
        break;
      case 'rating-high':
        sort = { rating: -1, createdAt: -1 };
        break;
      case 'rating-low':
        sort = { rating: 1, createdAt: -1 };
        break;
      case 'helpful':
        sort = { isHelpful: -1, createdAt: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [reviews, total] = await Promise.all([
      Review.find({ restaurant: req.params.restaurantId })
        .populate('user', 'name')
        .populate('offerUsed', 'platform discount')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Review.countDocuments({ restaurant: req.params.restaurantId })
    ]);

    // Calculate rating distribution
    const ratingStats = await Review.aggregate([
      { $match: { restaurant: mongoose.Types.ObjectId(req.params.restaurantId) } },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      }
    ]);

    const ratingDistribution = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    ratingStats.forEach(stat => {
      ratingDistribution[stat._id] = stat.count;
    });

    res.json({
      reviews,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: reviews.length,
        totalReviews: total
      },
      ratingDistribution
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error while fetching reviews' });
  }
});

// Create a review
router.post('/', auth, [
  body('restaurantId').isMongoId().withMessage('Valid restaurant ID required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be 5-100 characters'),
  body('comment').trim().isLength({ min: 10, max: 500 }).withMessage('Comment must be 10-500 characters'),
  body('visitDate').isISO8601().withMessage('Valid visit date required'),
  body('amountSpent').optional().isNumeric(),
  body('amountSaved').optional().isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      restaurantId,
      rating,
      title,
      comment,
      visitDate,
      platform,
      offerUsed,
      amountSpent,
      amountSaved,
      images
    } = req.body;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Check if user already reviewed this restaurant
    const existingReview = await Review.findOne({
      user: req.userId,
      restaurant: restaurantId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this restaurant' });
    }

    // Create review
    const review = new Review({
      user: req.userId,
      restaurant: restaurantId,
      rating,
      title,
      comment,
      visitDate: new Date(visitDate),
      platform,
      offerUsed,
      amountSpent,
      amountSaved,
      images
    });

    await review.save();

    // Update restaurant rating
    const reviews = await Review.find({ restaurant: restaurantId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await Restaurant.findByIdAndUpdate(restaurantId, {
      'rating.average': Math.round(avgRating * 10) / 10,
      'rating.count': reviews.length
    });

    // Populate the review before sending response
    await review.populate('user', 'name');
    await review.populate('offerUsed', 'platform discount');

    res.status(201).json({
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error while creating review' });
  }
});

// Like/unlike a review
router.post('/:reviewId/like', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const isLiked = review.likes.includes(req.userId);
    
    if (isLiked) {
      review.likes = review.likes.filter(id => id.toString() !== req.userId);
      review.isHelpful = Math.max(0, review.isHelpful - 1);
    } else {
      review.likes.push(req.userId);
      review.isHelpful += 1;
    }

    await review.save();

    res.json({
      message: isLiked ? 'Review unliked' : 'Review liked',
      isLiked: !isLiked,
      helpfulCount: review.isHelpful
    });
  } catch (error) {
    console.error('Like review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;