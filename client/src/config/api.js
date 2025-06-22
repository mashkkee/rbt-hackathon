export const API_CONFIG = {
  BASE_URL: 'http://192.168.0.106:8000',
  ENDPOINTS: {
    CHAT: '/api/chat',
    UPLOAD: '/api/upload',
    UPLOAD_MULTIPLE: '/api/upload/multiple',
    TRAVEL_PACKAGES: '/api/travel-packages',
    HEALTH: '/health'
  }
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};