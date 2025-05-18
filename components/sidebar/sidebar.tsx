"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BarChart3, 
  Target, 
  CheckSquare, 
  Bell, 
  FileText, 
  Settings, 
  ChevronLeft,
  Menu,
  PlusCircle,
  Users
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/mode-toggle';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', id: 'dashboard' },
    { name: 'Offers', icon: Target, path: '/offers', id: 'offers' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics', id: 'analytics' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks', id: 'tasks' },
    { name: 'Alerts', icon: Bell, path: '/alerts', id: 'alerts' },
    { name: 'Reports', icon: FileText, path: '/reports', id: 'reports' },
    { name: 'Team', icon: Users, path: '/team', id: 'team' },
    { name: 'Settings', icon: Settings, path: '/settings', id: 'settings' },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Mobile toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 256 : 80,
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-background/80 backdrop-blur-md",
          "overflow-y-auto lg:translate-x-0 transition-all duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm">
          <div className="flex items-center">
            <motion.div 
              animate={{ scale: [0.9, 1.1, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10"
            >
              <Target className="w-6 h-6 text-primary" />
            </motion.div>
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3 text-lg font-bold tracking-tight"
                >
                  OfferTracker
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden lg:flex"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <div className="flex-1 py-6">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  pathname === item.path ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  !isOpen && "justify-center"
                )}
                onClick={() => setActiveItem(item.id)}
              >
                <item.icon className={cn("h-5 w-5", !isOpen && "h-6 w-6")} />
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-3 whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </nav>
        </div>

        <div className="sticky bottom-0 flex flex-col gap-2 p-4 border-t bg-background/95 backdrop-blur-sm">
          <Button 
            variant="outline" 
            className={cn(
              "w-full justify-start gap-2", 
              !isOpen && "justify-center px-0"
            )}
          >
            <PlusCircle className="h-4 w-4" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  New Offer
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="ml-2"
                  >
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">admin</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ModeToggle />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}