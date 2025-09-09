// API Configuration
const isProduction = import.meta.env.PROD || 
                    window.location.hostname !== 'localhost' || 
                    window.location.hostname.includes('vercel.app');

const API_BASE_URL = isProduction
  ? 'blackjack-backend-jzt6.onrender.com'
  : 'http://localhost:5001';

// Debug logging
console.log('Environment Debug:', {
  PROD: import.meta.env.PROD,
  hostname: window.location.hostname,
  isProduction,
  API_BASE_URL
});

export const API_ENDPOINTS = {
  comparison: `${API_BASE_URL}/api/comparison`,
  strategies: `${API_BASE_URL}/api/strategies`,
  strategy: (key) => `${API_BASE_URL}/api/strategy/${key}`,
}; 