import React from 'react';
import { Coffee, Pizza, UtensilsCrossed, Crown, Salad, Globe, Wine, Beer, Utensils, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'Restaurants', 
      icon: Utensils, 
      color: 'from-orange-400 to-red-500', 
      count: '25,500+', 
      type: 'restaurant',
      description: 'Traditional dining establishments offering diverse cuisines',
      areas: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield']
    },
    { 
      name: 'Restopubs', 
      icon: UtensilsCrossed, 
      color: 'from-purple-400 to-pink-500', 
      count: '8,200+', 
      type: 'restopub',
      description: 'Perfect blend of restaurant and pub experience',
      areas: ['Brigade Road', 'MG Road', 'Koramangala', 'Indiranagar']
    },
    { 
      name: 'Restobars', 
      icon: Wine, 
      color: 'from-red-400 to-purple-500', 
      count: '6,800+', 
      type: 'restobar',
      description: 'Upscale dining with premium bar experience',
      areas: ['UB City Mall', 'Brigade Road', 'Lavelle Road', 'Richmond Road']
    },
    { 
      name: 'Bars', 
      icon: Beer, 
      color: 'from-amber-400 to-orange-500', 
      count: '4,500+', 
      type: 'bar',
      description: 'Premium bars and lounges for drinks and socializing',
      areas: ['Brigade Road', 'MG Road', 'Church Street', 'Indiranagar']
    },
    { 
      name: 'Cafes', 
      icon: Coffee, 
      color: 'from-brown-400 to-yellow-600', 
      count: '12,300+', 
      type: 'cafe',
      description: 'Cozy coffee shops and casual dining spots',
      areas: ['Jayanagar', 'HSR Layout', 'Koramangala', 'Whitefield']
    },
    { 
      name: 'Fine Dining', 
      icon: Crown, 
      color: 'from-blue-400 to-purple-500', 
      count: '2,100+', 
      type: 'fine-dining',
      description: 'Luxury dining experiences with premium service',
      areas: ['UB City Mall', 'Lavelle Road', 'Richmond Road', 'Whitefield']
    }
  ];

  const handleCategoryClick = (categoryType: string) => {
    navigate(`/restaurants?category=${categoryType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Dining Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From casual cafes to premium fine dining - discover the perfect spot for every occasion in Bangalore
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleCategoryClick(category.type)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className={`bg-gradient-to-br ${category.color} p-8 text-white text-center`}>
                    <div className="mb-4 flex justify-center">
                      <IconComponent size={64} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-bold text-2xl mb-2">{category.name}</h3>
                    <p className="text-lg opacity-90">{category.count} venues</p>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <MapPin size={16} />
                        Popular Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.areas.map((area, areaIndex) => (
                          <span 
                            key={areaIndex}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors">
                      Explore {category.name}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-orange-500 rounded-2xl p-8 max-w-4xl mx-auto text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Can't Decide? Explore All Options
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Browse through all restaurants and find the perfect match for your mood
            </p>
            <button 
              onClick={() => navigate('/restaurants')}
              className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              View All Restaurants
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;