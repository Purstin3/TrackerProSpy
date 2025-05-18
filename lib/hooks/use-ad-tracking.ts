"use client";

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { AdTracking } from '@/types';
import { useStore } from '@/lib/store';
import { format, subDays } from 'date-fns';

export function useAdTracking(offerId: string | null, days: number = 30) {
  const setAdTrackingData = useStore((state) => state.setAdTrackingData);
  const setError = useStore((state) => state.setError);

  const fetchAdTracking = async (): Promise<AdTracking[]> => {
    if (!offerId) return [];
    
    const endDate = new Date();
    const startDate = subDays(endDate, days);
    
    const { data, error } = await supabase
      .from('ad_tracking')
      .select('*')
      .eq('offer_id', offerId)
      .gte('date', format(startDate, 'yyyy-MM-dd'))
      .lte('date', format(endDate, 'yyyy-MM-dd'))
      .order('date', { ascending: true });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data as AdTracking[];
  };

  const { data, isLoading } = useQuery({
    queryKey: ['adTracking', offerId, days],
    queryFn: fetchAdTracking,
    enabled: !!offerId,
    onSuccess: (data) => {
      setAdTrackingData(data);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  return {
    adTrackingData: data || [],
    isLoading,
  };
}