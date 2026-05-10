'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import { ArrowLeft, BookOpen, CheckCircle2, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

export default function PlacementPrepDetailPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params.id ? parseInt(params.id as string) : 1;
  const activeTopic = placementTopics.find(t => t.id === idParam) || placementTopics[0];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen overflow-hidden bg-background">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center border-b px-4 justify-between z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/dashboard/placement-prep')}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
            >
              <ArrowLeft size={16} />
              Prep Topics List
            </button>
            <div className="h-4 w-px bg-border"></div>
            <h2 className="font-bold hidden sm:block">{activeTopic.title}</h2>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2">
              <CheckCircle2 size={16} />
              Finish Review
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-muted/5">
          <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="mb-12">
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/70">{activeTopic.category}</span>
                    <h1 className="text-4xl font-extrabold tracking-tight mt-1">{activeTopic.title}</h1>
                  </div>
               </div>
               <p className="text-xl text-muted-foreground leading-relaxed">
                 {activeTopic.description}
               </p>
            </div>

            <Separator className="mb-12" />

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">
                <FileText className="text-muted-foreground" size={24} />
                Interview Questions & Detailed Answers
              </h2>
              
              {activeTopic.questions.map((item, index) => (
                <div 
                  key={index} 
                  className={`group border rounded-2xl transition-all duration-300 overflow-hidden ${
                    expandedIndex === index ? 'bg-card shadow-lg border-primary/20' : 'bg-background hover:border-primary/30'
                  }`}
                >
                  <button 
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                  >
                    <div className="flex gap-4">
                      <span className="text-xl font-black text-primary/40 mt-0.5">Q{index + 1}</span>
                      <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {item.q}
                      </h3>
                    </div>
                    <div className={`mt-1 p-1 rounded-full transition-colors ${expandedIndex === index ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {expandedIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>
                  
                  {expandedIndex === index && (
                    <div className="px-6 pb-8 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="pl-11 pr-4">
                         <div className="bg-muted/40 p-6 rounded-2xl border border-border/50 relative">
                            <div className="absolute -left-2 top-6 w-4 h-4 bg-muted/40 rotate-45 border-l border-b border-border/50"></div>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              {item.a}
                            </p>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
