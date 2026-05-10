"use client";

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from 'next/link';
import { Search, Filter, CheckCircle2, Circle, ArrowUpDown } from 'lucide-react';

const dsaQuestions = [
  { id: 1, title: "Two Sum", difficulty: "Easy", pattern: "Arrays & Hashing", status: "solved" },
  { id: 2, title: "Valid Anagram", difficulty: "Easy", pattern: "Arrays & Hashing", status: "unsolved" },
  { id: 3, title: "Valid Palindrome", difficulty: "Easy", pattern: "Two Pointers", status: "unsolved" },
  { id: 4, title: "3Sum", difficulty: "Medium", pattern: "Two Pointers", status: "unsolved" },
  { id: 5, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", pattern: "Sliding Window", status: "solved" },
  { id: 6, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", pattern: "Sliding Window", status: "unsolved" },
  { id: 7, title: "Valid Parentheses", difficulty: "Easy", pattern: "Stack", status: "unsolved" },
  { id: 8, title: "Merge Two Sorted Lists", difficulty: "Easy", pattern: "Linked List", status: "unsolved" },
  { id: 9, title: "Invert Binary Tree", difficulty: "Easy", pattern: "Trees", status: "solved" },
  { id: 10, title: "Maximum Depth of Binary Tree", difficulty: "Easy", pattern: "Trees", status: "unsolved" },
];

export default function DSADashboardPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [difficultySort, setDifficultySort] = useState<"none" | "asc" | "desc">("none");

  const categories = [
    "All", 
    "Arrays", 
    "Hashing", 
    "Two Pointers", 
    "Sliding Window", 
    "Binary Search", 
    "Stack/Queue", 
    "Linked List", 
    "Trees", 
    "Heap", 
    "Graphs", 
    "Backtracking", 
    "Dynamic Programming", 
    "Greedy", 
    "Trie / Advanced Topics"
  ];

  const filteredQuestions = dsaQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || q.pattern === activeFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (difficultySort === "none") return 0;
    
    const diffMap: Record<string, number> = { "Easy": 1, "Medium": 2, "Hard": 3 };
    const aVal = diffMap[a.difficulty] || 0;
    const bVal = diffMap[b.difficulty] || 0;
    
    if (difficultySort === "asc") return aVal - bVal;
    return bVal - aVal; // desc
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
                  <BreadcrumbPage className="font-bold">DSA Problems</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          <div className="p-6 lg:p-10 flex-1 overflow-y-auto bg-muted/10">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Problem Set</h1>
                  <p className="text-muted-foreground">Master core patterns to crack tech interviews.</p>
                </div>
                
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search problems..." 
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
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 font-semibold text-sm text-muted-foreground items-center">
                  <div className="col-span-1 text-center">Status</div>
                  <div className="col-span-6">Title</div>
                  <div className="col-span-2">
                    <button 
                      onClick={toggleSort}
                      className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
                    >
                      Difficulty
                      <ArrowUpDown size={14} className={`transition-colors ${difficultySort !== 'none' ? 'text-primary' : 'text-muted-foreground/50 group-hover:text-muted-foreground'}`} />
                    </button>
                  </div>
                  <div className="col-span-3">Pattern</div>
                </div>

                {/* Problem Rows */}
                {filteredQuestions.length > 0 ? (
                  <div className="divide-y divide-border">
                    {filteredQuestions.map((problem) => (
                      <Link 
                        key={problem.id} 
                        href={`/dashboard/dsa/${problem.id}`}
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
                          {problem.id}. {problem.title}
                        </div>
                        <div className="col-span-2">
                          <span className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                            problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' : 
                            problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <div className="col-span-3 text-sm text-muted-foreground">{problem.pattern}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Search className="text-muted-foreground" size={24} />
                    </div>
                    <h3 className="text-lg font-bold">No problems found</h3>
                    <p className="text-muted-foreground mt-1">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
