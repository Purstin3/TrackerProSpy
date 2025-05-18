"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Offer } from '@/types';
import { useStore } from '@/lib/store';

export function useOffers() {
  const queryClient = useQueryClient();
  const setOffers = useStore((state) => state.setOffers);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const setError = useStore((state) => state.setError);

  const fetchOffers = async (): Promise<Offer[]> => {
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data as Offer[];
  };

  const { data: offers, isLoading } = useQuery({
    queryKey: ['offers'],
    queryFn: fetchOffers,
    onSuccess: (data) => {
      setOffers(data);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const createOfferMutation = useMutation({
    mutationFn: async (newOffer: Omit<Offer, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('offers')
        .insert([{
          ...newOffer,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select();
      
      if (error) throw new Error(error.message);
      return data[0] as Offer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  const updateOfferMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Offer> & { id: string }) => {
      const { data, error } = await supabase
        .from('offers')
        .update({
          ...updateData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select();
      
      if (error) throw new Error(error.message);
      return data[0] as Offer;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  const deleteOfferMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  return {
    offers: offers || [],
    isLoading,
    createOffer: createOfferMutation.mutate,
    updateOffer: updateOfferMutation.mutate,
    deleteOffer: deleteOfferMutation.mutate,
  };
}