'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import { ArrowLeft, Lightbulb, Target, Layers, CheckCircle2, Box } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

export default function SystemDesignDetailPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params.id ? parseInt(params.id as string) : 1;
  const activeQuestion = systemDesignQuestions.find(q => q.id === idParam) || systemDesignQuestions[0];

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen overflow-hidden bg-background">
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center border-b px-4 justify-between z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/dashboard/system-design')}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
            >
              <ArrowLeft size={16} />
              System Design List
            </button>
            <div className="h-4 w-px bg-border"></div>
            <h2 className="font-bold hidden sm:block">{activeQuestion.title}</h2>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2">
              <CheckCircle2 size={16} />
              Mark as Solved
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel: Description and Requirements */}
          <div className="w-1/2 flex flex-col border-r border-border bg-background overflow-y-auto">
            <div className="p-8 max-w-4xl mx-auto w-full space-y-10">
              <div>
                <h1 className="text-3xl font-bold mb-4">{activeQuestion.title}</h1>
                <div className="flex gap-2 mb-6">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                    activeQuestion.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                    activeQuestion.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                    'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}>
                    {activeQuestion.difficulty}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-md bg-primary/10 text-primary uppercase tracking-wider">
                    {activeQuestion.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-3">Requirements</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {activeQuestion.description}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-card p-6 rounded-2xl border shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40"></div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Layers size={20} className="text-primary" />
                    Architecture & Approach
                  </h3>
                  <div className="text-card-foreground leading-relaxed whitespace-pre-line">
                    {activeQuestion.how}
                  </div>
                </div>
                
                <div className="bg-card p-6 rounded-2xl border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500/40"></div>
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target size={20} className="text-blue-500" />
                    Why is it asked?
                  </h3>
                  <p className="text-card-foreground leading-relaxed">
                    {activeQuestion.why}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Data Flow / Diagram */}
          <div className="w-1/2 flex flex-col bg-[#111] overflow-hidden">
            <div className="flex px-4 py-3 bg-[#1e1e1e] border-b border-[#333] items-center justify-between">
              <div className="flex items-center gap-2">
                <Box size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-300">Core Structure Map</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/30"></div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-12 overflow-auto bg-[#111]">
              <div className="w-full h-full max-w-2xl bg-[#1e1e1e] p-10 rounded-3xl border border-[#333] shadow-2xl flex flex-col justify-center items-center text-center">
                 <div className="bg-primary/10 p-4 rounded-2xl mb-8">
                    <Layers size={48} className="text-primary" />
                 </div>
                 <h4 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">System Architecture Flow</h4>
                 <div className="text-[#4ec9b0] font-mono text-xl whitespace-pre-line leading-[2em] border-l-2 border-primary/20 pl-8 text-left">
                    {activeQuestion.diagram}
                 </div>
                 <p className="mt-12 text-gray-500 text-xs italic italic">Visualization of components and data flow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
