import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, LogOut, Heart, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './auth/AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                EatSmart<span className="text-green-500">.live</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/restaurants" 
                className={`transition-colors ${location.pathname === '/restaurants' ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500'}`}
              >
                Restaurants
              </Link>
              <Link 
                to="/categories" 
                className={`transition-colors ${location.pathname === '/categories' ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500'}`}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors ${location.pathname === '/about' ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500'}`}
              >
                About
              </Link>
              <Link 
                to="/blog" 
                className={`transition-colors ${location.pathname === '/blog' ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500'}`}
              >
                Blog
              </Link>
              
              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-500 transition-colors"
                  >
                    <User size={20} />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                      <div className="px-4 py-2 border-b">
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                        {user?.totalSavings && (
                          <p className="text-sm text-green-600">Saved: ₹{user.totalSavings}</p>
                        )}
                      </div>
                      <Link
                        to="/favorites"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart size={16} className="mr-2" />
                        Favorites
                      </Link>
                      <Link
                        to="/bookings"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <BookOpen size={16} className="mr-2" />
                        My Bookings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-700 hover:text-green-500 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-500"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <Link 
                  to="/restaurants" 
                  className={`block px-3 py-2 transition-colors ${location.pathname === '/restaurants' ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Restaurants
                </Link>
                <Link 
                  to="/categories" 
                  className={`block px-3 py-2 transition-colors ${location.pathname === '/categories' ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  to="/about" 
                  className={`block px-3 py-2 transition-colors ${location.pathname === '/about' ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/blog" 
                  className={`block px-3 py-2 transition-colors ${location.pathname === '/blog' ? 'text-green-500 font-semibold' : 'text-gray-700 hover:text-green-500'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                
                {/* Mobile Auth */}
                {isAuthenticated ? (
                  <div className="border-t pt-2">
                    <div className="px-3 py-2">
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      to="/favorites"
                      className="block px-3 py-2 text-gray-700 hover:text-green-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Favorites
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-3 py-2 text-gray-700 hover:text-green-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-500"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="border-t pt-2 space-y-2">
                    <button
                      onClick={() => {
                        handleAuthClick('login');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-500"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        handleAuthClick('register');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 bg-green-500 text-white rounded-lg mx-3"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;