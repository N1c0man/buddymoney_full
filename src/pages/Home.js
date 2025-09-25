import React from "react";
import Hero from "../components/Hero";
import ToolCard from "../components/ToolCard";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-brand-900 mb-6">Popular Tools</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard to="/tools#budget" title="Budget Tracker" emoji="💸" desc="Track your income and expenses quickly." />
          <ToolCard to="/tools#savings" title="Savings Goal" emoji="🎯" desc="Plan how much to save each month." />
          <ToolCard to="/tools#debt" title="Debt Payoff" emoji="📉" desc="Estimate months to pay off your debt." />
          <ToolCard to="/tools#split" title="Bill Splitter" emoji="🧮" desc="Split a bill fairly among friends." />
          <ToolCard to="/tools#emergency" title="Emergency Fund" emoji="🛟" desc="Know your ideal safety net size." />
          <ToolCard to="/tools#networth" title="Net Worth" emoji="📊" desc="Sum assets minus liabilities." />
        </div>
      </section>
    </div>
  );
}
