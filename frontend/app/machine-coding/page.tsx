"use client";

import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";
import { Lock, TerminalSquare } from "lucide-react";
import Link from "next/link";

const mockProjects = [
  { id: 1, title: "Build a Trello Clone", difficulty: "Hard", category: "Frontend" },
  { id: 2, title: "Design a Rate Limiter", difficulty: "Medium", category: "Backend" },
  { id: 3, title: "Create an Auto-Complete Search Box", difficulty: "Medium", category: "Frontend" },
];

export default function MachineCodingPreviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 text-blue-500 rounded-xl mb-6">
              <TerminalSquare size={32} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">Machine Coding</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build real-world frontend and backend mini-projects with automated evaluations and best-practice solutions.
            </p>
          </div>

          <div className="relative border border-border bg-card rounded-2xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-muted/30 font-medium text-sm text-muted-foreground">
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-6">Project Title</div>
              <div className="col-span-2">Difficulty</div>
              <div className="col-span-3">Category</div>
            </div>

            {/* Preview Rows */}
            {mockProjects.map((project) => (
              <div key={project.id} className="grid grid-cols-12 gap-4 p-4 border-b border-border items-center hover:bg-muted/30 transition-colors">
                <div className="col-span-1 flex justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div>
                </div>
                <div className="col-span-6 font-medium">{project.title}</div>
                <div className="col-span-2">
                  <span className={`text-xs px-2 py-1 rounded-md font-semibold ${
                    project.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <div className="col-span-3 text-sm text-muted-foreground">{project.category}</div>
              </div>
            ))}

            {/* Faded Rows (Behind Lock) */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border items-center opacity-30 blur-[2px]">
              <div className="col-span-1 flex justify-center"><div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div></div>
              <div className="col-span-6 font-medium">Build an Event Emitter</div>
              <div className="col-span-2"><span className="text-xs px-2 py-1 rounded-md font-semibold bg-green-500/10 text-green-500">Easy</span></div>
              <div className="col-span-3 text-sm text-muted-foreground">Frontend</div>
            </div>
            <div className="grid grid-cols-12 gap-4 p-4 items-center opacity-10 blur-[4px]">
              <div className="col-span-1 flex justify-center"><div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30"></div></div>
              <div className="col-span-6 font-medium">Design an In-Memory File System</div>
              <div className="col-span-2"><span className="text-xs px-2 py-1 rounded-md font-semibold bg-red-500/10 text-red-500">Hard</span></div>
              <div className="col-span-3 text-sm text-muted-foreground">Backend</div>
            </div>

            {/* Lock Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-card via-card/90 to-transparent flex flex-col items-center justify-end pb-10">
              <div className="bg-background border border-border p-6 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-sm mx-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mb-4">
                  <Lock size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Unlock all 50+ Projects</h3>
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
