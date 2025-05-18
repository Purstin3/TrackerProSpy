import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface Offer {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  createdAt: string;
  updatedAt: string;
}

const fetchOffers = async (): Promise<Offer[]> => {
  const response = await fetch('/api/offers');
  if (!response.ok) {
    throw new Error('Failed to fetch offers');
  }
  return response.json();
};

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);

  const {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['offers'],
    queryFn: fetchOffers,
  });

  // Usar useEffect para reagir aos dados de sucesso
  useEffect(() => {
    if (isSuccess && data) {
      setOffers(data);
    }
  }, [isSuccess, data]);

  // Usar useEffect para reagir a erros
  useEffect(() => {
    if (isError && error) {
      console.error('Error fetching offers:', error);
      // Aqui você pode adicionar lógica adicional de tratamento de erro
      // como toast notifications, etc.
    }
  }, [isError, error]);

  return {
    offers,
    isLoading,
    error,
    refetch,
    // Propriedades adicionais que podem ser úteis
    isError,
    isSuccess,
  };
}