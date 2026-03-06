import { dashboardApi } from '@/lib/api/dashboard';
import staticJobs from '@/components/dashboard/shared/data2';

// Only use static data if explicitly enabled via environment variable
const FORCE_STATIC_DATA = process.env.NEXT_PUBLIC_USE_STATIC_DATA === 'true';

export const jobsService = {
    // GET all jobs - Uses: dashboardApi.getJobs(filters)
    async getJobs(filters = {}) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return staticJobs;
        }

        try {
            const response = await dashboardApi.getJobs(filters);

            if (Array.isArray(response)) return response;
            if (response && Array.isArray(response.results)) return response.results;
            if (response && Array.isArray(response.data)) return response.data;
            if (response && Array.isArray(response.jobs)) return response.jobs;

            return staticJobs;
        } catch (error) {
            return staticJobs;
        }
    },

    // GET single job by ID - Uses: dashboardApi.getJobById(id)
    async getJobById(id) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 200));
            const job = staticJobs.find(job => job.id === id);
            if (!job) throw new Error('Job not found');
            return job;
        }

        try {
            const response = await dashboardApi.getJobById(id);
            if (response && response.data) return response.data;
            return response;
        } catch (error) {
            const job = staticJobs.find(job => job.id === id);
            if (!job) throw new Error('Job not found');
            return job;
        }
    },

    // GET user's own job postings - Uses: dashboardApi.getMyJobPostings()
    async getMyJobPostings() {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return staticJobs;
        }

        try {
            const response = await dashboardApi.getMyJobPostings();
            if (Array.isArray(response)) return response;
            if (response?.results) return response.results;
            if (response?.data) return response.data;
            return response;
        } catch (error) {
            return [];
        }
    },

    // GET filtered jobs
    async getFilteredJobs(filters) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            let filtered = [...staticJobs];

            if (filters.type) {
                filtered = filtered.filter(job => job.type === filters.type);
            }
            if (filters.location) {
                filtered = filtered.filter(job =>
                    job.location.toLowerCase().includes(filters.location.toLowerCase())
                );
            }
            if (filters.level) {
                filtered = filtered.filter(job => job.level === filters.level);
            }
            if (filters.search) {
                filtered = filtered.filter(job =>
                    job.position.toLowerCase().includes(filters.search.toLowerCase()) ||
                    job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                    job.description.toLowerCase().includes(filters.search.toLowerCase())
                );
            }

            return filtered;
        }

        // Map client filters to API filters
        const apiFilters = {
            search: filters.search,
            job_type: filters.type,
            location_type: filters.location,
            experience_level: filters.level,
        };

        // Remove undefined values
        Object.keys(apiFilters).forEach(key => {
            if (apiFilters[key] === undefined) {
                delete apiFilters[key];
            }
        });

        try {
            const response = await dashboardApi.getJobs(apiFilters);
            if (Array.isArray(response)) return response;
            if (response?.results) return response.results;
            if (response?.data) return response.data;
            return response;
        } catch (error) {
            return [];
        }
    },

    // POST create new job - Uses: dashboardApi.createJobPosting(data)
    async createJob(data) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 400));
            const newJob = { id: Date.now().toString(), ...data };
            staticJobs.push(newJob);
            return newJob;
        }

        try {
            const response = await dashboardApi.createJobPosting(data);
            if (response?.data) return response.data;
            return response;
        } catch (error) {
            throw error;
        }
    },

    // PATCH update job - Uses: dashboardApi.updateJobPosting(id, data)
    async updateJob(id, data) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 400));
            const index = staticJobs.findIndex(job => job.id === id);
            if (index === -1) throw new Error('Job not found');
            staticJobs[index] = { ...staticJobs[index], ...data };
            return staticJobs[index];
        }

        try {
            const response = await dashboardApi.updateJobPosting(id, data);
            if (response?.data) return response.data;
            return response;
        } catch (error) {
            throw error;
        }
    },

    // DELETE job - Uses: dashboardApi.deleteJobPosting(id)
    async deleteJob(id) {
        if (FORCE_STATIC_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const index = staticJobs.findIndex(job => job.id === id);
            if (index === -1) throw new Error('Job not found');
            staticJobs.splice(index, 1);
            return;
        }

        try {
            await dashboardApi.deleteJobPosting(id);
        } catch (error) {
            throw error;
        }
    },
};