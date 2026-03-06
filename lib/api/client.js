// lib/api/client.js
// API client with authentication support

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    // Get auth token - Updated to match your tokenStorage
    getAuthToken() {
        // For development: Use token from environment variable
        if (process.env.NEXT_PUBLIC_AUTH_TOKEN) {
            return process.env.NEXT_PUBLIC_AUTH_TOKEN;
        }

        if (typeof window !== 'undefined') {
            // Match the key used by tokenStorage.setTokens()
            // Check what key your tokenStorage uses - likely 'access_token'
            return localStorage.getItem('access_token') ||
                localStorage.getItem('token') ||
                localStorage.getItem('authToken');
        }
        return null;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        // Get auth token
        const token = this.getAuthToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                // Add Authorization header if token exists
                ...(token && {
                    'Authorization': `Bearer ${token}`,
                }),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            // Handle 401 Unauthorized - Token expired or invalid
            if (response.status === 401) {
                console.error('Unauthorized: Token expired or invalid');

                // Try to refresh token
                const refreshed = await this.tryRefreshToken();
                if (refreshed) {
                    // Retry the original request with new token
                    return this.request(endpoint, options);
                }

                // If refresh failed, clear tokens and redirect to login
                this.clearAuthToken();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }

                throw new Error('Unauthorized - Please login again');
            }

            // Handle 404 Not Found
            if (response.status === 404) {
                throw new Error(`Endpoint not found: ${endpoint}`);
            }

            if (!response.ok) {
                // Try to get error message from response
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.message || errorData.detail || errorData.error;
                throw new Error(
                    errorMessage || `API Error: ${response.status} ${response.statusText}`
                );
            }

            // Handle 204 No Content
            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Try to refresh the access token using refresh token
    async tryRefreshToken() {
        if (typeof window === 'undefined') return false;

        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return false;

        try {
            const response = await fetch(`${this.baseURL}/auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) return false;

            const data = await response.json();
            if (data.access) {
                localStorage.setItem('access_token', data.access);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return false;
        }
    }

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async patch(endpoint, data) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // Helper: Set auth token (call this after login)
    setAuthToken(token, refreshToken = null) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', token);
            if (refreshToken) {
                localStorage.setItem('refresh_token', refreshToken);
            }
        }
    }

    // Helper: Clear auth token (call this on logout)
    clearAuthToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

    // Helper: Get current user
    getCurrentUser() {
        if (typeof window !== 'undefined') {
            const userJson = localStorage.getItem('user');
            if (userJson) {
                try {
                    return JSON.parse(userJson);
                } catch (error) {
                    console.error('Failed to parse user data:', error);
                    return null;
                }
            }
        }
        return null;
    }

    // Helper: Check if user is authenticated
    isAuthenticated() {
        return !!this.getAuthToken();
    }
}

export const apiClient = new ApiClient(API_BASE_URL);