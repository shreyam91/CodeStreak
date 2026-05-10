'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Play, ListFilter } from 'lucide-react';

const mockVideos = [
  {
    id: "mXw9cZl3m0o",
    title: "Operating Systems Crash Course - Master OS in 45 Minutes",
    category: "Placement Prep",
    duration: "45:20",
    views: "1.2M views",
    thumbnail: "https://img.youtube.com/vi/mXw9cZl3m0o/maxresdefault.jpg"
  },
  {
    id: "tWVWeAqZ0WU",
    title: "Graph Algorithms Explained Visually - Dijkstra, BFS, DFS",
    category: "DSA",
    duration: "22:15",
    views: "850K views",
    thumbnail: "https://img.youtube.com/vi/tWVWeAqZ0WU/maxresdefault.jpg"
  },
  {
    id: "vvhC64hQZMk",
    title: "How to Build a Scalable Chat App - System Design Interview",
    category: "System Design",
    duration: "1:05:10",
    views: "420K views",
    thumbnail: "https://img.youtube.com/vi/vvhC64hQZMk/maxresdefault.jpg"
  },
  {
    id: "81v_D2gD0D0",
    title: "Machine Coding Interview - React Tic Tac Toe",
    category: "Web Dev",
    duration: "1:30:00",
    views: "125K views",
    thumbnail: "https://img.youtube.com/vi/81v_D2gD0D0/maxresdefault.jpg"
  }
];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  
  const categories = ["All", "DSA", "System Design", "Web Dev", "Placement Prep"];

  const filteredVideos = mockVideos.filter(v => activeCategory === "All" || v.category === activeCategory);

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
                  <BreadcrumbPage className="font-bold">Video Library</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          <div className="p-6 lg:p-10 flex-1 overflow-y-auto bg-muted/10">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Learning Videos</h1>
                  <p className="text-muted-foreground">Curated video content to help you master concepts quickly.</p>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                  <ListFilter size={18} className="text-muted-foreground mr-2" />
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-card border border-border text-foreground hover:bg-muted'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map(video => (
                  <div key={video.id} className="group cursor-pointer flex flex-col h-full">
                    <div className="relative rounded-xl overflow-hidden mb-3 aspect-video border border-border shadow-sm bg-black group cursor-pointer" onClick={() => !playingVideoId && setPlayingVideoId(video.id)}>
                      {playingVideoId === video.id ? (
                        <iframe 
                          className="w-full h-full absolute inset-0 bg-black"
                          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <>
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                          
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-lg hover:bg-primary hover:border-primary">
                              <Play size={24} className="ml-1" fill="currentColor" />
                            </div>
                          </div>
                          
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-bold tracking-wide rounded border border-white/10 backdrop-blur-sm shadow-sm pointer-events-none">
                            {video.duration}
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                      <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground mt-auto">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">{video.category}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                        <span>{video.views}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredVideos.length === 0 && (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Play className="text-muted-foreground" size={24} />
                    </div>
                    <h3 className="text-lg font-bold">No videos found</h3>
                    <p className="text-muted-foreground mt-1">Select a different category.</p>
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
