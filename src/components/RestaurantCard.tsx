import React from 'react';
import { Star, Clock, MapPin, Tag } from 'lucide-react';
import { useTrackOfferClick } from '../hooks/useOffers';

interface Offer {
  _id?: string;
  platform: string;
  platformDisplayName?: string;
  discount: string;
  originalPrice: string;
  discountedPrice: string;
  color: string;
  platformColor?: string;
  isBest?: boolean;
  title?: string;
  terms?: string[];
}

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  rating: number;
  location: string;
  type: string;
  image: string;
  offers: Offer[];
  onViewOffers?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  cuisine,
  rating,
  location,
  type,
  image,
  offers,
  onViewOffers
}) => {
  const trackOfferClick = useTrackOfferClick();

  // Sort offers by discounted price (ascending order)
  const sortedOffers = [...offers].sort((a, b) => {
    const priceA = parseInt(a.discountedPrice.replace('₹', '').replace(',', ''));
    const priceB = parseInt(b.discountedPrice.replace('₹', '').replace(',', ''));
    return priceA - priceB;
  });
  
  // Mark the cheapest offer as best
  const offersWithBest = sortedOffers.map((offer, index) => ({
    ...offer,
    isBest: index === 0
  }));
  
  const bestOffer = offersWithBest[0];
  
  const handleProviderClick = (offer: Offer) => {
    if (offer._id) {
      trackOfferClick.mutate(offer._id);
    } else {
      // Fallback for static data
      const urls = {
        'Zomato': 'https://www.zomato.com',
        'Swiggy Dineout': 'https://www.dineout.co.in',
        'EazyDiner': 'https://www.eazydiner.com',
        'Magicpin': 'https://www.magicpin.in'
      };
      
      const url = urls[offer.platform as keyof typeof urls] || urls[offer.platformDisplayName as keyof typeof urls];
      if (url) {
        window.open(url, '_blank');
      }
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'bg-orange-100 text-orange-800';
      case 'restopub': return 'bg-purple-100 text-purple-800';
      case 'restobar': return 'bg-red-100 text-red-800';
      case 'bar': return 'bg-amber-100 text-amber-800';
      case 'cafe': return 'bg-brown-100 text-brown-800';
      case 'fine-dining': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {bestOffer && (
          <div className="absolute top-4 left-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Best Price
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center gap-1">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{rating}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(type)}`}>
            {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
          </div>
          <div className="flex items-center gap-1">
            <Tag size={16} />
            <span className="text-sm">{cuisine}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <div className="space-y-3">
          {offersWithBest.map((offer, index) => (
            <div key={index} className={`border rounded-xl p-4 ${offer.isBest ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <div className={`text-sm font-semibold px-2 py-1 rounded text-white`} style={{ backgroundColor: offer.color }}>
                  {offer.platformDisplayName || offer.platform}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 line-through">{offer.originalPrice}</div>
                  <div className="text-lg font-bold text-gray-900">{offer.discountedPrice}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-semibold">{offer.discount}</span>
                <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  offer.isBest 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
                onClick={() => handleProviderClick(offer.platform)}>
                  onClick={() => handleProviderClick(offer)}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {onViewOffers && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button 
              onClick={onViewOffers}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold transition-colors"
            >
              View All Offers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;