import React from 'react';
import { Coffee, Pizza, UtensilsCrossed, Crown, Salad, Globe, Wine, Beer, Utensils } from 'lucide-react';

const Categories: React.FC = () => {
  const categories = [
    { name: 'Restaurants', icon: Utensils, color: 'from-orange-400 to-red-500', count: '25,500+', type: 'restaurant' },
    { name: 'Restopubs', icon: UtensilsCrossed, color: 'from-purple-400 to-pink-500', count: '8,200+', type: 'restopub' },
    { name: 'Restobars', icon: Wine, color: 'from-red-400 to-purple-500', count: '6,800+', type: 'restobar' },
    { name: 'Bars', icon: Beer, color: 'from-amber-400 to-orange-500', count: '4,500+', type: 'bar' },
    { name: 'Cafes', icon: Coffee, color: 'from-brown-400 to-yellow-600', count: '12,300+', type: 'cafe' },
    { name: 'Fine Dining', icon: Crown, color: 'from-blue-400 to-purple-500', count: '2,100+', type: 'fine-dining' }
  ];

  const handleCategoryClick = (categoryType: string) => {
    // This would typically trigger a search with category filter
    console.log('Searching for category:', categoryType);
    // You can implement navigation to search results with category filter
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore All Dining Options
          </h2>
          <p className="text-xl text-gray-600">
            From casual dining to premium bars - discover the perfect spot for every occasion
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleCategoryClick(category.type)}
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-shadow`}>
                  <div className="mb-4 flex justify-center">
                    <IconComponent size={48} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.count} venues</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            All venues are filtered based on your location in Bangalore for the best nearby options
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">📍 Bangalore locations</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">🍽️ Real-time offers</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">💰 Best price guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;