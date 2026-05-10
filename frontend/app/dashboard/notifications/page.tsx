'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotificationBell from "@/components/NotificationBell";
import { Flame } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome to CodeStreak!',
      description: 'Start your learning journey by exploring the DSA and Machine Coding sections in the sidebar.',
      time: 'Just now',
      isRead: false,
    },
    {
      id: '2',
      title: 'New Course Added',
      description: 'The "Advanced React Patterns" module is now available in Machine Coding.',
      time: '2m ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'Streak Reminder',
      description: 'Don\'t forget to solve a question today to maintain your daily learning streak!',
      time: '2 hours ago',
      isRead: true,
    },
    {
      id: '4',
      title: 'System Update',
      description: 'We\'ve added new Low Level Design questions to the System Design category. Check them out!',
      time: 'Yesterday',
      isRead: true,
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 z-50">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-bold">Notifications</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-transform hover:scale-105 cursor-default">
                <div className="relative flex items-center justify-center">
                  <Flame className="text-orange-500 relative z-10 animate-pulse" size={18} fill="currentColor" />
                  <div className="absolute inset-0 bg-orange-500 blur-md opacity-60 animate-pulse"></div>
                </div>
                <span className="font-bold text-sm text-orange-600 dark:text-orange-400">12 Day</span>
              </div>
              <NotificationBell />
            </div>
          </header>
          
          <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                <p className="text-muted-foreground mt-1">Stay updated with your progress and platform news.</p>
              </div>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-primary font-bold hover:underline bg-primary/10 px-4 py-2 rounded-md transition-colors hover:bg-primary/20"
                >
                  Mark all as read
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-5 border rounded-xl flex gap-4 transition-all duration-300 cursor-pointer ${
                    notification.isRead 
                      ? 'bg-card hover:bg-muted/50 border-border opacity-75' 
                      : 'bg-primary/5 border-primary/30 hover:bg-primary/10 shadow-sm'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 mt-2 rounded-full shrink-0 transition-colors ${
                    notification.isRead ? 'bg-transparent' : 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${notification.isRead ? 'text-foreground/80' : 'text-foreground'}`}>
                        {notification.title}
                      </h4>
                      <span className={`text-xs font-medium ${notification.isRead ? 'text-muted-foreground' : 'text-primary'}`}>
                        {notification.time}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${notification.isRead ? 'text-muted-foreground' : 'text-foreground/90'}`}>
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
