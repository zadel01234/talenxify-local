// src/lib/hooks/useGigs.js
// React Query hooks for gigs data

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gigsService } from '../services/gigsService';

// Query keys
export const gigKeys = {
    all: ['gigs'],
    lists: () => [...gigKeys.all, 'list'],
    list: (filters) => [...gigKeys.lists(), { filters }],
    details: () => [...gigKeys.all, 'detail'],
    detail: (id) => [...gigKeys.details(), id],
};

// GET all gigs
export function useGigs() {
    return useQuery({
        queryKey: gigKeys.lists(),
        queryFn: () => gigsService.getGigs(),
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });
}

// GET filtered gigs
export function useFilteredGigs(filters) {
    return useQuery({
        queryKey: gigKeys.list(filters),
        queryFn: () => gigsService.getFilteredGigs(filters),
        enabled: !!filters, // Only run if filters exist
        staleTime: 2 * 60 * 1000,
    });
}

// GET single gig by ID
export function useGig(id) {
    return useQuery({
        queryKey: gigKeys.detail(id),
        queryFn: () => gigsService.getGigById(id),
        enabled: !!id,
    });
}

// POST create gig
export function useCreateGig() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => gigsService.createGig(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: gigKeys.lists() });
        },
    });
}

// PATCH update gig
export function useUpdateGig() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => gigsService.updateGig(id, data),
        onSuccess: (updatedGig) => {
            queryClient.setQueryData(gigKeys.detail(updatedGig.id), updatedGig);
            queryClient.invalidateQueries({ queryKey: gigKeys.lists() });
        },
    });
}

// DELETE gig
export function useDeleteGig() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => gigsService.deleteGig(id),
        onSuccess: (_, deletedId) => {
            queryClient.removeQueries({ queryKey: gigKeys.detail(deletedId) });
            queryClient.invalidateQueries({ queryKey: gigKeys.lists() });
        },
    });
}