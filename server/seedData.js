const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const Offer = require('./models/Offer');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eatsmart');
    
    // Clear existing data
    await Restaurant.deleteMany({});
    await Offer.deleteMany({});

    // Sample restaurants
    const restaurants = [
      {
        name: "The Spice Route",
        description: "Authentic Indian cuisine with a modern twist, featuring traditional recipes from across India.",
        cuisine: ["Indian", "North Indian", "South Indian"],
        category: "restaurant",
        location: {
          area: "Koramangala",
          address: "123 5th Block, Koramangala, Bangalore",
          city: "Bangalore",
          pincode: "560095",
          coordinates: {
            latitude: 12.9352,
            longitude: 77.6245
          }
        },
        contact: {
          phone: "9876543210",
          email: "info@spiceroute.com",
          website: "https://spiceroute.com"
        },
        images: [{
          url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
          alt: "The Spice Route Interior",
          isPrimary: true
        }],
        rating: {
          average: 4.3,
          count: 245
        },
        priceRange: {
          min: 800,
          max: 1500
        },
        features: ["wifi", "ac", "parking", "takeaway"],
        timings: {
          monday: { open: "11:00", close: "23:00" },
          tuesday: { open: "11:00", close: "23:00" },
          wednesday: { open: "11:00", close: "23:00" },
          thursday: { open: "11:00", close: "23:00" },
          friday: { open: "11:00", close: "23:30" },
          saturday: { open: "11:00", close: "23:30" },
          sunday: { open: "11:00", close: "23:00" }
        },
        isActive: true,
        isVerified: true
      },
      {
        name: "The Brew House",
        description: "Perfect blend of great food and craft beers in a vibrant atmosphere.",
        cuisine: ["Continental", "Italian", "American"],
        category: "restopub",
        location: {
          area: "Indiranagar",
          address: "456 100 Feet Road, Indiranagar, Bangalore",
          city: "Bangalore",
          pincode: "560038",
          coordinates: {
            latitude: 12.9719,
            longitude: 77.6412
          }
        },
        contact: {
          phone: "9876543211",
          email: "hello@brewhouse.com"
        },
        images: [{
          url: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
          alt: "The Brew House",
          isPrimary: true
        }],
        rating: {
          average: 4.5,
          count: 189
        },
        priceRange: {
          min: 1200,
          max: 2500
        },
        features: ["wifi", "ac", "bar", "live-music", "outdoor-seating"],
        timings: {
          monday: { open: "12:00", close: "01:00" },
          tuesday: { open: "12:00", close: "01:00" },
          wednesday: { open: "12:00", close: "01:00" },
          thursday: { open: "12:00", close: "01:00" },
          friday: { open: "12:00", close: "02:00" },
          saturday: { open: "12:00", close: "02:00" },
          sunday: { open: "12:00", close: "01:00" }
        },
        isActive: true,
        isVerified: true
      },
      {
        name: "Skybar Lounge",
        description: "Rooftop dining with panoramic city views and premium cocktails.",
        cuisine: ["Continental", "Asian", "Mediterranean"],
        category: "restobar",
        location: {
          area: "UB City Mall",
          address: "UB City Mall, Vittal Mallya Road, Bangalore",
          city: "Bangalore",
          pincode: "560001",
          coordinates: {
            latitude: 12.9716,
            longitude: 77.5946
          }
        },
        contact: {
          phone: "9876543212",
          email: "reservations@skybar.com"
        },
        images: [{
          url: "https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
          alt: "Skybar Lounge",
          isPrimary: true
        }],
        rating: {
          average: 4.4,
          count: 156
        },
        priceRange: {
          min: 1800,
          max: 3500
        },
        features: ["wifi", "ac", "bar", "outdoor-seating", "wheelchair-accessible"],
        timings: {
          monday: { open: "18:00", close: "02:00" },
          tuesday: { open: "18:00", close: "02:00" },
          wednesday: { open: "18:00", close: "02:00" },
          thursday: { open: "18:00", close: "02:00" },
          friday: { open: "18:00", close: "03:00" },
          saturday: { open: "18:00", close: "03:00" },
          sunday: { open: "18:00", close: "02:00" }
        },
        isActive: true,
        isVerified: true
      },
      {
        name: "The Whiskey Bar",
        description: "Premium whiskey collection with sophisticated ambiance and live jazz.",
        cuisine: ["Continental", "Japanese"],
        category: "bar",
        location: {
          area: "Brigade Road",
          address: "789 Brigade Road, Bangalore",
          city: "Bangalore",
          pincode: "560025",
          coordinates: {
            latitude: 12.9698,
            longitude: 77.6205
          }
        },
        contact: {
          phone: "9876543213",
          email: "info@whiskeybar.com"
        },
        images: [{
          url: "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
          alt: "The Whiskey Bar",
          isPrimary: true
        }],
        rating: {
          average: 4.2,
          count: 98
        },
        priceRange: {
          min: 2000,
          max: 4000
        },
        features: ["wifi", "ac", "bar", "live-music"],
        timings: {
          monday: { open: "19:00", close: "02:00" },
          tuesday: { open: "19:00", close: "02:00" },
          wednesday: { open: "19:00", close: "02:00" },
          thursday: { open: "19:00", close: "02:00" },
          friday: { open: "19:00", close: "03:00" },
          saturday: { open: "19:00", close: "03:00" },
          sunday: { open: "19:00", close: "02:00" }
        },
        isActive: true,
        isVerified: true
      },
      {
        name: "Cafe Mocha",
        description: "Cozy coffee shop with artisanal brews and homemade pastries.",
        cuisine: ["Coffee", "Continental", "Desserts"],
        category: "cafe",
        location: {
          area: "HSR Layout",
          address: "321 Sector 1, HSR Layout, Bangalore",
          city: "Bangalore",
          pincode: "560102",
          coordinates: {
            latitude: 12.9082,
            longitude: 77.6476
          }
        },
        contact: {
          phone: "9876543214",
          email: "hello@cafemocha.com"
        },
        images: [{
          url: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
          alt: "Cafe Mocha",
          isPrimary: true
        }],
        rating: {
          average: 4.1,
          count: 167
        },
        priceRange: {
          min: 300,
          max: 800
        },
        features: ["wifi", "ac", "takeaway"],
        timings: {
          monday: { open: "07:00", close: "22:00" },
          tuesday: { open: "07:00", close: "22:00" },
          wednesday: { open: "07:00", close: "22:00" },
          thursday: { open: "07:00", close: "22:00" },
          friday: { open: "07:00", close: "23:00" },
          saturday: { open: "08:00", close: "23:00" },
          sunday: { open: "08:00", close: "22:00" }
        },
        isActive: true,
        isVerified: true
      },
      {
        name: "Royal Feast",
        description: "Luxury fine dining experience with world-class cuisine and impeccable service.",
        cuisine: ["French", "Italian", "Continental"],
        category: "fine-dining",
        location: {
          area: "Whitefield",
          address: "654 ITPL Main Road, Whitefield, Bangalore",
          city: "Bangalore",
          pincode: "560066",
          coordinates: {
            latitude: 12.9698,
            longitude: 77.7500
          }
        },
        contact: {
          phone: "9876543215",
          email: "reservations@royalfeast.com"
        },
        images: [{
          url: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
          alt: "Royal Feast",
          isPrimary: true
        }],
        rating: {
          average: 4.6,
          count: 89
        },
        priceRange: {
          min: 3000,
          max: 6000
        },
        features: ["wifi", "ac", "parking", "wheelchair-accessible"],
        timings: {
          monday: { open: "19:00", close: "23:30" },
          tuesday: { open: "19:00", close: "23:30" },
          wednesday: { open: "19:00", close: "23:30" },
          thursday: { open: "19:00", close: "23:30" },
          friday: { open: "19:00", close: "00:00" },
          saturday: { open: "19:00", close: "00:00" },
          sunday: { open: "19:00", close: "23:30" }
        },
        isActive: true,
        isVerified: true
      }
    ];

    const createdRestaurants = await Restaurant.insertMany(restaurants);
    console.log('Restaurants seeded successfully');

    // Create offers for each restaurant
    const offers = [];
    const platforms = [
      { name: 'zomato', displayName: 'Zomato', color: '#E23744', baseUrl: 'https://www.zomato.com' },
      { name: 'swiggy-dineout', displayName: 'Swiggy Dineout', color: '#FC8019', baseUrl: 'https://www.dineout.co.in' },
      { name: 'eazydiner', displayName: 'EazyDiner', color: '#8B5CF6', baseUrl: 'https://www.eazydiner.com' },
      { name: 'magicpin', displayName: 'Magicpin', color: '#10B981', baseUrl: 'https://www.magicpin.in' }
    ];

    createdRestaurants.forEach(restaurant => {
      const basePrice = restaurant.priceRange.max;
      
      platforms.forEach((platform, index) => {
        const discountPercent = 20 + (index * 10) + Math.floor(Math.random() * 15);
        const discountedPrice = Math.floor(basePrice * (100 - discountPercent) / 100);
        
        offers.push({
          restaurant: restaurant._id,
          platform: platform.name,
          platformDisplayName: platform.displayName,
          offerType: 'percentage',
          discount: {
            value: discountPercent,
            maxDiscount: Math.floor(basePrice * 0.5),
            minOrderValue: Math.floor(basePrice * 0.5)
          },
          originalPrice: basePrice,
          discountedPrice: discountedPrice,
          title: `${discountPercent}% OFF on Total Bill`,
          description: `Get ${discountPercent}% discount on your total bill. Valid for dine-in only.`,
          terms: [
            'Valid for dine-in only',
            'Cannot be combined with other offers',
            'Prior reservation required',
            'Valid on all days'
          ],
          validFrom: new Date(),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          daysAvailable: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          timeSlots: [
            { start: '12:00', end: '15:00' },
            { start: '19:00', end: '23:00' }
          ],
          maxRedemptions: 100,
          currentRedemptions: Math.floor(Math.random() * 20),
          platformUrl: `${platform.baseUrl}/restaurant/${restaurant.slug}`,
          platformColor: platform.color,
          isActive: true,
          priority: Math.floor(Math.random() * 10)
        });
      });
    });

    await Offer.insertMany(offers);
    console.log('Offers seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();