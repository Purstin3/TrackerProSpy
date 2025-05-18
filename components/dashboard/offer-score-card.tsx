"use client";

import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OfferScoreCardProps {
  name: string;
  score: number;
  trend: 'up' | 'down' | 'neutral';
  changePercent: number;
  impressions: number;
  conversions: number;
}

export function OfferScoreCard({
  name,
  score,
  trend,
  changePercent,
  impressions,
  conversions
}: OfferScoreCardProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-sm">{name}</h3>
          <div className="flex items-center mt-1">
            <span className={cn(
              "text-xs font-medium flex items-center",
              trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-muted-foreground'
            )}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {changePercent}%
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              vs last period
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
          <span className="font-bold text-base">{score}</span>
        </div>
      </div>
      
      <Progress value={score} className="h-2" />
      
      <div className="flex justify-between text-xs text-muted-foreground pt-1">
        <div>Impressions: {impressions.toLocaleString()}</div>
        <div>Conversions: {conversions.toLocaleString()}</div>
      </div>
    </div>
  );
}