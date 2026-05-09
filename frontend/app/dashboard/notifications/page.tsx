'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold">Notifications</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="p-8">
            <div className="flex items-center justify-between mb-6 max-w-2xl">
              <h1 className="text-3xl font-bold">Notifications</h1>
              <button className="text-sm text-primary font-medium hover:underline">Mark all as read</button>
            </div>
            
            <div className="max-w-2xl space-y-4">
              {/* Unread Notification */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg flex gap-4 transition-colors hover:bg-primary/10">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-primary shrink-0"></div>
                <div>
                  <h4 className="font-medium text-foreground">Welcome to CodeStreak!</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Start your learning journey by exploring the DSA and Machine Coding sections in the sidebar.</p>
                  <span className="text-xs font-medium text-primary mt-2 block">Just now</span>
                </div>
              </div>

              {/* Read Notifications */}
              <div className="p-4 bg-card border rounded-lg flex gap-4 transition-colors hover:bg-muted/50">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-transparent shrink-0"></div>
                <div>
                  <h4 className="font-medium text-foreground">Streak Reminder</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Don't forget to solve a question today to maintain your daily learning streak!</p>
                  <span className="text-xs font-medium text-muted-foreground mt-2 block">2 hours ago</span>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-lg flex gap-4 transition-colors hover:bg-muted/50">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-transparent shrink-0"></div>
                <div>
                  <h4 className="font-medium text-foreground">System Update</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">We've added new Low Level Design questions to the System Design category. Check them out!</p>
                  <span className="text-xs font-medium text-muted-foreground mt-2 block">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
