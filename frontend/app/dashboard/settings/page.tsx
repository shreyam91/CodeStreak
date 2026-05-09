'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function SettingsPage() {
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
                  <BreadcrumbPage className="font-bold">Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="bg-card p-6 rounded-lg border shadow-sm max-w-2xl space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Appearance</h3>
                <p className="text-sm text-muted-foreground mb-4">Customize how CodeStreak looks on your device.</p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 border rounded-md bg-background hover:bg-muted text-sm font-medium">Light</button>
                  <button className="px-4 py-2 border border-primary bg-primary/10 text-primary rounded-md text-sm font-medium">Dark</button>
                  <button className="px-4 py-2 border rounded-md bg-background hover:bg-muted text-sm font-medium">System</button>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-4">Notifications</h3>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">Email Notifications</span>
                  <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">Study Reminders</span>
                  <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 border border-red-200 font-medium text-sm rounded-md transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
