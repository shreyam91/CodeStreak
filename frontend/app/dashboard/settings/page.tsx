'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotificationBell from "@/components/NotificationBell";
import { Flame, Bell, Monitor, Lock, Link as LinkIcon, UserCircle, BellRing, Mail, Smartphone, BookOpen, Clock, Target, CheckCircle2, Shield, Github, Code2, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 outline-none focus:ring-2 focus:ring-primary/50 ${enabled ? 'bg-primary' : 'bg-muted-foreground/30'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
  </button>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Notification States
  const [notifs, setNotifs] = useState({
    site_course: true,
    site_streak: true,
    site_system: true,
    email_digest: false,
    email_updates: true,
    push_pomodoro: true,
    push_messages: false,
  });

  // Study States
  const [study, setStudy] = useState({
    pomodoro_length: '25',
    break_length: '5',
    daily_goal: '2',
  });

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
                    <BreadcrumbPage className="font-bold">Settings</BreadcrumbPage>
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
          
          <div className="p-6 md:p-10 flex-1 overflow-y-auto bg-muted/10 h-[calc(100vh-4rem)]">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your account preferences, notifications, and integrations.</p>
              </div>

              <Tabs defaultValue="notifications" className="flex flex-col md:flex-row gap-8 items-start" onValueChange={setActiveTab}>
                {/* Vertical Sidebar Tabs */}
                <TabsList className="flex md:flex-col h-auto w-full md:w-64 shrink-0 bg-transparent justify-start items-start gap-2 p-0 space-x-0 overflow-x-auto border-none">
                  <TabsTrigger value="general" className="w-full justify-start px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg border border-transparent data-[state=active]:border-border">
                    <Monitor size={18} className="mr-3 text-muted-foreground" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg border border-transparent data-[state=active]:border-border">
                    <BellRing size={18} className="mr-3 text-muted-foreground" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="study" className="w-full justify-start px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg border border-transparent data-[state=active]:border-border">
                    <BookOpen size={18} className="mr-3 text-muted-foreground" />
                    Study Preferences
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="w-full justify-start px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg border border-transparent data-[state=active]:border-border">
                    <LinkIcon size={18} className="mr-3 text-muted-foreground" />
                    Integrations
                  </TabsTrigger>
                  <TabsTrigger value="security" className="w-full justify-start px-4 py-3 data-[state=active]:bg-card data-[state=active]:shadow-sm rounded-lg border border-transparent data-[state=active]:border-border">
                    <Shield size={18} className="mr-3 text-muted-foreground" />
                    Security
                  </TabsTrigger>
                </TabsList>

                {/* Main Content Area */}
                <div className="flex-1 w-full min-w-0 relative">
                  
                  {/* GENERAL SETTINGS */}
                  <TabsContent value="general" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden w-full">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-xl font-bold mb-1">Appearance</h3>
                        <p className="text-sm text-muted-foreground">Customize the interface theme.</p>
                      </div>
                      <div className="p-6 grid grid-cols-3 gap-4">
                        <button onClick={() => setTheme("light")} className={`p-4 border-2 rounded-xl flex flex-col items-center gap-3 transition-all ${theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                          <div className="w-full h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-black font-semibold">Light</span>
                          </div>
                          <span className="font-medium">Light</span>
                        </button>
                        <button onClick={() => setTheme("dark")} className={`p-4 border-2 rounded-xl flex flex-col items-center gap-3 transition-all ${theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                          <div className="w-full h-24 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white font-semibold">Dark</span>
                          </div>
                          <span className="font-medium">Dark</span>
                        </button>
                        <button onClick={() => setTheme("system")} className={`p-4 border-2 rounded-xl flex flex-col items-center gap-3 transition-all ${theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                          <div className="w-full h-24 bg-gradient-to-r from-white to-slate-950 border border-slate-400 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-gray-500 font-semibold mix-blend-difference">System</span>
                          </div>
                          <span className="font-medium">System</span>
                        </button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* NOTIFICATIONS SETTINGS */}
                  <TabsContent value="notifications" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    
                    {/* In-App / Site Notifications */}
                    <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden">
                      <div className="p-6 border-b border-border flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary"><Bell size={20} /></div>
                        <div>
                          <h3 className="text-xl font-bold">Site Notifications</h3>
                          <p className="text-sm text-muted-foreground">Alerts displayed in the bell icon menu.</p>
                        </div>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">New Courses & Content</h4>
                            <p className="text-sm text-muted-foreground">Get notified when new DSA or System Design problems are added.</p>
                          </div>
                          <Toggle enabled={notifs.site_course} onChange={() => toggleNotif('site_course')} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">Streak Reminders</h4>
                            <p className="text-sm text-muted-foreground">Alerts to remind you to practice before your streak breaks.</p>
                          </div>
                          <Toggle enabled={notifs.site_streak} onChange={() => toggleNotif('site_streak')} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">System Updates</h4>
                            <p className="text-sm text-muted-foreground">Important platform announcements and features.</p>
                          </div>
                          <Toggle enabled={notifs.site_system} onChange={() => toggleNotif('site_system')} />
                        </div>
                      </div>
                    </div>

                    {/* Email Notifications */}
                    <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden">
                      <div className="p-6 border-b border-border flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Mail size={20} /></div>
                        <div>
                          <h3 className="text-xl font-bold">Email Notifications</h3>
                          <p className="text-sm text-muted-foreground">Emails sent to your registered address.</p>
                        </div>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">Weekly Digest</h4>
                            <p className="text-sm text-muted-foreground">A summary of your weekly problem-solving statistics.</p>
                          </div>
                          <Toggle enabled={notifs.email_digest} onChange={() => toggleNotif('email_digest')} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">Product Updates</h4>
                            <p className="text-sm text-muted-foreground">News about major feature releases and platform changes.</p>
                          </div>
                          <Toggle enabled={notifs.email_updates} onChange={() => toggleNotif('email_updates')} />
                        </div>
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden">
                      <div className="p-6 border-b border-border flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Smartphone size={20} /></div>
                        <div>
                          <h3 className="text-xl font-bold">Push Notifications</h3>
                          <p className="text-sm text-muted-foreground">Browser-level push notifications.</p>
                        </div>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">Pomodoro Timer Alerts</h4>
                            <p className="text-sm text-muted-foreground">Get notified when it's time to take a break or resume focus.</p>
                          </div>
                          <Toggle enabled={notifs.push_pomodoro} onChange={() => toggleNotif('push_pomodoro')} />
                        </div>
                      </div>
                    </div>

                  </TabsContent>

                  {/* STUDY PREFERENCES */}
                  <TabsContent value="study" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-xl font-bold mb-1">Study Habits</h3>
                        <p className="text-sm text-muted-foreground">Configure your default learning timers and goals.</p>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Clock size={16} /> Pomodoro Session Length</label>
                            <div className="relative">
                              <select 
                                value={study.pomodoro_length}
                                onChange={(e) => setStudy({...study, pomodoro_length: e.target.value})}
                                className="w-full bg-background border border-border rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                              >
                                <option value="15">15 Minutes</option>
                                <option value="25">25 Minutes</option>
                                <option value="45">45 Minutes</option>
                                <option value="60">60 Minutes</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2"><Clock size={16} className="text-green-500" /> Break Length</label>
                            <div className="relative">
                              <select 
                                value={study.break_length}
                                onChange={(e) => setStudy({...study, break_length: e.target.value})}
                                className="w-full bg-background border border-border rounded-lg p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                              >
                                <option value="5">5 Minutes</option>
                                <option value="10">10 Minutes</option>
                                <option value="15">15 Minutes</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2 max-w-md">
                          <label className="text-sm font-medium flex items-center gap-2"><Target size={16} className="text-orange-500" /> Daily Problem Goal</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="50"
                            value={study.daily_goal}
                            onChange={(e) => setStudy({...study, daily_goal: e.target.value})}
                            className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Number of problems"
                          />
                          <p className="text-xs text-muted-foreground mt-1">This will be used to track your daily progress ring.</p>
                        </div>
                        <div className="pt-4">
                          <button className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-lg shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                            <CheckCircle2 size={18} /> Save Preferences
                          </button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* INTEGRATIONS */}
                  <TabsContent value="integrations" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-xl font-bold mb-1">Connected Accounts</h3>
                        <p className="text-sm text-muted-foreground">Link external platforms to sync your progress automatically.</p>
                      </div>
                      <div className="p-6 space-y-4">
                        
                        <div className="border border-border rounded-xl p-5 flex items-center justify-between transition-colors hover:border-primary/30">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center shrink-0">
                              <Github className="text-white dark:text-black" size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold text-base">GitHub</h4>
                              <p className="text-sm text-muted-foreground">Sync your commits to the Activity Streak graph.</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 border border-border bg-background hover:bg-muted text-sm font-bold rounded-lg transition-colors">
                            Connect
                          </button>
                        </div>

                        <div className="border border-border rounded-xl p-5 flex items-center justify-between transition-colors hover:border-primary/30 bg-primary/5 border-primary/20">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
                              <Code2 className="text-white" size={24} />
                            </div>
                            <div>
                              <h4 className="font-bold text-base">LeetCode <span className="ml-2 text-[10px] uppercase tracking-wider bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Connected</span></h4>
                              <p className="text-sm text-muted-foreground">Synced as 'shreyam_dev'. Pulls solved problems data.</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-background border border-border hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 text-sm font-bold rounded-lg transition-colors">
                            Disconnect
                          </button>
                        </div>

                      </div>
                    </div>
                  </TabsContent>

                  {/* SECURITY */}
                  <TabsContent value="security" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden">
                      <div className="p-6 border-b border-border">
                        <h3 className="text-xl font-bold mb-1">Security & Access</h3>
                        <p className="text-sm text-muted-foreground">Manage password and account protection.</p>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="space-y-4 max-w-md">
                          <div>
                            <label className="text-sm font-medium">Current Password</label>
                            <input type="password" placeholder="••••••••" className="w-full mt-1.5 bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">New Password</label>
                            <input type="password" placeholder="New password" className="w-full mt-1.5 bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                          </div>
                          <button className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-500/5 border border-red-500/20 shadow-sm rounded-xl overflow-hidden">
                      <div className="p-6 border-b border-red-500/10">
                        <h3 className="text-xl font-bold text-red-500 flex items-center gap-2">
                          <AlertTriangle size={20} /> Danger Zone
                        </h3>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                          Once you delete your account, there is no going back. All your stats, streaks, and progress will be permanently erased. Please be certain.
                        </p>
                        <button className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-lg shadow-sm hover:bg-red-600 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </TabsContent>

                </div>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
