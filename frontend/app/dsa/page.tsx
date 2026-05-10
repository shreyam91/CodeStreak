"use client";

import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { Lock, Code2 } from "lucide-react";
import Link from "next/link";

const mockProblems = [
  { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays & Hashing" },
  { id: 2, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", topic: "Sliding Window" },
  { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Sliding Window" },
];

export default function DSAPreviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-green-500/10 text-green-500 rounded-xl mb-6">
              <Code2 size={32} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">Data Structures & Algorithms</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated problem lists from top tech companies. Master core patterns instead of memorizing thousands of solutions.
            </p>
          </div>

          <div className="relative border border-border bg-card rounded-2xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 font-medium text-sm text-muted-foreground">
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-6">Title</div>
              <div className="col-span-2">Difficulty</div>
              <div className="col-span-3">Topic</div>
            </div>

            {/* Preview Rows */}
            {mockProblems.map((problem) => (
              <div key={problem.id} className="grid grid-cols-12 gap-4 p-4 border-b border-border items-center hover:bg-muted/30 transition-colors">
                <div className="col-span-1 flex justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div>
                </div>
                <div className="col-span-6 font-medium">{problem.id}. {problem.title}</div>
                <div className="col-span-2">
                  <span className={`text-xs px-2 py-1 rounded-md font-semibold ${
                    problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <div className="col-span-3 text-sm text-muted-foreground">{problem.topic}</div>
              </div>
            ))}

            {/* Faded Rows (Behind Lock) */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border items-center opacity-30 blur-[2px]">
              <div className="col-span-1 flex justify-center"><div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div></div>
              <div className="col-span-6 font-medium">4. Median of Two Sorted Arrays</div>
              <div className="col-span-2"><span className="text-xs px-2 py-1 rounded-md font-semibold bg-red-500/10 text-red-500">Hard</span></div>
              <div className="col-span-3 text-sm text-muted-foreground">Binary Search</div>
            </div>
            <div className="grid grid-cols-12 gap-4 p-4 items-center opacity-10 blur-[4px]">
              <div className="col-span-1 flex justify-center"><div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div></div>
              <div className="col-span-6 font-medium">5. Longest Palindromic Substring</div>
              <div className="col-span-2"><span className="text-xs px-2 py-1 rounded-md font-semibold bg-yellow-500/10 text-yellow-500">Medium</span></div>
              <div className="col-span-3 text-sm text-muted-foreground">Dynamic Programming</div>
            </div>

            {/* Lock Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-card via-card/90 to-transparent flex flex-col items-center justify-end pb-10">
              <div className="bg-background border border-border p-6 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-sm mx-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mb-4">
                  <Lock size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Unlock all 250+ Problems</h3>
                <p className="text-sm text-muted-foreground mb-6">Create a free account to access the complete curriculum, track your progress, and maintain your streak.</p>
                <Link href="/login" className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Sign In to Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
