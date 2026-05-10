'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import PomodoroTimer from '@/components/PomodoroTimer';
import YearStreakChart from '@/components/YearStreakChart';
import NotificationBell from '@/components/NotificationBell';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Code2, MonitorPlay, Layers, Flame } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [history, setHistory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for streak chart
    const generateMockData = () => {
      const data: any = {};
      const today = new Date();
      for (let i = 0; i < 100; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        if (Math.random() > 0.3) {
          const dateStr = d.toISOString().split('T')[0];
          data[dateStr] = Math.floor(Math.random() * 5) + 1;
        }
      }
      return data;
    };
    
    setHistory(generateMockData());
    setLoading(false);
  }, []);

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-bold">Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-4">
              {/* Daily Streak on top right */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-transform hover:scale-105 cursor-default">
                <div className="relative flex items-center justify-center">
                  <Flame className="text-orange-500 relative z-10 animate-pulse" size={18} fill="currentColor" />
                  <div className="absolute inset-0 bg-orange-500 blur-md opacity-60 animate-pulse"></div>
                </div>
                <span className="font-bold text-sm text-orange-600 dark:text-orange-400">12 Day</span>
              </div>

              {/* Notification Bell */}
              <NotificationBell />
            </div>
          </header>
          
          <div className="p-6 lg:p-10 flex-1 overflow-y-auto bg-muted/10">
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Developer'}!</h1>
                <p className="text-muted-foreground">Here is an overview of your progress and recommended study items.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/dashboard/dsa" className="group">
                  <div className="bg-card border border-border shadow-sm rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/50 flex flex-col h-full">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Code2 size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">DSA Practice</h3>
                    <p className="text-sm text-muted-foreground flex-1">Master Data Structures and Algorithms with curated problem sets grouped by patterns.</p>
                    <div className="mt-4 text-sm font-medium text-primary flex items-center gap-1">Continue learning <span>→</span></div>
                  </div>
                </Link>

                <Link href="/dashboard/system-design" className="group">
                  <div className="bg-card border border-border shadow-sm rounded-xl p-6 hover:shadow-md transition-all hover:border-purple-500/50 flex flex-col h-full">
                    <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Layers size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">System Design</h3>
                    <p className="text-sm text-muted-foreground flex-1">Explore High-Level and Low-Level architecture concepts for scalable applications.</p>
                    <div className="mt-4 text-sm font-medium text-purple-500 flex items-center gap-1">Continue learning <span>→</span></div>
                  </div>
                </Link>

                <Link href="/dashboard/machine-coding" className="group">
                  <div className="bg-card border border-border shadow-sm rounded-xl p-6 hover:shadow-md transition-all hover:border-orange-500/50 flex flex-col h-full">
                    <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MonitorPlay size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Machine Coding</h3>
                    <p className="text-sm text-muted-foreground flex-1">Build practical frontend components and solve real-world implementation challenges.</p>
                    <div className="mt-4 text-sm font-medium text-orange-500 flex items-center gap-1">Continue learning <span>→</span></div>
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                  <div className="w-full">
                    <h2 className="text-xl font-bold mb-4">Focus Timer</h2>
                    <PomodoroTimer />
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="bg-card border border-border p-6 rounded-xl shadow-sm h-full">
                    <h2 className="text-xl font-bold mb-6">Activity Streak</h2>
                    {loading ? (
                      <div className="flex justify-center items-center h-48">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                      </div>
                    ) : (
                      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                        <div className="min-w-max pr-4">
                          <YearStreakChart activityData={history} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
