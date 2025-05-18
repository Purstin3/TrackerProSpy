"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

const initialAlerts = [
  {
    id: '1',
    title: 'Campaign Score Drop',
    description: 'Holiday Special campaign score dropped by 5.4%',
    type: 'warning',
    time: '2h ago',
  },
  {
    id: '2',
    title: 'Budget Threshold',
    description: 'Summer Sale campaign reached 80% of budget',
    type: 'info',
    time: '5h ago',
  },
  {
    id: '3',
    title: 'Performance Spike',
    description: 'Product Launch had 35% conversion increase',
    type: 'success',
    time: '1d ago',
  },
  {
    id: '4',
    title: 'Ad Disapproved',
    description: 'One ad in End of Season campaign was disapproved',
    type: 'error',
    time: '2d ago',
  },
];

export function AlertsList() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-500/10';
      case 'error':
        return 'bg-destructive/10';
      case 'success':
        return 'bg-emerald-500/10';
      default:
        return 'bg-blue-500/10';
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>System notifications and alerts</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "p-3 rounded-lg mb-3 relative group",
                  getAlertBg(alert.type)
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium leading-none mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {alert.time}
                    </p>
                  </div>
                  <Button
                    onClick={() => dismissAlert(alert.id)}
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </div>
              </motion.div>
            ))}
            {alerts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                <Info className="h-8 w-8 text-muted-foreground mb-3 opacity-50" />
                <h3 className="text-sm font-medium mb-1">No alerts</h3>
                <p className="text-xs text-muted-foreground">
                  You're all caught up! No new alerts to display.
                </p>
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full">View All Alerts</Button>
      </CardFooter>
    </Card>
  );
}