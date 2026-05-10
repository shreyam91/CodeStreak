'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';

const getBlogDetails = (id: string) => {
  return {
    id,
    title: "Understanding React Server Components",
    content: "React Server Components (RSCs) represent a paradigm shift in how we build React applications. By executing components exclusively on the server, they allow us to keep heavy dependencies out of the client bundle and directly access backend resources like databases and file systems.\n\nTraditional React applications send all component logic to the browser. As the app grows, the bundle size increases, leading to slower page loads. Server-Side Rendering (SSR) helped with initial load times, but it still required the client to download and hydrate the entire component tree.\n\nKey Benefits:\n1. Zero Bundle Size: Server components never ship to the client.\n2. Direct Backend Access: You can query your database directly inside a component without an API layer.\n3. Automatic Code Splitting: Client components are loaded only when needed.\n\nThis architectural change makes React incredibly powerful for building fast, data-driven applications without compromising the developer experience we know and love.",
    category: "React",
    author: "Shreyam",
    readTime: "5 min read",
    date: "May 8, 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop"
  };
};

export default function BlogPost({ params }: { params: { id: string } }) {
  const blog = getBlogDetails(params.id);

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
                  <BreadcrumbLink href="/dashboard/blogs">Blogs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold truncate max-w-[200px]">{blog.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          
          <div className="flex-1 overflow-y-auto bg-background">
            <div className="max-w-3xl mx-auto py-10 px-6">
              <Link href="/dashboard/blogs" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft size={16} className="mr-2" /> Back to Blogs
              </Link>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md">{blog.category}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-foreground">{blog.title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
                <div className="flex items-center gap-2"><Calendar size={16} /> {blog.date}</div>
                <div className="flex items-center gap-2"><Clock size={16} /> {blog.readTime}</div>
                <div className="flex items-center gap-2"><Tag size={16} /> By {blog.author}</div>
              </div>

              <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12 shadow-sm border border-border">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>

              <div className="max-w-none text-lg text-foreground/90">
                <div className="whitespace-pre-line leading-loose">
                  {blog.content}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
