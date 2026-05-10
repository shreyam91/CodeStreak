'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';

const mockBlogs = [
  {
    id: "1",
    title: "Understanding React Server Components",
    excerpt: "A deep dive into how RSCs work, why they exist, and how they improve performance by rendering on the server instead of the client.",
    category: "React",
    readTime: "5 min read",
    date: "May 8, 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "The Ultimate Guide to System Design Interviews",
    excerpt: "Learn the core concepts of high-level and low-level system design, from load balancing to database sharding.",
    category: "System Design",
    readTime: "12 min read",
    date: "May 5, 2026",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Mastering Dynamic Programming in 30 Days",
    excerpt: "Dynamic programming doesn't have to be hard. In this blog, we cover the top 10 DP patterns you need to know for FAANG interviews.",
    category: "DSA",
    readTime: "8 min read",
    date: "May 1, 2026",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "React", "System Design", "DSA", "Backend"];

  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || blog.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
                  <BreadcrumbPage className="font-bold">Blogs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          <div className="p-6 lg:p-10 flex-1 overflow-y-auto bg-muted/10">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Technical Blogs</h1>
                  <p className="text-muted-foreground">Read the latest articles on web development, system design, and DSA.</p>
                </div>
                
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search blogs..." 
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                <Filter size={16} className="text-muted-foreground mr-1" />
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map(blog => (
                  <Link key={blog.id} href={`/dashboard/blogs/${blog.id}`} className="group h-full">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/50 h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-md text-foreground text-xs font-bold rounded-lg shadow-sm">
                          {blog.category}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{blog.title}</h2>
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4 leading-relaxed">{blog.excerpt}</p>
                        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground pt-4 border-t border-border">
                          <span>{blog.date}</span>
                          <span className="bg-muted px-2 py-1 rounded-md">{blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {filteredBlogs.length === 0 && (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Search className="text-muted-foreground" size={24} />
                    </div>
                    <h3 className="text-lg font-bold">No blogs found</h3>
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
