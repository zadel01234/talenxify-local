import { dashboardApi } from '@/lib/api/dashboard';
import staticGigs from '@/components/dashboard/shared/data';

// Only use static data if explicitly enabled via environment variable
const FORCE_STATIC_DATA = process.env.NEXT_PUBLIC_USE_STATIC_DATA === 'true';

export const gigsService = {
    // GET all gigs - Uses: dashboardApi.getGigs(filters)
    async getGigs(filters = {}) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return staticGigs;
        }

        try {
            const response = await dashboardApi.getGigs(filters);

            if (Array.isArray(response)) return response;
            if (response && Array.isArray(response.results)) return response.results;
            if (response && Array.isArray(response.data)) return response.data;
            if (response && Array.isArray(response.gigs)) return response.gigs;

            return staticGigs;
        } catch (error) {
            return staticGigs;
        }
    },

    // GET single gig by ID - Uses: dashboardApi.getGigById(id)
    async getGigById(id) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 200));
            const gig = staticGigs.find(gig => gig.id === id);
            if (!gig) throw new Error('Gig not found');
            return gig;
        }

        try {
            const response = await dashboardApi.getGigById(id);
            if (response && response.data) return response.data;
            return response;
        } catch (error) {
            const gig = staticGigs.find(gig => gig.id === id);
            if (!gig) throw new Error('Gig not found');
            return gig;
        }
    },

    // GET filtered gigs
    async getFilteredGigs(filters) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            let filtered = [...staticGigs];

            if (filters.category) {
                filtered = filtered.filter(gig => gig.category === filters.category);
            }
            if (filters.experience_level) {
                filtered = filtered.filter(gig => gig.level === filters.experience_level);
            }
            if (filters.location_type) {
                filtered = filtered.filter(gig =>
                    gig.remote === (filters.location_type === 'remote')
                );
            }
            if (filters.search) {
                filtered = filtered.filter(gig =>
                    gig.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                    gig.description.toLowerCase().includes(filters.search.toLowerCase())
                );
            }

            return filtered;
        }

        // API filters are already in the correct format
        const apiFilters = {
            search: filters.search,
            category: filters.category,
            experience_level: filters.experience_level,
            location_type: filters.location_type,
            ordering: filters.ordering,
            page: filters.page,
            page_size: filters.page_size,
        };

        // Remove undefined values
        Object.keys(apiFilters).forEach(key => {
            if (apiFilters[key] === undefined) {
                delete apiFilters[key];
            }
        });

        try {
            const response = await dashboardApi.getGigs(apiFilters);
            if (Array.isArray(response)) return response;
            if (response?.results) return response.results;
            if (response?.data) return response.data;
            return response;
        } catch (error) {
            return [];
        }
    },

    // POST create new gig - Uses: dashboardApi.createJobPosting(data)
    async createGig(data) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 400));
            const newGig = { id: Date.now().toString(), ...data };
            staticGigs.push(newGig);
            return newGig;
        }

        try {
            const gigData = {
                ...data,
                job_or_gig: 'gig',
            };

            const response = await dashboardApi.createJobPosting(gigData);
            if (response?.data) return response.data;
            return response;
        } catch (error) {
            throw error;
        }
    },

    // PATCH update gig - Uses: dashboardApi.updateJobPosting(id, data)
    async updateGig(id, data) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 400));
            const index = staticGigs.findIndex(gig => gig.id === id);
            if (index === -1) throw new Error('Gig not found');
            staticGigs[index] = { ...staticGigs[index], ...data };
            return staticGigs[index];
        }

        try {
            const response = await dashboardApi.updateJobPosting(id, data);
            if (response?.data) return response.data;
            return response;
        } catch (error) {
            throw error;
        }
    },

    // DELETE gig - Uses: dashboardApi.deleteJobPosting(id)
    async deleteGig(id) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const index = staticGigs.findIndex(gig => gig.id === id);
            if (index === -1) throw new Error('Gig not found');
            staticGigs.splice(index, 1);
            return;
        }

        try {
            await dashboardApi.deleteJobPosting(id);
        } catch (error) {
            throw error;
        }
    },

    // GET user's own gig postings - Uses: dashboardApi.getMyJobPostings()
    async getMyGigPostings() {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return staticGigs;
        }

        try {
            const response = await dashboardApi.getMyJobPostings();

            let postings = [];
            if (Array.isArray(response)) {
                postings = response;
            } else if (response?.results) {
                postings = response.results;
            } else if (response?.data) {
                postings = response.data;
            } else {
                postings = response;
            }

            // Filter to only return gigs (job_or_gig === 'gig')
            const gigs = postings.filter(posting => posting.job_or_gig === 'gig');
            return gigs;
        } catch (error) {
            return [];
        }
    },
};