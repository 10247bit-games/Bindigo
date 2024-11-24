import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import type { Profile } from '../types/profile';

export function useProfile(userId: string) {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => api.get<Profile>(`/profiles/${userId}`).then(res => res.data),
    staleTime: 5 * 60 * 1000 // Consider data fresh for 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Profile>) =>
      api.patch<Profile>(`/profiles/${data.id}`, data).then(res => res.data),
    onSuccess: (profile) => {
      queryClient.setQueryData(['profile', profile.id], profile);
    }
  });
}

export function useProfileStats(userId: string) {
  return useQuery({
    queryKey: ['profile', userId, 'stats'],
    queryFn: () => api.get<Profile['stats']>(`/profiles/${userId}/stats`).then(res => res.data),
    staleTime: 60 * 1000 // Consider data fresh for 1 minute
  });
}