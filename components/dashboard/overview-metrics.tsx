"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, DollarSign, BarChart3, Target, Zap } from 'lucide-react';

export function OverviewMetrics() {
  const metrics = [
    {
      title: "Active Offers",
      value: "12",
      description: "3 new this month",
      icon: Target,
      trend: "up",
      percentage: "+8%",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      title: "Total Revenue",
      value: "$23,456",
      description: "vs. $18,923 last month",
      icon: DollarSign,
      trend: "up",
      percentage: "+24%",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      title: "Average ROAS",
      value: "3.2x",
      description: "vs. 2.8x last month",
      icon: BarChart3,
      trend: "up",
      percentage: "+14%",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      title: "Pending Tasks",
      value: "7",
      description: "3 high priority",
      icon: Zap,
      trend: "down",
      percentage: "-12%",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center pt-1">
              <span className={`text-xs ${
                metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
              } font-medium flex items-center`}>
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {metric.percentage}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {metric.description}
              </span>
            </div>
          </CardContent>
          <motion.div 
            className={`h-1 ${
              metric.trend === 'up' ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        </Card>
      ))}
    </div>
  );
}