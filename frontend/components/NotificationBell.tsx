'use client';

import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  link?: string;
}

export default function NotificationBell() {
  const router = useRouter();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Course Added',
      description: 'The "Advanced React Patterns" module is now available in Machine Coding.',
      time: '2m ago',
      isRead: false,
      link: '/dashboard/machine-coding'
    },
    {
      id: '2',
      title: 'Streak Maintained! 🔥',
      description: 'You solved a problem today. Keep the 12-day streak going!',
      time: '5h ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'System Update',
      description: 'We updated our System Design curriculum. Check it out now.',
      time: '1d ago',
      isRead: true,
      link: '/dashboard/system-design'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      router.push(notification.link);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted transition-colors outline-none focus:ring-2 focus:ring-primary/50">
          <Bell size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse border border-background"></span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 z-50 p-0 overflow-hidden border-border rounded-xl shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/40">
          <DropdownMenuLabel className="font-bold text-sm p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead} 
              className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Mark all read
            </button>
          )}
        </div>
        <DropdownMenuSeparator className="m-0" />
        
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No new notifications</div>
          ) : (
            notifications.map(notification => (
              <React.Fragment key={notification.id}>
                <DropdownMenuItem 
                  className={`flex flex-col items-start p-4 cursor-pointer transition-all rounded-none outline-none ${notification.isRead ? 'opacity-70 bg-background hover:bg-muted/50' : 'bg-primary/5 hover:bg-primary/10'}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between w-full mb-1.5">
                    <span className="font-semibold text-sm flex items-center gap-2 text-foreground">
                      {!notification.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.8)]"></span>}
                      {notification.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium shrink-0 ml-2 mt-0.5">{notification.time}</span>
                  </div>
                  <p className={`text-xs line-clamp-2 ${notification.isRead ? 'text-muted-foreground' : 'text-foreground/80'} ${!notification.isRead && 'pl-4'}`}>
                    {notification.description}
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="m-0" />
              </React.Fragment>
            ))
          )}
        </div>
        
        <div className="p-2 text-center bg-muted/10">
          <Link href="/dashboard/notifications" className="text-xs text-primary font-bold hover:underline w-full block p-2 rounded-md transition-colors hover:bg-primary/5">
            View all notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
