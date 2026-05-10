"use client";

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from 'next/link';
import { Search, Filter, CheckCircle2, Circle, ArrowUpDown } from 'lucide-react';

const systemDesignQuestions = [
  { id: 1, title: "Design a URL Shortener (TinyURL)", difficulty: "Medium", category: "HLD", status: "solved" },
  { id: 2, title: "Design Netflix (Video Streaming)", difficulty: "Hard", category: "HLD", status: "unsolved" },
  { id: 3, title: "Design a Parking Lot", difficulty: "Medium", category: "LLD", status: "unsolved" },
  { id: 4, title: "Design Tic-Tac-Toe", difficulty: "Easy", category: "LLD", status: "solved" },
  { id: 5, title: "Design Twitter (News Feed)", difficulty: "Hard", category: "HLD", status: "unsolved" },
  { id: 6, title: "Design a Rate Limiter", difficulty: "Medium", category: "HLD", status: "unsolved" },
];

export default function SystemDesignDashboardPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [difficultySort, setDifficultySort] = useState<"none" | "asc" | "desc">("none");

  const categories = ["All", "HLD", "LLD"];

  const filteredQuestions = systemDesignQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || q.category === activeFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (difficultySort === "none") return 0;
    const diffMap: Record<string, number> = { "Easy": 1, "Medium": 2, "Hard": 3 };
    const aVal = diffMap[a.difficulty] || 0;
    const bVal = diffMap[b.difficulty] || 0;
    if (difficultySort === "asc") return aVal - bVal;
    return bVal - aVal;
  });

  const toggleSort = () => {
    if (difficultySort === "none") setDifficultySort("asc");
    else if (difficultySort === "asc") setDifficultySort("desc");
    else setDifficultySort("none");
  };

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold">System Design</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          <div className="p-6 lg:p-10 flex-1 overflow-y-auto bg-muted/10">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">System Design</h1>
                  <p className="text-muted-foreground">Master High Level (HLD) and Low Level (LLD) design patterns.</p>
                </div>
                
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search systems..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Filter size={16} className="text-muted-foreground mr-1 shrink-0" />
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-background border border-border text-muted-foreground hover:bg-muted'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card rounded-2xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 font-semibold text-sm text-muted-foreground items-center">
                  <div className="col-span-1 text-center">Status</div>
                  <div className="col-span-6">Title</div>
                  <div className="col-span-2">
                    <button onClick={toggleSort} className="flex items-center gap-1.5 hover:text-foreground transition-colors group">
                      Difficulty
                      <ArrowUpDown size={14} className={`transition-colors ${difficultySort !== 'none' ? 'text-primary' : 'text-muted-foreground/50 group-hover:text-muted-foreground'}`} />
                    </button>
                  </div>
                  <div className="col-span-3">Category</div>
                </div>

                <div className="divide-y divide-border">
                  {filteredQuestions.map((problem) => (
                    <Link 
                      key={problem.id} 
                      href={`/dashboard/system-design/${problem.id}`}
                      className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <div className="col-span-1 flex justify-center">
                        {problem.status === 'solved' ? (
                          <CheckCircle2 size={20} className="text-green-500" />
                        ) : (
                          <Circle size={20} className="text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                        )}
                      </div>
                      <div className="col-span-6 font-medium group-hover:text-primary transition-colors">
                        {problem.title}
                      </div>
                      <div className="col-span-2">
                        <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                          problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' : 
                          problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="col-span-3 text-sm text-muted-foreground">{problem.category}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
