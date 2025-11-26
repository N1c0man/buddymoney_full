import React from "react";
import { Link } from "react-router-dom";

const tools = [
  {
    title: "Budget Coach",
    description: "Answer a few simple questions and get a personalized starting plan.",
    to: "/coach",
    icon: "🧭",
    tag: "Guided tool",
    active: true,
  },
  {
    title: "Mortgage Payoff Calculator",
    description: "See how extra payments change your payoff date and total interest.",
    to: "/mortgage",
    icon: "🏡",
    tag: "Calculator",
    active: true,
  },
  {
    title: "Budget Tracker",
    description: "Track income, bills, and spending in one simple snapshot.",
    to: "#",
    icon: "📊",
    tag: "Coming soon",
    active: false,
  },
  {
    title: "Emergency Fund Planner",
    description: "Figure out how much cash cushion you really need for surprises.",
    to: "#",
    icon: "🛟",
    tag: "Coming soon",
    active: false,
  },
  {
    title: "Debt Payoff Planner",
    description: "Compare snowball vs. avalanche and build a payoff roadmap.",
    to: "#",
    icon: "💳",
    tag: "Coming soon",
    active: false,
  },
  {
    title: "Side Hustle Tracker",
    description: "Keep tabs on extra income and how it moves you toward your goals.",
    to: "#",
    icon: "🚀",
    tag: "Coming soon",
    active: false,
  },
];

export default function Tools() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50/40">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
            BuddyMoney Tools
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Simple tools to help you feel good about money
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Start with a guided experience like Budget Coach, or jump straight into a
            calculator. Each tool is designed to make your next money decision feel
            calmer and clearer.
          </p>
        </header>

        {/* Tools Grid */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {tools.map((tool) => (
            <article
              key={tool.title}
              className="group bg-white/80 border border-emerald-100 rounded-2xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md hover:border-emerald-200 transition"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 shadow-sm">
                  <span className="text-xl" aria-hidden="true">
                    {tool.icon}
                  </span>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-1">
                    {tool.tag}
                  </h2>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {tool.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                {tool.description}
              </p>

              {tool.active ? (
                <Link
                  to={tool.to}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold px-4 py-2 mt-auto hover:bg-emerald-700 transition"
                >
                  Open tool →
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center rounded-full border border-dashed border-emerald-300 text-emerald-700/70 text-xs font-semibold px-3 py-1.5 mt-auto cursor-not-allowed bg-emerald-50/60"
                >
                  Coming soon
                </button>
              )}
            </article>
          ))}
        </section>

        {/* CTA Banner */}
        <section>
          <div className="rounded-2xl bg-emerald-600 text-white px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">
                Not sure where to start?
              </h2>
              <p className="text-sm text-emerald-50">
                Try Budget Coach — a guided experience that helps you focus on the next
                best step for your money.
              </p>
            </div>
            <Link
              to="/coach"
              className="inline-flex items-center justify-center rounded-full bg-white text-emerald-700 font-semibold text-sm px-5 py-2 shadow hover:bg-emerald-50 transition"
            >
              Start Budget Coach →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
