import React from 'react';
import { Target, Users, Award, Clock, DollarSign, Brain, MapPin, Star } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Happy Diners', value: '1M+', color: 'text-blue-500' },
    { icon: MapPin, label: 'Venues Listed', value: '75K+', color: 'text-green-500' },
    { icon: DollarSign, label: 'Money Saved', value: '₹2.5Cr+', color: 'text-orange-500' },
    { icon: Star, label: 'Average Rating', value: '4.8/5', color: 'text-yellow-500' }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Compare all dining offers in one place. No more jumping between multiple apps to find the best deals.'
    },
    {
      icon: DollarSign,
      title: 'Save Money',
      description: 'Always get the best price with our real-time comparison across all major dining platforms.'
    },
    {
      icon: Brain,
      title: 'Smart Choices',
      description: 'Make informed decisions with authentic reviews, ratings, and comprehensive venue information.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Former tech executive with 15+ years in the food-tech industry'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Restaurant industry veteran with deep knowledge of Bangalore dining scene'
    },
    {
      name: 'Arjun Patel',
      role: 'Head of Technology',
      image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Full-stack developer passionate about creating seamless user experiences'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About EatSmart.live
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing how Bangalore dines by making restaurant discovery and booking smarter, faster, and more affordable.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`${stat.color} mb-4 flex justify-center`}>
                    <IconComponent size={48} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To make dining out in Bangalore more accessible, affordable, and enjoyable for everyone. We believe that great food experiences shouldn't break the bank, and finding the perfect restaurant shouldn't be a hassle.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                By aggregating offers from all major platforms and providing comprehensive venue information, we empower diners to make smart choices that save both time and money.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EatSmart?
            </h2>
            <p className="text-xl text-gray-600">
              We're more than just a comparison platform - we're your smart dining companion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Passionate food lovers and tech experts working to transform dining in Bangalore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-500 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-green-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Smart Dining Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of smart diners in Bangalore who save money on every meal
          </p>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
            Explore Restaurants
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;