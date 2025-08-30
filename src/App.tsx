import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Categories from './pages/Categories';
import About from './pages/About';
import Blog from './pages/Blog';
import Footer from './components/Footer';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
            <Footer />
          </div>
        </Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;