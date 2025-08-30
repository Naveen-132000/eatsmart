const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  cuisine: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['restaurant', 'restopub', 'restobar', 'bar', 'cafe', 'fine-dining']
  },
  location: {
    area: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      default: 'Bangalore'
    },
    pincode: String,
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    }
  },
  contact: {
    phone: {
      type: String,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid phone number']
    },
    email: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    website: String
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: { type: Boolean, default: false }
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  priceRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  features: [{
    type: String,
    enum: ['wifi', 'parking', 'ac', 'outdoor-seating', 'live-music', 'bar', 'delivery', 'takeaway', 'wheelchair-accessible']
  }],
  timings: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: false } }
  },
  menu: [{
    category: String,
    items: [{
      name: String,
      description: String,
      price: Number,
      isVeg: Boolean,
      isSpicy: Boolean,
      isRecommended: Boolean
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create slug from name
restaurantSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Index for location-based queries
restaurantSchema.index({ 'location.coordinates': '2dsphere' });
restaurantSchema.index({ category: 1, 'location.area': 1 });
restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ 'rating.average': -1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);