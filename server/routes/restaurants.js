const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Restaurant = require('../models/Restaurant');
const Offer = require('../models/Offer');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all restaurants with filters
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1-50'),
  query('category').optional().isIn(['restaurant', 'restopub', 'restobar', 'bar', 'cafe', 'fine-dining']),
  query('area').optional().isString(),
  query('cuisine').optional().isString(),
  query('minPrice').optional().isNumeric(),
  query('maxPrice').optional().isNumeric(),
  query('rating').optional().isFloat({ min: 0, max: 5 }),
  query('sortBy').optional().isIn(['rating', 'price', 'name', 'distance'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      page = 1,
      limit = 12,
      category,
      area,
      cuisine,
      minPrice,
      maxPrice,
      rating,
      sortBy = 'rating',
      search,
      lat,
      lng
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (category) query.category = category;
    if (area) query['location.area'] = new RegExp(area, 'i');
    if (cuisine) query.cuisine = { $in: [new RegExp(cuisine, 'i')] };
    if (minPrice || maxPrice) {
      query['priceRange.min'] = {};
      if (minPrice) query['priceRange.min'].$gte = parseInt(minPrice);
      if (maxPrice) query['priceRange.max'] = { $lte: parseInt(maxPrice) };
    }
    if (rating) query['rating.average'] = { $gte: parseFloat(rating) };
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { cuisine: { $in: [new RegExp(search, 'i')] } },
        { 'location.area': new RegExp(search, 'i') }
      ];
    }

    // Location-based query
    if (lat && lng) {
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 10000 // 10km radius
        }
      };
    }

    // Build sort
    let sort = {};
    switch (sortBy) {
      case 'rating':
        sort = { 'rating.average': -1, 'rating.count': -1 };
        break;
      case 'price':
        sort = { 'priceRange.min': 1 };
        break;
      case 'name':
        sort = { name: 1 };
        break;
      default:
        sort = { 'rating.average': -1 };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [restaurants, total] = await Promise.all([
      Restaurant.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .select('-menu -owner'),
      Restaurant.countDocuments(query)
    ]);

    // Get offers for each restaurant
    const restaurantIds = restaurants.map(r => r._id);
    const offers = await Offer.find({
      restaurant: { $in: restaurantIds },
      isActive: true,
      validUntil: { $gt: new Date() }
    }).sort({ discountedPrice: 1 });

    // Group offers by restaurant
    const offersByRestaurant = offers.reduce((acc, offer) => {
      const restaurantId = offer.restaurant.toString();
      if (!acc[restaurantId]) acc[restaurantId] = [];
      acc[restaurantId].push(offer);
      return acc;
    }, {});

    // Combine restaurants with their offers
    const restaurantsWithOffers = restaurants.map(restaurant => ({
      ...restaurant.toObject(),
      offers: offersByRestaurant[restaurant._id.toString()] || []
    }));

    res.json({
      restaurants: restaurantsWithOffers,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: restaurants.length,
        totalRestaurants: total
      }
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ message: 'Server error while fetching restaurants' });
  }
});

// Get single restaurant by slug
router.get('/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Get active offers
    const offers = await Offer.find({
      restaurant: restaurant._id,
      isActive: true,
      validUntil: { $gt: new Date() }
    }).sort({ discountedPrice: 1 });

    // Get recent reviews
    const reviews = await Review.find({ restaurant: restaurant._id })
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      restaurant: {
        ...restaurant.toObject(),
        offers,
        reviews
      }
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ message: 'Server error while fetching restaurant' });
  }
});

// Add restaurant to favorites
router.post('/:id/favorite', auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const User = require('../models/User');
    const user = await User.findById(req.userId);
    
    const isFavorite = user.favoriteRestaurants.includes(req.params.id);
    
    if (isFavorite) {
      user.favoriteRestaurants = user.favoriteRestaurants.filter(
        id => id.toString() !== req.params.id
      );
    } else {
      user.favoriteRestaurants.push(req.params.id);
    }
    
    await user.save();

    res.json({
      message: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      isFavorite: !isFavorite
    });
  } catch (error) {
    console.error('Favorite restaurant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;