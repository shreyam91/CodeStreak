import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If no token is found and the request is not for auth endpoints, redirect to login
      if (!config.url?.includes('/auth/')) {
        window.location.href = '/login';
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('No response from server. Please check your connection.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(new Error('Request failed. Please try again.'));
    }
  }
);

// Types
export interface User {
  _id: string;
  name: string;
  email: string;
  streak: {
    current: number;
    longest: number;
    lastCompleted: string;
  };
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  duration: string;
  priority: 'high' | 'mid' | 'easy';
  completed: boolean;
}

export interface Pomodoro {
  _id: string;
  title: string;
  duration: number;
  completed: boolean;
  startTime: string;
  endTime?: string;
}

// Auth API
export const authApi = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Tasks API
export const tasksApi = {
  create: async (data: Omit<Task, '_id'>) => {
    const response = await api.post('/tasks', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  update: async (id: string, data: Partial<Task>) => {
    const response = await api.patch(`/tasks/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

// Pomodoro API
export const pomodoroApi = {
  start: async (data: { title: string; duration: number }) => {
    const response = await api.post('/pomodoro/start', data);
    return response.data;
  },
  complete: async (id: string) => {
    const response = await api.patch(`/pomodoro/${id}/complete`);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/pomodoro');
    return response.data;
  },
};

// Streak API
export const streakApi = {
  update: async () => {
    const response = await api.post('/streak/update');
    return response.data;
  },
  get: async () => {
    const response = await api.get('/streak');
    return response.data;
  },
};

export default api; 