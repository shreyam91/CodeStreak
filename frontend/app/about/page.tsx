"use client";

import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert lg:prose-lg">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-8">About CodeStreak</h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            CodeStreak was born out of a simple observation: the tech interview process is broken, and most preparation platforms are only making it worse.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
          <p>
            We believe that to become a great software engineer and pass top-tier interviews, you shouldn't just memorize algorithms. You need to understand how to build systems (Machine Coding), how to scale them (System Design), and how to optimize them (Data Structures). 
          </p>
          <p>
            Our mission is to provide a single, unified platform that teaches all three of these pillars through the psychological power of <strong>Daily Consistency</strong>.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">The Team</h2>
          <p>
  We are a team of developers and job seekers based in India who have faced the same struggles many candidates deal with today — endless applications, tough interview rounds, rejections, and the pressure of preparing consistently in a highly competitive market. We built CodeStreak from our own journey of trying to crack interviews and improve every single day, structuring it around the skills, habits, and confidence candidates actually need to stand out and get hired.
</p>

<p className="mt-2">
  While preparing ourselves, we realized that most platforms don’t truly help with the real challenges of getting hired. They focus only on problems, not the consistency, pressure, and interview readiness needed in today’s market. So we created CodeStreak to help people like us practice smarter, stay consistent, and build confidence throughout the interview journey.
</p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
