'use client';

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

const travelPlans = [
  {
    id: 1,
    destination: "Kyoto, Japan",
    date: "Oct 15 - Oct 25, 2026",
    status: "Planning",
    notes: "Book Shinkansen tickets, find ryokan in Gion, reserve tea ceremony.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    destination: "Swiss Alps",
    date: "Dec 10 - Dec 20, 2026",
    status: "Booked",
    notes: "Ski passes secured. Need to buy winter gear. Train from Zurich to Zermatt.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    destination: "Bali, Indonesia",
    date: "Feb 5 - Feb 15, 2027",
    status: "Idea",
    notes: "Looking into villa rentals in Ubud. Need to check visa requirements.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop"
  }
];

export default function TravelPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-screen overflow-hidden">
            <div className="flex flex-col h-full w-full">
              <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between z-10">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-bold">Travel Planner</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                  + New Trip
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-muted/20">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Upcoming Adventures</h1>
                    <p className="text-muted-foreground">Keep track of your itineraries, bookings, and bucket list.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {travelPlans.map((plan) => (
                      <div key={plan.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={plan.image} 
                            alt={plan.destination} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={"px-2.5 py-1 rounded-full text-xs font-bold shadow-sm " + (
                              plan.status === 'Booked' ? 'bg-green-500 text-white' :
                              plan.status === 'Planning' ? 'bg-yellow-500 text-white' :
                              'bg-gray-500 text-white'
                            )}>
                              {plan.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h2 className="text-xl font-bold mb-1">{plan.destination}</h2>
                          <div className="text-sm text-primary font-medium mb-4 flex items-center gap-1.5">
                            🗓️ {plan.date}
                          </div>
                          <Separator className="mb-4" />
                          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                            {plan.notes}
                          </p>
                          <div className="mt-5 pt-4 border-t border-border flex justify-between items-center">
                            <button className="text-sm font-medium text-primary hover:underline">View Itinerary</button>
                            <button className="text-muted-foreground hover:text-foreground">•••</button>
                          </div>
                        </div>
                      </div>
                    ))}
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
