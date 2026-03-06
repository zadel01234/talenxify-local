// src/lib/hooks/useJobs.js
// React Query hooks for jobs data

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsService } from '../services/jobsService';

// Query keys
export const jobKeys = {
    all: ['jobs'],
    lists: () => [...jobKeys.all, 'list'],
    list: (filters) => [...jobKeys.lists(), { filters }],
    details: () => [...jobKeys.all, 'detail'],
    detail: (id) => [...jobKeys.details(), id],
};

// GET all jobs (GET /job-postings/)
export function useJobs() {
    return useQuery({
        queryKey: jobKeys.lists(),
        queryFn: () => jobsService.getJobs(),
        staleTime: 5 * 60 * 1000,
    });
}

// GET recuiter's own job postings (GET /job-postings/my-postings/)
export function useMyJobPostings() {
    return useQuery({
        queryKey: [...jobKeys.all, 'my-postings'],
        queryFn: () => jobsService.getMyJobPostings(),
        staleTime: 5 * 60 * 1000,
    });
}

// GET filtered jobs
export function useFilteredJobs(filters) {
    return useQuery({
        queryKey: jobKeys.list(filters),
        queryFn: () => jobsService.getFilteredJobs(filters),
        enabled: !!filters,
        staleTime: 2 * 60 * 1000,
    });
}

// GET single job by ID
export function useJob(id) {
    return useQuery({
        queryKey: jobKeys.detail(id),
        queryFn: () => jobsService.getJobById(id),
        enabled: !!id,
    });
}

// POST create job (POST /job-postings/create/)
export function useCreateJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => jobsService.createJob(data),
        onSuccess: () => {
            // Invalidate both regular jobs and my-postings
            queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
            queryClient.invalidateQueries({ queryKey: [...jobKeys.all, 'my-postings'] });
        },
    });
}

// PATCH update job (PATCH /job-postings/{id}/update/)
export function useUpdateJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => jobsService.updateJob(id, data),
        onSuccess: (updatedJob) => {
            queryClient.setQueryData(jobKeys.detail(updatedJob.id), updatedJob);
            queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
            queryClient.invalidateQueries({ queryKey: [...jobKeys.all, 'my-postings'] });
        },
    });
}

// DELETE job (DELETE /job-postings/{id}/delete/)
export function useDeleteJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => jobsService.deleteJob(id),
        onSuccess: (_, deletedId) => {
            queryClient.removeQueries({ queryKey: jobKeys.detail(deletedId) });
            queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
            queryClient.invalidateQueries({ queryKey: [...jobKeys.all, 'my-postings'] });
        },
    });
}