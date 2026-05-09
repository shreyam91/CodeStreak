'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

const placementTopics = [
  {
    id: 1,
    title: "Operating Systems",
    category: "CS Core",
    description: "Core concepts of Operating Systems frequently asked in interviews.",
    questions: [
      { q: "What is a deadlock?", a: "A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process." },
      { q: "Difference between Process and Thread?", a: "A process is a program in execution (heavyweight). A thread is a lightweight process managed independently by a scheduler." },
      { q: "What is thrashing?", a: "When a system spends more time paging (swapping pages in and out of memory) than executing processes." }
    ]
  },
  {
    id: 2,
    title: "Computer Networks",
    category: "CS Core",
    description: "Networking concepts from OSI model to TCP/IP.",
    questions: [
      { q: "Explain the OSI Model.", a: "7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
      { q: "TCP vs UDP", a: "TCP is connection-oriented, reliable, guarantees delivery. UDP is connectionless, fast, no guarantee of delivery." },
      { q: "What happens when you type google.com?", a: "DNS Lookup -> TCP Handshake -> TLS Handshake -> HTTP Request -> HTTP Response -> Browser Rendering." }
    ]
  },
  {
    id: 3,
    title: "HR & Behavioral",
    category: "Soft Skills",
    description: "Common behavioral questions to prepare for company fitment rounds.",
    questions: [
      { q: "Tell me about yourself.", a: "Structure your answer: Present (current role), Past (background/education), Future (why you want this job)." },
      { q: "What is your biggest weakness?", a: "Mention a real but non-critical weakness and explicitly explain the active steps you are taking to improve it." },
      { q: "Why should we hire you?", a: "Align your technical skills and past achievements with the job description. Show enthusiasm for the company's product/culture." }
    ]
  }
];

export default function PlacementPrepPage() {
  const [activeId, setActiveId] = useState(placementTopics[0].id);
  const activeTopic = placementTopics.find(t => t.id === activeId);

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-screen overflow-hidden">
            <div className="flex flex-col h-full w-full">
              <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">Placement Preparation</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>

              <div className="flex flex-1 overflow-hidden">
                {/* Left Panel: Topics List */}
                <div className="w-1/3 flex flex-col border-r border-border bg-card overflow-y-auto p-4 gap-3">
                  <h2 className="font-bold text-lg mb-2">Prep Topics</h2>
                  {placementTopics.map((topic) => (
                    <div 
                      key={topic.id}
                      onClick={() => setActiveId(topic.id)}
                      className={"p-4 rounded-lg cursor-pointer border transition-all duration-200 " + (
                        activeId === topic.id 
                          ? "border-primary bg-primary/10 shadow-sm" 
                          : "border-border hover:border-primary/50 hover:bg-muted"
                      )}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-sm">{topic.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-secondary text-secondary-foreground whitespace-nowrap">
                          {topic.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-2">{topic.description}</p>
                    </div>
                  ))}
                </div>

                {/* Right Panel: Content */}
                <div className="w-2/3 flex flex-col bg-background overflow-y-auto">
                  {activeTopic && (
                    <div className="p-8 max-w-4xl mx-auto w-full">
                      <div className="mb-8">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground mb-4">
                          {activeTopic.category}
                        </span>
                        <h1 className="text-3xl font-bold mb-3">{activeTopic.title}</h1>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                          {activeTopic.description}
                        </p>
                      </div>

                      <Separator className="my-8" />

                      <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
                      <div className="flex flex-col gap-6">
                        {activeTopic.questions.map((item, index) => (
                          <div key={index} className="bg-card p-6 rounded-xl border shadow-sm">
                            <h3 className="text-base font-bold text-foreground mb-3 flex items-start gap-2">
                              <span className="text-primary font-black">Q:</span> {item.q}
                            </h3>
                            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                <span className="font-bold text-foreground mr-1">A:</span> {item.a}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
