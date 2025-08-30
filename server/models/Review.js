const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  images: [{
    url: String,
    alt: String
  }],
  visitDate: {
    type: Date,
    required: true
  },
  platform: {
    type: String,
    enum: ['zomato', 'swiggy-dineout', 'eazydiner', 'magicpin', 'direct']
  },
  offerUsed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer'
  },
  amountSpent: Number,
  amountSaved: Number,
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isHelpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
reviewSchema.index({ restaurant: 1, rating: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ createdAt: -1 });

// Prevent duplicate reviews from same user for same restaurant
reviewSchema.index({ user: 1, restaurant: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);