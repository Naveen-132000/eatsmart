import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Restaurants API
export const restaurantsAPI = {
  getAll: (params?: any) => api.get('/restaurants', { params }),
  getBySlug: (slug: string) => api.get(`/restaurants/${slug}`),
  addToFavorites: (id: string) => api.post(`/restaurants/${id}/favorite`),
};

// Offers API
export const offersAPI = {
  getByRestaurant: (restaurantId: string, params?: any) => 
    api.get(`/offers/restaurant/${restaurantId}`, { params }),
  getBest: (params?: any) => api.get('/offers/best', { params }),
  trackClick: (offerId: string) => api.post(`/offers/${offerId}/click`),
};

// Users API
export const usersAPI = {
  getFavorites: () => api.get('/users/favorites'),
  getBookings: () => api.get('/users/bookings'),
  addBooking: (bookingData: any) => api.post('/users/bookings', bookingData),
  getReviews: () => api.get('/users/reviews'),
  getStats: () => api.get('/users/stats'),
};

// Reviews API
export const reviewsAPI = {
  getByRestaurant: (restaurantId: string, params?: any) => 
    api.get(`/reviews/restaurant/${restaurantId}`, { params }),
  create: (reviewData: any) => api.post('/reviews', reviewData),
  like: (reviewId: string) => api.post(`/reviews/${reviewId}/like`),
};

export default api;