"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OverviewMetrics } from '@/components/dashboard/overview-metrics';
import { RecentOffers } from '@/components/dashboard/recent-offers';
import { TasksList } from '@/components/dashboard/tasks-list';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { OfferScoreCard } from '@/components/dashboard/offer-score-card';
import { AlertsList } from '@/components/dashboard/alerts-list';
import { Separator } from '@/components/ui/separator';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Dashboard() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, John</h2>
        <p className="text-muted-foreground mt-1">Here's what's happening with your offers today.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div variants={item}>
            <OverviewMetrics />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                  <CardDescription>
                    Daily impressions and conversions for all active offers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Top Performing Offers</CardTitle>
                  <CardDescription>
                    Ranked by performance score
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <OfferScoreCard 
                    name="Summer Sale Campaign"
                    score={92}
                    trend="up"
                    changePercent={8.5}
                    impressions={24589}
                    conversions={1245}
                  />
                  <Separator />
                  <OfferScoreCard 
                    name="Product Launch Promo"
                    score={87}
                    trend="up"
                    changePercent={3.2}
                    impressions={18432}
                    conversions={978}
                  />
                  <Separator />
                  <OfferScoreCard 
                    name="Holiday Special"
                    score={76}
                    trend="down"
                    changePercent={2.1}
                    impressions={12893}
                    conversions={645}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={item} className="lg:col-span-2">
              <RecentOffers />
            </motion.div>
            <motion.div variants={item}>
              <AlertsList />
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>
                Advanced metrics and trends for all your campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Performance analysis content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <TasksList />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}