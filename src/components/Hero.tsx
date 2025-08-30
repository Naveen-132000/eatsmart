import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setLocationError('');

    try {
      // Request location access
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 300000 
          }
        );
      });

      const { latitude, longitude } = position.coords;
      
      // Here you would typically make an API call to search restaurants
      // with the search query and location coordinates
      console.log('Searching for:', searchQuery);
      console.log('Location:', { latitude, longitude });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to results or update state with results
      alert(`Searching for "${searchQuery}" near your location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
      
    } catch (error) {
      console.error('Location error:', error);
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location services to find nearby restaurants.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable. Please try again.');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError('An error occurred while getting your location.');
            break;
        }
      } else {
        setLocationError('Location services are not supported by your browser.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-600/70 z-10"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Compare Dine-Out Offers.
          <br />
          <span className="text-green-400">Save Every Meal.</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Find the best dining deals across all platforms. Smart choices, delicious savings.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Restaurants, Bars, Cafes, or Cuisine"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-4 text-gray-900 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-green-500 focus:outline-none text-lg"
                disabled={isSearching}
              />
            </div>
            <button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Finding...
                </>
              ) : (
                <>
                  <MapPin size={20} />
                  Compare Now
                </>
              )}
            </button>
          </div>
          
          {locationError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm flex items-center gap-2">
                <MapPin size={16} />
                {locationError} Please enable location to find restaurants in Bangalore.
              </p>
            </div>
          )}
          
          {isSearching && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-600 text-sm flex items-center gap-2">
                <MapPin size={16} />
                Please allow location access to find venues near you in Bangalore...
              </p>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">75K+</div>
            <div className="text-sm">Venues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">₹2.5Cr+</div>
            <div className="text-sm">Saved by Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">1M+</div>
            <div className="text-sm">Happy Diners</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;