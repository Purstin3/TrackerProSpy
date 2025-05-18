"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  offer: string;
  dueDate: string;
}

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Summer Sale campaign performance',
      completed: false,
      priority: 'high',
      offer: 'Summer Sale Campaign',
      dueDate: 'Today'
    },
    {
      id: '2',
      title: 'Create new ad variations for Product Launch',
      completed: false,
      priority: 'medium',
      offer: 'Product Launch Promo',
      dueDate: 'Tomorrow'
    },
    {
      id: '3',
      title: 'Adjust targeting for Holiday Special campaign',
      completed: false,
      priority: 'medium',
      offer: 'Holiday Special',
      dueDate: 'May 10'
    },
    {
      id: '4',
      title: 'Budget review for End of Season campaign',
      completed: true,
      priority: 'low',
      offer: 'End of Season',
      dueDate: 'Completed'
    },
    {
      id: '5',
      title: 'Prepare monthly performance report',
      completed: false,
      priority: 'high',
      offer: 'All Campaigns',
      dueDate: 'May 15'
    },
  ]);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-rose-500/10 text-rose-500';
      case 'medium':
        return 'bg-amber-500/10 text-amber-500';
      case 'low':
        return 'bg-emerald-500/10 text-emerald-500';
      default:
        return 'bg-slate-500/10 text-slate-500';
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'medium',
      offer: 'Unassigned',
      dueDate: 'No date'
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks & Actions</CardTitle>
        <CardDescription>
          Manage tasks related to your advertising campaigns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex space-x-2">
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            onKeyDown={(e) => e.key === 'Enter' && addNewTask()}
          />
          <Button onClick={addNewTask}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-start space-x-3 p-3 rounded-lg",
                task.completed ? "bg-muted/40" : "bg-muted/20"
              )}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <p className={cn(
                  "text-sm",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant="outline">{task.offer}</Badge>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <span className="text-muted-foreground">Due: {task.dueDate}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTask(task.id)}
                className="h-8 w-8 opacity-50 hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
}