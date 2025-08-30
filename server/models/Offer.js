const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  platform: {
    type: String,
    required: true,
    enum: ['zomato', 'swiggy-dineout', 'eazydiner', 'magicpin', 'dineout', 'nearbuy']
  },
  platformDisplayName: {
    type: String,
    required: true
  },
  offerType: {
    type: String,
    required: true,
    enum: ['percentage', 'flat', 'buy-one-get-one', 'cashback']
  },
  discount: {
    value: {
      type: Number,
      required: true
    },
    maxDiscount: Number,
    minOrderValue: Number
  },
  originalPrice: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  terms: [String],
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: true
  },
  daysAvailable: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }],
  timeSlots: [{
    start: String,
    end: String
  }],
  maxRedemptions: Number,
  currentRedemptions: {
    type: Number,
    default: 0
  },
  platformUrl: {
    type: String,
    required: true
  },
  platformColor: {
    type: String,
    default: '#000000'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
offerSchema.index({ restaurant: 1, platform: 1 });
offerSchema.index({ validUntil: 1 });
offerSchema.index({ discountedPrice: 1 });
offerSchema.index({ isActive: 1, validUntil: 1 });

// Virtual for checking if offer is expired
offerSchema.virtual('isExpired').get(function() {
  return this.validUntil < new Date();
});

// Virtual for checking if offer is available today
offerSchema.virtual('isAvailableToday').get(function() {
  const today = new Date().toLocaleLowerCase().slice(0, 3) + 
                new Date().toLocaleLowerCase().slice(3);
  return this.daysAvailable.length === 0 || 
         this.daysAvailable.includes(today);
});

module.exports = mongoose.model('Offer', offerSchema);