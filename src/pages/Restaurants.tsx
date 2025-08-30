import React, { useState } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';
import RestaurantCard from '../components/RestaurantCard';

const Restaurants: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price');

  // Build query parameters
  const queryParams = {
    search: searchQuery || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    sortBy,
    page: 1,
    limit: 12
  };

  const { data, isLoading, error } = useRestaurants(queryParams);
  const restaurants = data?.restaurants || [];

  const categories = [
    { value: 'all', label: 'All Venues' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'restopub', label: 'Restopubs' },
    { value: 'restobar', label: 'Restobars' },
    { value: 'bar', label: 'Bars' },
    { value: 'cafe', label: 'Cafes' },
    { value: 'fine-dining', label: 'Fine Dining' }
  ];

  // Transform restaurant data for RestaurantCard component
  const transformedRestaurants = restaurants.map((restaurant: any) => ({
    name: restaurant.name,
    cuisine: restaurant.cuisine.join(', '),
    rating: restaurant.rating.average,
    location: `${restaurant.location.area}, ${restaurant.location.city}`,
    type: restaurant.category,
    image: restaurant.images?.[0]?.url || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    offers: restaurant.offers?.map((offer: any) => ({
      _id: offer._id,
      platform: offer.platform,
      platformDisplayName: offer.platformDisplayName,
      discount: `${offer.discount.value}% OFF`,
      originalPrice: `₹${offer.originalPrice}`,
      discountedPrice: `₹${offer.discountedPrice}`,
      color: offer.platformColor,
      title: offer.title,
      terms: offer.terms
    })) || []
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Restaurants in Bangalore
          </h1>
          <p className="text-gray-600 mb-6">
            Discover the best dining deals across all platforms
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search restaurants, cuisine, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {isLoading ? 'Loading...' : `Showing ${transformedRestaurants.length} restaurants in Bangalore`}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} />
            <span>All locations in Bangalore</span>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading restaurants...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading restaurants</h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        ) : transformedRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {transformedRestaurants.map((restaurant, index) => (
              <div key={index} className="animate-fade-in">
                <RestaurantCard {...restaurant} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;