"use client";

import { useEffect, useState } from 'react';
import { Bell, Search, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/mode-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [title, setTitle] = useState('Dashboard');
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const path = pathname.split('/')[1];
    setTitle(
      path === '' 
        ? 'Dashboard' 
        : path.charAt(0).toUpperCase() + path.slice(1)
    );
  }, [pathname]);

  return (
    <header 
      className={`sticky top-0 z-20 transition-all duration-200 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <motion.h1 
            className="text-2xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8 rounded-full bg-muted/50"
            />
          </div>

          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground"
                variant="destructive"
              >
                {notificationCount}
              </Badge>
            )}
          </Button>

          <div className="hidden lg:block">
            <ModeToggle />
          </div>

          <Button className="hidden sm:flex gap-2">
            <PlusCircle className="h-4 w-4" />
            New Offer
          </Button>
        </div>
      </div>
    </header>
  );
}