'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  
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
                  <BreadcrumbPage className="font-bold">Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <div className="bg-card p-6 rounded-lg border shadow-sm max-w-2xl">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-bold uppercase">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold capitalize">{user?.name || 'User'}</h2>
                  <p className="text-muted-foreground">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Account Status</h3>
                  <p className="text-sm text-green-600 font-medium">Active - Developer Mode</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Joined</h3>
                  <p className="text-sm text-muted-foreground">May 2026</p>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
