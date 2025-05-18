"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Eye, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const offersData = [
  {
    id: '1',
    name: 'Summer Sale Campaign',
    description: 'Promotional campaign for summer products',
    status: 'active',
    budget: 5000,
    spent: 2456,
    performance: {
      score: 92,
      trend: 'up',
      change: 8.5
    },
    updated: '2h ago'
  },
  {
    id: '2',
    name: 'Product Launch Promo',
    description: 'New product line introduction',
    status: 'active',
    budget: 7500,
    spent: 3245,
    performance: {
      score: 87,
      trend: 'up',
      change: 3.2
    },
    updated: '5h ago'
  },
  {
    id: '3',
    name: 'Holiday Special',
    description: 'Special promotion for upcoming holidays',
    status: 'active',
    budget: 4000,
    spent: 1890,
    performance: {
      score: 76,
      trend: 'down',
      change: 2.1
    },
    updated: '1d ago'
  },
  {
    id: '4',
    name: 'End of Season',
    description: 'Clearance sale for end of season items',
    status: 'paused',
    budget: 3000,
    spent: 2100,
    performance: {
      score: 65,
      trend: 'down',
      change: 5.4
    },
    updated: '2d ago'
  },
];

export function RecentOffers() {
  const [offers, setOffers] = useState(offersData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'paused':
        return 'bg-amber-500/10 text-amber-500';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-slate-500/10 text-slate-500';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Offers</CardTitle>
        <CardDescription>Your latest advertising campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{offer.name}</h3>
                    <Badge className={cn("px-2 py-0 text-xs", getStatusColor(offer.status))}>
                      {offer.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{offer.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Offer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                      <Trash className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-medium">${offer.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Spent</p>
                  <p className="font-medium">${offer.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Score</p>
                  <div className="flex items-center">
                    <p className="font-medium">{offer.performance.score}</p>
                    <span className={cn(
                      "text-xs font-medium flex items-center ml-1",
                      offer.performance.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                    )}>
                      {offer.performance.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {offer.performance.change}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                Updated {offer.updated}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">View All Offers</Button>
      </CardFooter>
    </Card>
  );
}