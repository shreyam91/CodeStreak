"use client";

import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">Simple, transparent pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Invest in your career. Master technical interviews with our structured curriculum and daily consistency tracker.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border border-border rounded-3xl p-8 bg-card flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-muted-foreground mb-6">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">₹0</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "10 Free DSA Problems",
                  "Basic System Design overview",
                  "Community Support",
                  "Daily Streak Tracker"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={18} className="text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className="w-full py-3 px-4 bg-muted text-foreground text-center rounded-xl font-medium hover:bg-muted/80 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-primary rounded-3xl p-8 bg-card flex flex-col relative shadow-xl shadow-primary/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro Monthly</h3>
              <p className="text-muted-foreground mb-6">For serious developers</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">₹499</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Everything in Basic",
                  "All 200+ DSA Problems",
                  "All System Design Cases",
                  "Unlimited Machine Coding",
                  "Automated Code Evaluation",
                  "Priority Support"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={18} className="text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className="w-full py-3 px-4 bg-primary text-primary-foreground text-center rounded-xl font-bold hover:bg-primary/90 transition-colors">
                Subscribe Now
              </Link>
            </div>

            {/* Lifetime Plan */}
            <div className="border border-border rounded-3xl p-8 bg-card flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Lifetime</h3>
              <p className="text-muted-foreground mb-6">Pay once, learn forever</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold">₹4,999</span>
                <span className="text-muted-foreground"> one-time</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  "Everything in Pro",
                  "Lifetime Access to all content",
                  "Early access to new modules",
                  "1-on-1 Mock Interview (1x)",
                  "Resume Review"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={18} className="text-orange-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login" className="w-full py-3 px-4 bg-foreground text-background text-center rounded-xl font-medium hover:bg-foreground/90 transition-colors">
                Get Lifetime
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
