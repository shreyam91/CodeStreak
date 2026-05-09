'use client';

import React, { useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

const systemDesignQuestions = [
  {
    id: 1,
    category: "HLD",
    title: "Design a URL Shortener (e.g., TinyURL)",
    difficulty: "Medium",
    description: "Design a scalable service that converts long URLs into short aliases. When users access the short alias, they should be redirected to the original URL. The system needs to handle high read and write throughput.",
    how: "1. APIs: createShortUrl(long_url) and getLongUrl(short_url).\n2. Database: A NoSQL database (like DynamoDB or Cassandra) is great for high availability and low latency reads. Store short_url as the key.\n3. Encoding: Use Base62 encoding to generate a 7-character string. Alternatively, use a Key Generation Service (KGS) to pre-generate keys.\n4. Caching: Use Redis to cache frequently accessed URLs to reduce DB load.\n5. Load Balancer: Route requests to available web servers.",
    why: "This is a classic HLD question because it covers all the basic building blocks of a distributed system: API design, database choice (SQL vs NoSQL), caching, load balancing, and capacity estimation.",
    diagram: "Client <-> Load Balancer <-> App Servers <-> Cache (Redis) & DB (Cassandra)"
  },
  {
    id: 2,
    category: "HLD",
    title: "Design Netflix (Video Streaming Service)",
    difficulty: "Hard",
    description: "Design a global video streaming platform like Netflix. The system must stream high-quality video content to millions of concurrent users globally with minimal buffering.",
    how: "1. CDN (Content Delivery Network): Use Open Connect (Netflix's custom CDN) to store videos geographically close to users.\n2. Storage: Store original video files in Amazon S3.\n3. Processing: Transcode uploaded videos into various formats and bitrates so clients can stream appropriately based on network speed.\n4. Metadata: Store user profiles, movie titles, and watch history in a scalable DB (e.g., Cassandra for history, MySQL for billing).\n5. Search: Use Elasticsearch for querying video titles.",
    why: "Tests your understanding of CDNs, video transcoding pipelines, scalable microservices, and how to split read-heavy data (videos) from transactional data (billing).",
    diagram: "Clients <-> CDN (Open Connect)\nClients <-> API Gateway <-> Microservices (Auth, Search, User) <-> Databases"
  },
  {
    id: 3,
    category: "LLD",
    title: "Design a Parking Lot",
    difficulty: "Medium",
    description: "Design an object-oriented system for a multi-level parking lot. It should support different types of vehicles (Motorcycle, Car, Truck), assign tickets, and calculate payment upon exit.",
    how: "1. Classes: ParkingLot, Level, ParkingSpot, Vehicle, Ticket.\n2. Enums: VehicleType (MOTORCYCLE, CAR, TRUCK), SpotType.\n3. Logic: When a vehicle enters, check for available spots using a strategy (e.g., nearest to entrance). Assign the vehicle to the spot and generate a Ticket.\n4. Billing: Use the Factory or Strategy design pattern to calculate the price based on vehicle type and duration parked.",
    why: "Evaluates your ability to use Object-Oriented Principles (Abstraction, Encapsulation, Inheritance, Polymorphism) and identify appropriate design patterns in a real-world scenario.",
    diagram: "ParkingLot -> List<Level>\nLevel -> List<ParkingSpot>\nParkingSpot -> Vehicle"
  },
  {
    id: 4,
    category: "LLD",
    title: "Design Tic-Tac-Toe",
    difficulty: "Easy",
    description: "Design a scalable Object-Oriented Tic-Tac-Toe game. It should support 2 players taking turns on a 3x3 grid, and efficiently determine the winner.",
    how: "1. Classes: Game, Board, Player.\n2. State: Board maintains a 2D array or simply an array of size 9.\n3. Win Check Logic: Instead of iterating through the entire board every turn, maintain counters for each row, column, and the two diagonals. When Player 1 places a piece, increment by 1. When Player 2 places, decrement by 1. A win happens if any counter reaches 3 or -3.",
    why: "A great introductory OOD problem. It tests basic class design and algorithm optimization (O(1) win checking instead of O(N)).",
    diagram: "Game -> Board, List<Player>\nPlayer -> (Symbol, Name)"
  }
];

export default function SystemDesignPage() {
  const [activeCategory, setActiveCategory] = useState<"HLD" | "LLD">("HLD");
  
  const filteredQuestions = systemDesignQuestions.filter(q => q.category === activeCategory);
  
  const [activeId, setActiveId] = useState(filteredQuestions[0]?.id || 1);
  const activeQuestion = systemDesignQuestions.find(q => q.id === activeId);

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
                        <BreadcrumbPage className="font-bold">System Design</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>

              <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 flex flex-col border-r border-border bg-card overflow-hidden">
                  <div className="flex p-4 border-b border-border bg-muted/30">
                    <button
                      className={`flex-1 py-2 text-sm font-semibold rounded-l-md transition-colors ${activeCategory === 'HLD' ? 'bg-primary text-primary-foreground shadow' : 'bg-background text-muted-foreground hover:bg-muted'}`}
                      onClick={() => {
                        setActiveCategory("HLD");
                        setActiveId(systemDesignQuestions.find(q => q.category === "HLD")?.id || 1);
                      }}
                    >
                      HLD
                    </button>
                    <button
                      className={`flex-1 py-2 text-sm font-semibold rounded-r-md transition-colors ${activeCategory === 'LLD' ? 'bg-primary text-primary-foreground shadow' : 'bg-background text-muted-foreground hover:bg-muted'}`}
                      onClick={() => {
                        setActiveCategory("LLD");
                        setActiveId(systemDesignQuestions.find(q => q.category === "LLD")?.id || 3);
                      }}
                    >
                      LLD
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 gap-3 flex flex-col">
                    {filteredQuestions.map((q) => (
                      <div 
                        key={q.id}
                        onClick={() => setActiveId(q.id)}
                        className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                          activeId === q.id 
                            ? 'border-primary bg-primary/10 shadow-sm' 
                            : 'border-border hover:border-primary/50 hover:bg-muted'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-sm leading-tight pr-2">{q.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                            q.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            q.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-2">{q.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-2/3 flex flex-col bg-background overflow-y-auto">
                  {activeQuestion && (
                    <div className="p-8 max-w-4xl mx-auto w-full">
                      <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="bg-primary/20 text-primary px-3 py-1 rounded-md text-xs font-bold tracking-wider">
                            {activeQuestion.category}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground">
                            {activeQuestion.difficulty}
                          </span>
                        </div>
                        <h1 className="text-3xl font-bold mb-4">{activeQuestion.title}</h1>
                        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{activeQuestion.description}</p>
                      </div>

                      <Separator className="my-8" />

                      <div className="flex flex-col gap-6">
                        <div className="bg-card p-6 rounded-xl border shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="text-xl">🛠️</span> Architecture & Approach
                          </h3>
                          <div className="text-sm text-card-foreground leading-relaxed whitespace-pre-line">
                            {activeQuestion.how}
                          </div>
                        </div>
                        
                        <div className="bg-card p-6 rounded-xl border shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                          <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                            <span className="text-xl">🧠</span> Why is this asked?
                          </h3>
                          <p className="text-sm text-card-foreground leading-relaxed">
                            {activeQuestion.why}
                          </p>
                        </div>

                        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#3c3c3c] shadow-lg mt-4">
                          <h3 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">
                            Core Structure Map
                          </h3>
                          <pre className="text-sm text-[#4ec9b0] font-mono whitespace-pre-line leading-relaxed">
                            {activeQuestion.diagram}
                          </pre>
                        </div>
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
