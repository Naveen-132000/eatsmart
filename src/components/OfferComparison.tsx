import React from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';

const OfferComparison: React.FC = () => {
  const navigate = useNavigate();

  const restaurants = [
    {
      name: "The Spice Route",
      cuisine: "Indian Restaurant",
      rating: 4.3,
      location: "Koramangala, Bangalore",
      type: "restaurant",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      offers: [
        { platform: "Zomato", discount: "40% OFF", originalPrice: "₹1200", discountedPrice: "₹720", color: "#E23744", isBest: true },
        { platform: "Swiggy Dineout", discount: "30% OFF", originalPrice: "₹1200", discountedPrice: "₹840", color: "#FC8019" },
        { platform: "EazyDiner", discount: "25% OFF", originalPrice: "₹1200", discountedPrice: "₹900", color: "#8B5CF6" },
        { platform: "Magicpin", discount: "35% OFF", originalPrice: "₹1200", discountedPrice: "₹780", color: "#10B981" }
      ]
    },
    {
      name: "The Brew House",
      cuisine: "Restopub",
      rating: 4.5,
      location: "Indiranagar, Bangalore",
      type: "restopub",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      offers: [
        { platform: "Swiggy Dineout", discount: "50% OFF", originalPrice: "₹1800", discountedPrice: "₹900", color: "#FC8019", isBest: true },
        { platform: "Zomato", discount: "30% OFF", originalPrice: "₹1800", discountedPrice: "₹1260", color: "#E23744" },
        { platform: "EazyDiner", discount: "40% OFF", originalPrice: "₹1800", discountedPrice: "₹1080", color: "#8B5CF6" }
      ]
    },
    {
      name: "Skybar Lounge",
      cuisine: "Restobar",
      rating: 4.4,
      location: "UB City Mall, Bangalore",
      type: "restobar",
      image: "https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      offers: [
        { platform: "EazyDiner", discount: "45% OFF", originalPrice: "₹2200", discountedPrice: "₹1210", color: "#8B5CF6", isBest: true },
        { platform: "Zomato", discount: "35% OFF", originalPrice: "₹2200", discountedPrice: "₹1430", color: "#E23744" },
        { platform: "Magicpin", discount: "40% OFF", originalPrice: "₹2200", discountedPrice: "₹1320", color: "#10B981" }
      ]
    },
    {
      name: "The Whiskey Bar",
      cuisine: "Premium Bar",
      rating: 4.2,
      location: "Brigade Road, Bangalore",
      type: "bar",
      image: "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      offers: [
        { platform: "Magicpin", discount: "55% OFF", originalPrice: "₹3000", discountedPrice: "₹1350", color: "#10B981", isBest: true },
        { platform: "Swiggy Dineout", discount: "40% OFF", originalPrice: "₹3000", discountedPrice: "₹1800", color: "#FC8019" },
        { platform: "EazyDiner", discount: "35% OFF", originalPrice: "₹3000", discountedPrice: "₹1950", color: "#8B5CF6" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Compare & Save on Every Meal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See all dining offers from top platforms in one place. Find the best deal instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="animate-fade-in">
              <RestaurantCard 
                {...restaurant} 
                onViewOffers={() => navigate('/restaurants')}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/restaurants')}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
          >
            View All Restaurants
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfferComparison;