"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Code2, Flame, Network, TerminalSquare, ChevronRight, Target, Zap, Shield, Trophy, Users, CheckCircle2, TrendingUp } from "lucide-react";
import { PublicNavbar } from "./public-navbar";
import { PublicFooter } from "./public-footer";

export default function HeroSectionOne() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex-col bg-background overflow-hidden selection:bg-primary/30">
      <PublicNavbar />
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-30 blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20 md:pt-40 md:pb-28 border-b border-border/40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <Flame size={16} className="text-orange-500" />
          <span>Join 10,000+ developers building their daily streak</span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-center text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Master Tech Interviews with <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Daily Consistency
          </span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground md:text-xl"
        >
          The ultimate unified platform for Machine Coding, DSA, and System Design. 
          Build your coding streak, track your progress, and land your dream role.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <button 
            onClick={() => router.push('/login')}
            className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-8 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            Start Your Streak
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-border bg-background px-8 font-medium text-foreground transition-all hover:bg-muted"
          >
            Explore Dashboard
          </button>
        </motion.div>
      </section>

      {/* Core Domains Section */}
      <section className="relative z-10 py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything you need to succeed</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We've condensed the most important aspects of software engineering interviews into three core domains.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50 text-left"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform group-hover:scale-150"></div>
                <div className={`mb-6 inline-flex rounded-xl p-3 ${domain.color}`}>
                  <domain.icon size={28} />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-card-foreground">{domain.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {domain.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">Why choose CodeStreak?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Traditional coding platforms focus entirely on algorithms. In the real world, you are expected to build scalable systems, write clean production code, and communicate effectively. We bridge that gap.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Real-world Context", desc: "No more arbitrary array manipulation. Build features you'd actually see in production." },
                  { title: "Gamified Consistency", desc: "Our streak system leverages psychology to keep you engaged and practicing every single day." },
                  { title: "Comprehensive Curriculum", desc: "From basic arrays to distributed microservices, follow a guided, structured path." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full h-fit">
                      <CheckCircle2 size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Flame className="text-orange-500" size={20} />
                    </div>
                    <div>
                      <p className="font-bold">Current Streak</p>
                      <p className="text-sm text-muted-foreground">Keep it up!</p>
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold">24 Days</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-muted-foreground">Weekly Goal</span>
                    <span className="font-bold text-primary">5 / 7 Days</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <TrendingUp size={20} className="text-green-500 mb-2" />
                    <p className="text-2xl font-bold">142</p>
                    <p className="text-xs text-muted-foreground">Problems Solved</p>
                  </div>
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <Trophy size={20} className="text-yellow-500 mb-2" />
                    <p className="text-2xl font-bold">Top 5%</p>
                    <p className="text-xs text-muted-foreground">Global Ranking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">Built by Engineers, for Engineers</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed mb-10">
            We started CodeStreak because we were frustrated with how disconnected interview prep was from actual software engineering. We wanted a platform that didn't just teach us how to invert a binary tree, but taught us how to design highly available chat applications and build clean React components.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-extrabold mb-2">50k+</span>
              <span className="text-primary-foreground/70 font-medium text-sm uppercase tracking-wider">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-extrabold mb-2">200+</span>
              <span className="text-primary-foreground/70 font-medium text-sm uppercase tracking-wider">Curated Challenges</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-extrabold mb-2">94%</span>
              <span className="text-primary-foreground/70 font-medium text-sm uppercase tracking-wider">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to start your streak?</h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of developers who have leveled up their careers through daily consistency.
          </p>
          <button 
            onClick={() => router.push('/login')}
            className="h-14 items-center justify-center rounded-full bg-primary px-10 text-lg font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
          >
            Create Your Free Account
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <PublicFooter />
    </div>
  );
}

const domains = [
  {
    title: "Machine Coding",
    description: "Build real-world frontend and backend mini-projects. Learn component architecture, state management, and API design.",
    icon: TerminalSquare,
    color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20"
  },
  {
    title: "Data Structures",
    description: "Curated problem lists from top tech companies. Master core patterns instead of memorizing thousands of solutions.",
    icon: Code2,
    color: "bg-green-500/10 text-green-500 dark:bg-green-500/20"
  },
  {
    title: "System Design",
    description: "Learn how to architect highly scalable systems. Master databases, caching, load balancing, and microservices.",
    icon: Network,
    color: "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20"
  }
];
