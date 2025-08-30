import React from 'react';
import { Clock, DollarSign, Brain } from 'lucide-react';

const WhyEatSmart: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'All offers in one place. No more jumping between apps to compare deals.',
      color: 'bg-blue-500'
    },
    {
      icon: DollarSign,
      title: 'Save Money',
      description: 'Compare across platforms and always get the best price for your favorite venues.',
      color: 'bg-green-500'
    },
    {
      icon: Brain,
      title: 'Eat Smart',
      description: 'Make informed decisions with real-time pricing and authentic reviews for all dining options.',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose EatSmart?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just another food app. We're your smart dining companion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className={`${benefit.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform`}>
                  <IconComponent size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-orange-500 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Saving?
            </h3>
            <p className="text-white/90 text-lg mb-6">
              Join thousands of smart diners who save money on every meal
            </p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
              Start Comparing Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyEatSmart;