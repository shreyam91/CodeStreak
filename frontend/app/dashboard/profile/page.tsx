'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";
import { Edit2, Github, Linkedin, MapPin, Link as LinkIcon, Trophy, Target, Check, Code2, Flame } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Shreyam",
    username: "shreyam_dev",
    bio: "Building the future of web applications. Obsessed with elegant code, scalable systems, and pixel-perfect UI.",
    location: "San Francisco, CA",
    website: "https://portfolio.dev",
    github: "github.com/shreyam",
    linkedin: "linkedin.com/in/shreyam",
  });

  const handleSave = () => setIsEditing(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const stats = {
    total: { solved: 345, total: 1000 },
    easy: { solved: 180, total: 300, color: "text-green-500", bg: "bg-green-500", hex: "#22c55e" },
    medium: { solved: 120, total: 500, color: "text-yellow-500", bg: "bg-yellow-500", hex: "#eab308" },
    hard: { solved: 45, total: 200, color: "text-red-500", bg: "bg-red-500", hex: "#ef4444" }
  };

  // Calculations for LeetCode style segmented chart
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const easyLength = (stats.easy.solved / stats.total.total) * circumference;
  const mediumLength = (stats.medium.solved / stats.total.total) * circumference;
  const hardLength = (stats.hard.solved / stats.total.total) * circumference;

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
                    <BreadcrumbPage className="font-bold">Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-4">
              {/* Daily Streak */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-full border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-transform hover:scale-105 cursor-default">
                <div className="relative flex items-center justify-center">
                  <Flame className="text-orange-500 relative z-10 animate-pulse" size={18} fill="currentColor" />
                  <div className="absolute inset-0 bg-orange-500 blur-md opacity-60 animate-pulse"></div>
                </div>
                <span className="font-bold text-sm text-orange-600 dark:text-orange-400">12 Day Streak</span>
              </div>

              {/* Notification Bell */}
              <NotificationBell />
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-muted/30">
            <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-8">
              
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Profile Overview</h1>
                  <p className="text-muted-foreground mt-1 text-sm font-medium">Manage your public profile and view your learning statistics.</p>
                </div>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg shadow-sm hover:bg-primary/90 transition-all active:scale-95"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>

              {/* Bento Box Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column - Personal Info */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  
                  {isEditing ? (
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">Edit Details</h3>
                        <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground text-sm font-medium">Cancel</button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Name</label>
                          <input type="text" name="name" value={profileData.name} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Username</label>
                          <input type="text" name="username" value={profileData.username} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Bio</label>
                          <textarea name="bio" value={profileData.bio} onChange={handleInputChange} rows={4} className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm outline-none focus:border-primary transition-colors resize-none" />
                        </div>
                        <Separator className="my-2" />
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Location</label>
                          <input type="text" name="location" value={profileData.location} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">Portfolio URL</label>
                          <input type="text" name="website" value={profileData.website} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">GitHub</label>
                          <input type="text" name="github" value={profileData.github} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase">LinkedIn</label>
                          <input type="text" name="linkedin" value={profileData.linkedin} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" />
                        </div>
                      </div>

                      <button onClick={handleSave} className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-md text-sm font-bold shadow-sm hover:bg-primary/90 flex justify-center items-center gap-2 active:scale-95 transition-transform">
                        <Check size={16} /> Save Changes
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Avatar & Bio Card */}
                      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center flex flex-col items-center">
                        <div className="relative inline-block mb-5">
                          <div className="w-28 h-28 mx-auto rounded-full bg-muted flex items-center justify-center shadow-inner border-[6px] border-background overflow-hidden">
                            <img src={`https://ui-avatars.com/api/?name=${profileData.name.charAt(0)}&background=0D8ABC&color=fff&size=128&bold=true`} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{profileData.name}</h2>
                        <p className="text-primary font-semibold mb-6">@{profileData.username}</p>
                        <p className="text-sm leading-relaxed text-muted-foreground font-medium">{profileData.bio}</p>
                      </div>

                      {/* Links Card */}
                      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold mb-5 text-xs text-muted-foreground uppercase tracking-wider">About</h3>
                        <div className="space-y-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md text-muted-foreground"><MapPin size={16} /></div>
                            <span className="font-medium text-foreground">{profileData.location}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md text-muted-foreground"><LinkIcon size={16} /></div>
                            <a href={profileData.website} className="font-medium text-foreground hover:text-primary transition-colors truncate">{profileData.website.replace('https://', '')}</a>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md text-muted-foreground"><Github size={16} /></div>
                            <a href={`https://${profileData.github}`} className="font-medium text-foreground hover:text-primary transition-colors truncate">{profileData.github.replace('github.com/', '')}</a>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-md text-[#0077b5]"><Linkedin size={16} /></div>
                            <a href={`https://${profileData.linkedin}`} className="font-medium text-foreground hover:text-primary transition-colors truncate">{profileData.linkedin.replace('linkedin.com/in/', '')}</a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Column - Stats & Activity */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                  
                  {/* Leetcode Style Stats Card */}
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                      <h3 className="text-xl font-bold flex items-center gap-2"><Target className="text-primary"/> Problem Solving</h3>
                      <div className="px-3 py-1 bg-muted rounded-md text-xs font-bold text-muted-foreground flex items-center gap-1.5 border border-border shadow-sm">
                        <Trophy size={14} className="text-yellow-500"/> Top 2% Global
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-12 sm:gap-16">
                      {/* Circular Progress */}
                      <div className="relative w-44 h-44 flex-shrink-0">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                          {/* Background Track */}
                          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-muted" />
                          
                          {/* Easy Segment */}
                          <circle 
                            cx="50" cy="50" r={radius} fill="none" stroke={stats.easy.hex} strokeWidth="5" 
                            strokeDasharray={`${easyLength} ${circumference - easyLength}`} 
                            strokeDashoffset={0}
                            className="transition-all duration-1000 ease-out" 
                          />
                          
                          {/* Medium Segment */}
                          <circle 
                            cx="50" cy="50" r={radius} fill="none" stroke={stats.medium.hex} strokeWidth="5" 
                            strokeDasharray={`${mediumLength} ${circumference - mediumLength}`} 
                            strokeDashoffset={-easyLength}
                            className="transition-all duration-1000 ease-out" 
                          />

                          {/* Hard Segment */}
                          <circle 
                            cx="50" cy="50" r={radius} fill="none" stroke={stats.hard.hex} strokeWidth="5" 
                            strokeDasharray={`${hardLength} ${circumference - hardLength}`} 
                            strokeDashoffset={-(easyLength + mediumLength)}
                            className="transition-all duration-1000 ease-out" 
                            strokeLinecap="round" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-black">{stats.total.solved}</span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Solved</span>
                        </div>
                      </div>

                      {/* Bar Charts */}
                      <div className="flex-1 w-full space-y-6">
                        {[
                          { label: "Easy", data: stats.easy },
                          { label: "Medium", data: stats.medium },
                          { label: "Hard", data: stats.hard }
                        ].map((level) => (
                          <div key={level.label}>
                            <div className="flex justify-between text-sm mb-2.5">
                              <span className={`font-bold ${level.data.color}`}>{level.label}</span>
                              <span className="text-muted-foreground font-medium"><span className="text-foreground font-bold">{level.data.solved}</span> / {level.data.total}</span>
                            </div>
                            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden shadow-inner border border-border/50">
                              <div 
                                className={`h-full ${level.data.bg} rounded-full transition-all duration-1000 ease-out`} 
                                style={{ width: `${(level.data.solved / level.data.total) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 3 mini cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                      <div className="flex items-center gap-3 mb-3 relative z-10">
                        <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center border border-orange-500/20">
                          <Flame size={20} fill="currentColor"/>
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Current Streak</span>
                      </div>
                      <span className="text-3xl font-bold relative z-10">42 <span className="text-lg font-medium text-muted-foreground">Days</span></span>
                      {/* Subtly animated background pattern */}
                      <div className="absolute right-0 bottom-0 opacity-[0.03] transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                        <Flame size={120} />
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                      <div className="flex items-center gap-3 mb-3 relative z-10">
                        <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 rounded-lg flex items-center justify-center border border-yellow-500/20">
                          <Trophy size={20} fill="currentColor"/>
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Current Rank</span>
                      </div>
                      <span className="text-3xl font-bold text-yellow-500 relative z-10">Knight</span>
                      <div className="absolute right-0 bottom-0 opacity-[0.03] transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                        <Trophy size={120} />
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-center relative overflow-hidden group">
                      <div className="flex items-center gap-3 mb-3 relative z-10">
                        <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center border border-blue-500/20">
                          <Code2 size={20} />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Commits</span>
                      </div>
                      <span className="text-3xl font-bold relative z-10">1,842</span>
                      <div className="absolute right-0 bottom-0 opacity-[0.03] transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                        <Code2 size={120} />
                      </div>
                    </div>
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
