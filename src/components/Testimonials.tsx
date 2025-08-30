import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Whitefield, Bangalore",
      text: "Saved 30% on my dinner last night with EatSmart! Found the best deal across all platforms in seconds.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Arjun Patel",
      location: "HSR Layout, Bangalore",
      text: "As a foodie, I love trying new places. EatSmart helps me discover restaurants with the best offers!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Sneha Gupta",
      location: "Jayanagar, Bangalore",
      text: "No more downloading multiple apps. EatSmart is my one-stop solution for dining deals.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of happy diners saving money every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="mb-6">
                <Quote size={32} className="text-green-500 opacity-50" />
              </div>
              
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex -space-x-2 mr-4">
              {testimonials.map((testimonial, index) => (
                <img 
                  key={index}
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                +5K
              </div>
            </div>
            <span className="text-gray-700 font-semibold">Trusted by 5,000+ happy diners</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;