const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  location: {
    area: String,
    city: { type: String, default: 'Bangalore' },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  preferences: {
    cuisines: [String],
    priceRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 5000 }
    },
    dietaryRestrictions: [String]
  },
  favoriteRestaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  bookingHistory: [{
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    },
    platform: String,
    amount: Number,
    discount: Number,
    bookingDate: Date,
    visitDate: Date,
    status: {
      type: String,
      enum: ['confirmed', 'completed', 'cancelled'],
      default: 'confirmed'
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculate total savings
userSchema.methods.getTotalSavings = function() {
  return this.bookingHistory.reduce((total, booking) => {
    return total + (booking.discount || 0);
  }, 0);
};

module.exports = mongoose.model('User', userSchema);