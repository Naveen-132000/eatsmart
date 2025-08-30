const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user favorites
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: 'favoriteRestaurants',
        select: 'name slug images location rating category cuisine',
        match: { isActive: true }
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ favorites: user.favoriteRestaurants });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user booking history
router.get('/bookings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: 'bookingHistory.restaurant',
        select: 'name slug images location'
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookings = user.bookingHistory.sort((a, b) => 
      new Date(b.bookingDate) - new Date(a.bookingDate)
    );

    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add booking to history
router.post('/bookings', auth, [
  body('restaurantId').isMongoId().withMessage('Valid restaurant ID required'),
  body('platform').isString().withMessage('Platform is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('discount').optional().isNumeric(),
  body('visitDate').isISO8601().withMessage('Valid visit date required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { restaurantId, platform, amount, discount = 0, visitDate } = req.body;

    // Verify restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const user = await User.findById(req.userId);
    user.bookingHistory.push({
      restaurant: restaurantId,
      platform,
      amount,
      discount,
      bookingDate: new Date(),
      visitDate: new Date(visitDate),
      status: 'confirmed'
    });

    await user.save();

    res.status(201).json({
      message: 'Booking added successfully',
      totalSavings: user.getTotalSavings()
    });
  } catch (error) {
    console.error('Add booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user reviews
router.get('/reviews', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.userId })
      .populate('restaurant', 'name slug images location')
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalBookings = user.bookingHistory.length;
    const totalSavings = user.getTotalSavings();
    const favoriteCount = user.favoriteRestaurants.length;
    
    const reviewCount = await Review.countDocuments({ user: req.userId });
    
    const completedBookings = user.bookingHistory.filter(
      booking => booking.status === 'completed'
    ).length;

    res.json({
      stats: {
        totalBookings,
        completedBookings,
        totalSavings,
        favoriteCount,
        reviewCount
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;