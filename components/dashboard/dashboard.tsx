"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, John</h2>
        <p className="text-muted-foreground mt-1">Here's what's happening with your offers today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Offers</CardTitle>
            <CardDescription>Current active campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Revenue from all campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$23,456</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Average across all offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}