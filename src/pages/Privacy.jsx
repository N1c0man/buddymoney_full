import React, { useEffect } from "react";
import { setCanonical } from "../utils/seo";

export default function Privacy() {
  useEffect(() => {
    // ✅ CANONICAL URL (canonical-only implementation)
    setCanonical("/privacy");

    const description =
      "Read the BuddyMoney Privacy Policy. Learn how we collect, use, and protect your information when you use our free money tools and guides.";

    // Set document title
    document.title = "Privacy Policy | BuddyMoney";

    // Ensure a single meta description
    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // JSON-LD structured data (PrivacyPolicy)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "PrivacyPolicy",
      "name": "Privacy Policy | BuddyMoney",
      "url": "https://buddymoney.com/privacy",
      "description": description,
      "publisher": {
        "@type": "Organization",
        "name": "BuddyMoney",
        "url": "https://buddymoney.com",
      },
      "inLanguage": "en",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="pt-2 lg:pt-4 pb-16">
      <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8">
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
            Privacy Policy
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Privacy Policy
          </h1>

          <p className="text-sm md:text-base text-slate-600">
            At <strong>BuddyMoney</strong>, your privacy matters. This page explains how we
            collect, use, and protect your information when you visit our website
            or use our financial tools.
          </p>
        </header>

        <div className="space-y-6 text-sm md:text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect basic information such as your name and email address
              when you subscribe to our newsletter or contact us. We also gather
              anonymous usage data (like browser type and page visits) to help us
              improve our tools and content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              2. How We Use Information
            </h2>
            <p>
              Your information helps us provide and improve our services, respond
              to inquiries, and share helpful financial tips or updates.{" "}
              <span className="font-semibold">We never sell your data.</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              3. Cookies
            </h2>
            <p>
              BuddyMoney uses cookies to personalize your experience and analyze
              website performance. You can disable cookies in your browser at any
              time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              4. Updates
            </h2>
            <p>
              We may update this Privacy Policy periodically. Continued use of our
              site means you accept these updates.
            </p>
          </section>

          <p className="text-xs text-slate-500 mt-8">
            Last updated: November 12, 2025
          </p>
        </div>
      </div>
    </main>
  );
}
