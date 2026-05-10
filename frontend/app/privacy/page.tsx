"use client";

import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
          <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: May 9, 2026</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when creating an account, including your name, email address, and profile details. We also automatically collect certain technical information when you use our platform, such as your IP address, browser type, and usage patterns.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to operate, maintain, and provide the features of CodeStreak. This includes tracking your daily streak, analyzing your code submissions to provide feedback, and communicating with you about your account.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no internet transmission is completely secure.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Third-Party Services</h2>
          <p>We may use third-party services for analytics, payments, and hosting. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@codestreak.in.</p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
