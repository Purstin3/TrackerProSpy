import { create } from 'zustand';
import { Offer, AdTracking, Task, Alert, Insight } from '@/types';

interface StoreState {
  offers: Offer[];
  selectedOffer: Offer | null;
  adTrackingData: AdTracking[];
  tasks: Task[];
  alerts: Alert[];
  insights: Insight[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setOffers: (offers: Offer[]) => void;
  setSelectedOffer: (offer: Offer | null) => void;
  setAdTrackingData: (data: AdTracking[]) => void;
  setTasks: (tasks: Task[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  setInsights: (insights: Insight[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Offer actions
  addOffer: (offer: Offer) => void;
  updateOffer: (offerId: string, updatedOffer: Partial<Offer>) => void;
  deleteOffer: (offerId: string) => void;
  
  // Task actions
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  
  // Alert actions
  markAlertAsRead: (alertId: string) => void;
  deleteAlert: (alertId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  offers: [],
  selectedOffer: null,
  adTrackingData: [],
  tasks: [],
  alerts: [],
  insights: [],
  isLoading: false,
  error: null,
  
  // State setters
  setOffers: (offers) => set({ offers }),
  setSelectedOffer: (offer) => set({ selectedOffer: offer }),
  setAdTrackingData: (data) => set({ adTrackingData: data }),
  setTasks: (tasks) => set({ tasks }),
  setAlerts: (alerts) => set({ alerts }),
  setInsights: (insights) => set({ insights }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  // Offer actions
  addOffer: (offer) => set((state) => ({ offers: [...state.offers, offer] })),
  updateOffer: (offerId, updatedOffer) => set((state) => ({
    offers: state.offers.map((offer) => 
      offer.id === offerId ? { ...offer, ...updatedOffer } : offer
    ),
    selectedOffer: state.selectedOffer?.id === offerId ? 
      { ...state.selectedOffer, ...updatedOffer } : state.selectedOffer
  })),
  deleteOffer: (offerId) => set((state) => ({
    offers: state.offers.filter((offer) => offer.id !== offerId),
    selectedOffer: state.selectedOffer?.id === offerId ? null : state.selectedOffer
  })),
  
  // Task actions
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updatedTask) => set((state) => ({
    tasks: state.tasks.map((task) => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    )
  })),
  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  })),
  
  // Alert actions
  markAlertAsRead: (alertId) => set((state) => ({
    alerts: state.alerts.map((alert) => 
      alert.id === alertId ? { ...alert, is_read: true } : alert
    )
  })),
  deleteAlert: (alertId) => set((state) => ({
    alerts: state.alerts.filter((alert) => alert.id !== alertId)
  })),
}));