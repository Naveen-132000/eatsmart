const express = require('express');
const { query, validationResult } = require('express-validator');
const Offer = require('../models/Offer');
const Restaurant = require('../models/Restaurant');

const router = express.Router();

// Get offers for a restaurant
router.get('/restaurant/:restaurantId', [
  query('platform').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { restaurantId } = req.params;
    const { platform } = req.query;

    const query = {
      restaurant: restaurantId,
      isActive: true,
      validUntil: { $gt: new Date() }
    };

    if (platform) {
      query.platform = platform;
    }

    const offers = await Offer.find(query)
      .sort({ discountedPrice: 1, priority: -1 })
      .populate('restaurant', 'name slug');

    res.json({ offers });
  } catch (error) {
    console.error('Get offers error:', error);
    res.status(500).json({ message: 'Server error while fetching offers' });
  }
});

// Get best offers across all restaurants
router.get('/best', [
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('category').optional().isString(),
  query('area').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { limit = 20, category, area } = req.query;

    // Build restaurant filter
    const restaurantFilter = { isActive: true };
    if (category) restaurantFilter.category = category;
    if (area) restaurantFilter['location.area'] = new RegExp(area, 'i');

    // Get restaurants matching filter
    const restaurants = await Restaurant.find(restaurantFilter).select('_id');
    const restaurantIds = restaurants.map(r => r._id);

    // Get best offers for these restaurants
    const offers = await Offer.find({
      restaurant: { $in: restaurantIds },
      isActive: true,
      validUntil: { $gt: new Date() }
    })
    .populate('restaurant', 'name slug images location rating category')
    .sort({ discountedPrice: 1, priority: -1 })
    .limit(parseInt(limit));

    // Group by restaurant and take best offer for each
    const bestOffersByRestaurant = {};
    offers.forEach(offer => {
      const restaurantId = offer.restaurant._id.toString();
      if (!bestOffersByRestaurant[restaurantId] || 
          offer.discountedPrice < bestOffersByRestaurant[restaurantId].discountedPrice) {
        bestOffersByRestaurant[restaurantId] = offer;
      }
    });

    const bestOffers = Object.values(bestOffersByRestaurant);

    res.json({ offers: bestOffers });
  } catch (error) {
    console.error('Get best offers error:', error);
    res.status(500).json({ message: 'Server error while fetching best offers' });
  }
});

// Track offer click
router.post('/:offerId/click', async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerId);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Increment click count (you can add analytics here)
    // For now, just return the platform URL
    res.json({
      redirectUrl: offer.platformUrl,
      platform: offer.platform,
      discount: offer.discount
    });
  } catch (error) {
    console.error('Track offer click error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;