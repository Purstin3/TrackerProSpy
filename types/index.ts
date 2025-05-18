export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  organization_id: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  created_at: string;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'completed';
  score: number;
  start_date: string;
  end_date?: string;
  budget: number;
  organization_id: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface AdTracking {
  id: string;
  offer_id: string;
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  roas: number;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  offer_id: string;
  assigned_to: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  content: string;
  offer_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'error' | 'success';
  offer_id: string;
  is_read: boolean;
  created_at: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'trend' | 'anomaly' | 'suggestion';
  offer_id: string;
  metric: string;
  value: number;
  previous_value: number;
  change_percentage: number;
  created_at: string;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'pdf' | 'excel';
  offer_ids: string[];
  date_range: {
    start_date: string;
    end_date: string;
  };
  created_by: string;
  created_at: string;
}

export interface DashboardMetrics {
  total_offers: number;
  active_offers: number;
  average_score: number;
  total_spend: number;
  total_revenue: number;
  total_conversions: number;
  average_roas: number;
  total_tasks: number;
  pending_tasks: number;
}

export interface PerformanceData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
}