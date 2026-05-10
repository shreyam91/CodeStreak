"use client";

import { PublicNavbar } from "@/components/public-navbar";
import { PublicFooter } from "@/components/public-footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicNavbar />
      
      <main className="flex-1 pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
          <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last Updated: May 9, 2026</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using CodeStreak, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. User Accounts</h2>
          <p>To use certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Acceptable Use</h2>
          <p>You agree not to use the platform to: (a) upload any content that is unlawful, harmful, or abusive; (b) impersonate any person or entity; (c) attempt to gain unauthorized access to our computer systems or networks.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
          <p>The platform and its original content, features, and functionality are owned by CodeStreak and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Termination</h2>
          <p>We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
