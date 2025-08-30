import { useQuery } from '@tanstack/react-query';
import { restaurantsAPI } from '../lib/api';

export const useRestaurants = (params?: any) => {
  return useQuery({
    queryKey: ['restaurants', params],
    queryFn: () => restaurantsAPI.getAll(params),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRestaurant = (slug: string) => {
  return useQuery({
    queryKey: ['restaurant', slug],
    queryFn: () => restaurantsAPI.getBySlug(slug),
    select: (data) => data.data.restaurant,
    enabled: !!slug,
  });
};