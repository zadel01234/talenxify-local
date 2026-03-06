// API Service Layer
// Centralized data fetching with easy API integration

import {
    mockUser,
    mockWallet,
    mockStats,
    mockProfileCompletion,
    mockApplications,
} from '@/data/mockData';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper function to simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Generic fetch wrapper for API calls
async function apiRequest(endpoint, options = {}) {
    // TODO: API INTEGRATION - Replace with actual API calls
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${getToken()}`,
    //     ...options.headers,
    //   },
    //   ...options,
    // });
    // 
    // if (!response.ok) {
    //   throw new Error(`API Error: ${response.status}`);
    // }
    // 
    // return response.json();

    // For now, return mock data
    await delay();
    return null;
}

// User API
export const userApi = {
    // Get current user data
    getUser: async () => {
        // TODO: API INTEGRATION
        // return apiRequest('/user');
        await delay();
        return mockUser;
    },

    // Update user profile
    updateUser: async (data) => {
        // TODO: API INTEGRATION
        // return apiRequest('/user', {
        //   method: 'PUT',
        //   body: JSON.stringify(data),
        // });
        await delay();
        return { success: true, data };
    },
};

// Wallet API
export const walletApi = {
    // Get wallet balance
    getWallet: async () => {
        // TODO: API INTEGRATION
        // return apiRequest('/wallet');
        await delay();
        return mockWallet;
    },

    // Initiate withdrawal
    withdraw: async (amount) => {
        // TODO: API INTEGRATION
        // return apiRequest('/wallet/withdraw', {
        //   method: 'POST',
        //   body: JSON.stringify({ amount }),
        // });
        await delay();
        return {
            success: true,
            transactionId: `TXN${Date.now()}`,
            amount,
        };
    },
};

// Applications API
export const applicationsApi = {
    // Get application statistics
    getStats: async () => {
        // TODO: API INTEGRATION
        // return apiRequest('/applications/stats');
        await delay();
        return mockStats;
    },

    // Get all applications
    getApplications: async () => {
        // TODO: API INTEGRATION
        // return apiRequest('/applications');
        await delay();
        return mockApplications;
    },

    // Get single application details
    getApplication: async (id) => {
        // TODO: API INTEGRATION
        // return apiRequest(`/applications/${id}`);
        await delay();
        return mockApplications.find(app => app.id === id);
    },
};

// Profile API
export const profileApi = {
    // Get profile completion status
    getProfileCompletion: async () => {
        // TODO: API INTEGRATION
        // return apiRequest('/profile/completion');
        await delay();
        return mockProfileCompletion;
    },

    // Update profile field
    updateProfileField: async (field, value) => {
        // TODO: API INTEGRATION
        // return apiRequest('/profile/field', {
        //   method: 'PUT',
        //   body: JSON.stringify({ field, value }),
        // });
        await delay();
        return { success: true, field, value };
    },
};