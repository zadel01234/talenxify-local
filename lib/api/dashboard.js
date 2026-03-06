import { apiFetch } from "./http";

/**
 * Dashboard API
 * All endpoints that require authentication for the dashboard
 */
export const dashboardApi = {
    // ==========================================
    // GIGS (Freelance/Short-term work)
    // ==========================================

    /**
     * Get all gig postings
     * @param {Object} filters - Optional filters
     * @returns {Promise<Array>} List of gig postings
     */
    async getGigs(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/gig-postings/?${queryParams}` : `/gig-postings/`;
        return apiFetch(endpoint, { auth: true });
    },

    /**
     * Get a single gig by ID
     * @param {string} id - Gig ID (UUID)
     * @returns {Promise<Object>} Gig posting details
     */
    async getGigById(id) {
        return apiFetch(`/gig-postings/${id}/`, { auth: true });
    },

    // ==========================================
    // JOBS (Full-time/Part-time positions)
    // ==========================================

    /**
     * Get all job postings
     * @param {Object} filters - Optional filters
     * @returns {Promise<Array>} List of job postings
     */
    async getJobs(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/job-postings/?${queryParams}` : `/job-postings/`;
        return apiFetch(endpoint, { auth: true });
    },

    /**
     * Get a single job by ID
     * @param {string} id - Job ID (UUID)
     * @returns {Promise<Object>} Job posting details
     */
    async getJobById(id) {
        return apiFetch(`/job-postings/${id}/`, { auth: true });
    },

    // ==========================================
    // FOR RECRUITERS - Job/Gig Posting Management
    // ==========================================

    /**
     * Create a new job or gig posting (Recruiters only)
     * @param {Object} payload - Job/Gig data
     * @returns {Promise<Object>} Created job/gig posting
     */
    async createJobPosting(payload) {
        return apiFetch("/job-postings/create/", {
            method: "POST",
            body: payload,
            auth: true,
        });
    },

    /**
     * Get all job postings created by the authenticated recruiter
     * @returns {Promise<Array>} List of recruiter's job postings
     */
    async getMyJobPostings() {
        return apiFetch("/job-postings/my-postings/", { auth: true });
    },

    /**
     * Update a job posting (Owner only)
     * @param {string} id - Job posting ID (UUID)
     * @param {Object} payload - Fields to update
     * @returns {Promise<Object>} Updated job posting
     */
    async updateJobPosting(id, payload) {
        return apiFetch(`/job-postings/${id}/update/`, {
            method: "PATCH",
            body: payload,
            auth: true,
        });
    },

    /**
     * Soft delete a job posting
     * @param {string} id - Job posting ID (UUID)
     * @returns {Promise<void>}
     */
    async deleteJobPosting(id) {
        return apiFetch(`/job-postings/${id}/delete/`, {
            method: "DELETE",
            auth: true,
        });
    },

    // ==========================================
    // USER PROFILE
    // ==========================================

    async getProfile() {
        return apiFetch("/account/profile/", { auth: true });
    },

    async updateProfile(payload) {
        return apiFetch("/account/profile/", {
            method: "PATCH",
            body: payload,
            auth: true,
        });
    },

    async uploadProfilePhoto(file) {
        const formData = new FormData();
        formData.append("photo", file);

        return apiFetch("/account/profile/photo/", {
            method: "POST",
            body: formData,
            auth: true,
            headers: {
                "Content-Type": undefined,
            },
        });
    },

    async getSettings() {
        return apiFetch("/account/settings/", { auth: true });
    },

    async updateSettings(payload) {
        return apiFetch("/account/settings/", {
            method: "PATCH",
            body: payload,
            auth: true,
        });
    },

    // ==========================================
    // APPLICATIONS
    // ==========================================

    async getApplications(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/applications/?${queryParams}` : `/applications/`;
        return apiFetch(endpoint, { auth: true });
    },

    async getApplicationById(id) {
        return apiFetch(`/applications/${id}/`, { auth: true });
    },

    async createApplication(payload) {
        return apiFetch("/applications/", {
            method: "POST",
            body: payload,
            auth: true,
        });
    },

    async updateApplication(id, payload) {
        return apiFetch(`/applications/${id}/`, {
            method: "PATCH",
            body: payload,
            auth: true,
        });
    },

    async withdrawApplication(id) {
        return apiFetch(`/applications/${id}/withdraw/`, {
            method: "POST",
            auth: true,
        });
    },

    // ==========================================
    // MESSAGES
    // ==========================================

    async getMessages() {
        return apiFetch("/messages/", { auth: true });
    },

    async getConversation(conversationId) {
        return apiFetch(`/messages/${conversationId}/`, { auth: true });
    },

    async sendMessage(payload) {
        return apiFetch("/messages/", {
            method: "POST",
            body: payload,
            auth: true,
        });
    },

    async markAsRead(conversationId) {
        return apiFetch(`/messages/${conversationId}/read/`, {
            method: "POST",
            auth: true,
        });
    },

    async deleteConversation(conversationId) {
        return apiFetch(`/messages/${conversationId}/`, {
            method: "DELETE",
            auth: true,
        });
    },

    // ==========================================
    // PAYMENTS
    // ==========================================

    async getPayments(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/payments/?${queryParams}` : `/payments/`;
        return apiFetch(endpoint, { auth: true });
    },

    async getPaymentById(id) {
        return apiFetch(`/payments/${id}/`, { auth: true });
    },

    async createPayment(payload) {
        return apiFetch("/payments/", {
            method: "POST",
            body: payload,
            auth: true,
        });
    },

    async getWallet() {
        return apiFetch("/payments/wallet/", { auth: true });
    },

    async withdrawFunds(payload) {
        return apiFetch("/payments/withdraw/", {
            method: "POST",
            body: payload,
            auth: true,
        });
    },

    // ==========================================
    // PORTFOLIO
    // ==========================================

    async getPortfolio() {
        return apiFetch("/portfolio/", { auth: true });
    },

    async getPortfolioItem(id) {
        return apiFetch(`/portfolio/${id}/`, { auth: true });
    },

    async createPortfolioItem(payload) {
        return apiFetch("/portfolio/", {
            method: "POST",
            body: payload,
            auth: true,
        });
    },

    async updatePortfolioItem(id, payload) {
        return apiFetch(`/portfolio/${id}/`, {
            method: "PATCH",
            body: payload,
            auth: true,
        });
    },

    async deletePortfolioItem(id) {
        return apiFetch(`/portfolio/${id}/`, {
            method: "DELETE",
            auth: true,
        });
    },

    async uploadPortfolioFiles(id, files) {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        return apiFetch(`/portfolio/${id}/upload/`, {
            method: "POST",
            body: formData,
            auth: true,
            headers: {
                "Content-Type": undefined,
            },
        });
    },

    // ==========================================
    // RESUME / CV
    // ==========================================

    async getResume() {
        return apiFetch("/account/resume/", { auth: true });
    },

    async updateResume(payload) {
        return apiFetch("/account/resume/", {
            method: "PATCH",
            body: payload,
            auth: true,
        });
    },

    async uploadResume(file) {
        const formData = new FormData();
        formData.append("resume", file);

        return apiFetch("/account/resume/upload/", {
            method: "POST",
            body: formData,
            auth: true,
            headers: {
                "Content-Type": undefined,
            },
        });
    },

    // ==========================================
    // SUPPORT / TICKETS
    // ==========================================

    async getSupportTickets(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/support/?${queryParams}` : `/support/`;
        return apiFetch(endpoint, { auth: true });
    },

    async getSupportTicket(id) {
        return apiFetch(`/support/${id}/`, { auth: true });
    },

    async createSupportTicket(payload) {
        return apiFetch("/support/", {
            method: "POST",
            body: payload,
            auth: true,
        });
    },

    async replySupportTicket(id, payload) {
        return apiFetch(`/support/${id}/reply/`, {
            method: "POST",
            body: payload,
            auth: true,
        });
    },

    async closeSupportTicket(id) {
        return apiFetch(`/support/${id}/close/`, {
            method: "POST",
            auth: true,
        });
    },

    // ==========================================
    // NOTIFICATIONS
    // ==========================================

    async getNotifications(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/notifications/?${queryParams}` : `/notifications/`;
        return apiFetch(endpoint, { auth: true });
    },

    async markNotificationAsRead(id) {
        return apiFetch(`/notifications/${id}/read/`, {
            method: "POST",
            auth: true,
        });
    },

    async markAllNotificationsAsRead() {
        return apiFetch("/notifications/read-all/", {
            method: "POST",
            auth: true,
        });
    },

    async deleteNotification(id) {
        return apiFetch(`/notifications/${id}/`, {
            method: "DELETE",
            auth: true,
        });
    },

    // ==========================================
    // ANALYTICS / STATS
    // ==========================================

    async getDashboardStats(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/stats/dashboard/?${queryParams}` : `/stats/dashboard/`;
        return apiFetch(endpoint, { auth: true });
    },

    async getGigAnalytics(gigId) {
        return apiFetch(`/stats/gigs/${gigId}/`, { auth: true });
    },

    async getEarningsReport(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `/stats/earnings/?${queryParams}` : `/stats/earnings/`;
        return apiFetch(endpoint, { auth: true });
    },

    // ==========================================
    // ORGANIZATION (For Recruiters)
    // ==========================================

    async getOrganization() {
        return apiFetch("/organization/", { auth: true });
    },

    async updateOrganization(payload) {
        return apiFetch("/organization/", {
            method: "PATCH",
            body: payload,
            auth: true,
        });
    },

    async uploadOrganizationLogo(file) {
        const formData = new FormData();
        formData.append("logo", file);

        return apiFetch("/organization/logo/", {
            method: "POST",
            body: formData,
            auth: true,
            headers: {
                "Content-Type": undefined,
            },
        });
    },
};