import React from "react";

export default function About() {
  return (
    <main className="pt-2 lg:pt-4 pb-16">
      <div className="max-w-3xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8">
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
            About BuddyMoney
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            About BuddyMoney
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            BuddyMoney helps beginners get confident with money via simple tools
            and friendly guides.
          </p>
        </header>

        <div className="space-y-4 text-sm md:text-base text-slate-700">
          <p>
            Money can feel confusing, especially when every article sounds like it
            was written for experts. BuddyMoney is built for real people who want
            clear answers, quick calculators, and practical next steps—not jargon.
          </p>
          <p>
            Our tools are designed to help you see your numbers, understand what
            they mean, and make small tweaks that add up over time. From budgeting
            and savings to paying off debt and planning for emergencies, we want
            you to feel like you have a friendly guide sitting next to you.
          </p>
          <p className="text-slate-500 text-xs md:text-sm">
            BuddyMoney does not provide financial, legal, or tax advice. All tools
            are for educational and planning purposes only—always double-check
            important decisions with a professional who understands your personal
            situation.
          </p>
        </div>
      </div>
    </main>
  );
}
