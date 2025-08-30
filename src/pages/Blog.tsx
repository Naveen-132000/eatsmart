import React from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Restaurants in Koramangala with Best Offers",
      excerpt: "Discover the most popular dining spots in Koramangala and how to get the best deals on your favorite meals.",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Priya Sharma",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "Restaurant Guide"
    },
    {
      id: 2,
      title: "How to Save 50% on Your Next Dining Experience",
      excerpt: "Learn the insider tips and tricks to maximize your savings when dining out in Bangalore using multiple platforms.",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Rajesh Kumar",
      date: "January 12, 2025",
      readTime: "7 min read",
      category: "Money Saving Tips"
    },
    {
      id: 3,
      title: "Best Restopubs in Indiranagar for Weekend Fun",
      excerpt: "Your ultimate guide to the coolest restopubs in Indiranagar where you can enjoy great food and drinks.",
      image: "https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Arjun Patel",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Nightlife"
    },
    {
      id: 4,
      title: "Fine Dining on a Budget: Luxury for Less",
      excerpt: "Experience premium dining without the premium price tag. Here's how to enjoy fine dining affordably.",
      image: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Sneha Gupta",
      date: "January 8, 2025",
      readTime: "8 min read",
      category: "Fine Dining"
    },
    {
      id: 5,
      title: "Coffee Culture in Bangalore: Best Cafes to Work From",
      excerpt: "Remote workers and coffee lovers, this one's for you! Discover the best cafes in Bangalore for productivity.",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Vikram Singh",
      date: "January 5, 2025",
      readTime: "4 min read",
      category: "Cafe Culture"
    },
    {
      id: 6,
      title: "Weekend Bar Hopping Guide: Brigade Road Edition",
      excerpt: "Plan your perfect weekend bar crawl through Brigade Road with our comprehensive guide and money-saving tips.",
      image: "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      author: "Meera Reddy",
      date: "January 3, 2025",
      readTime: "9 min read",
      category: "Bar Guide"
    }
  ];

  const categories = [
    "All Posts",
    "Restaurant Guide",
    "Money Saving Tips",
    "Nightlife",
    "Fine Dining",
    "Cafe Culture",
    "Bar Guide"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              EatSmart Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your guide to smart dining in Bangalore. Tips, reviews, and insider secrets to make every meal memorable and affordable.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-4 space-x-6">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative">
              <img 
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-64 lg:h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8 lg:p-12">
              <div className="mb-4">
                <span className="text-green-500 font-semibold text-sm">{blogPosts[0].category}</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="relative">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors">
            Load More Posts
          </button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-green-500 to-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with EatSmart
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get the latest dining tips, restaurant reviews, and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;