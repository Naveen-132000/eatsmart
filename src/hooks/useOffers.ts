import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { offersAPI } from '../lib/api';

export const useOffers = (restaurantId: string, params?: any) => {
  return useQuery({
    queryKey: ['offers', restaurantId, params],
    queryFn: () => offersAPI.getByRestaurant(restaurantId, params),
    select: (data) => data.data.offers,
    enabled: !!restaurantId,
  });
};

export const useBestOffers = (params?: any) => {
  return useQuery({
    queryKey: ['bestOffers', params],
    queryFn: () => offersAPI.getBest(params),
    select: (data) => data.data.offers,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useTrackOfferClick = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (offerId: string) => offersAPI.trackClick(offerId),
    onSuccess: (data) => {
      // Open the platform URL in a new tab
      window.open(data.data.redirectUrl, '_blank');
    },
  });
};