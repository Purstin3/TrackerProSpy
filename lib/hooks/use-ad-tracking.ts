import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface AdTracking {
  id: string;
  offerId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  timestamp: string;
}

const fetchAdTracking = async (offerId: string): Promise<AdTracking[]> => {
  const response = await fetch(`/api/ad-tracking/${offerId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch ad tracking data');
  }
  return response.json();
};

export function useAdTracking(offerId: string | null) {
  const [adTrackingData, setAdTrackingData] = useState<AdTracking[]>([]);

  const {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['ad-tracking', offerId],
    queryFn: () => fetchAdTracking(offerId!),
    enabled: !!offerId,
  });

  // Usar useEffect para reagir aos dados de sucesso
  useEffect(() => {
    if (isSuccess && data) {
      setAdTrackingData(data);
    }
  }, [isSuccess, data]);

  // Usar useEffect para reagir a erros
  useEffect(() => {
    if (isError && error) {
      console.error('Error fetching ad tracking:', error);
      // Aqui você pode adicionar lógica adicional de tratamento de erro
      // como toast notifications, etc.
    }
  }, [isError, error]);

  return {
    adTrackingData,
    isLoading,
    error,
    refetch,
    // Propriedades adicionais que podem ser úteis
    isError,
    isSuccess,
  };
}