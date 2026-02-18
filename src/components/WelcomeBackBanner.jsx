import React from "react";
import { Link } from "react-router-dom";

export default function WelcomeBackBanner({ lastTool }) {
  if (!lastTool) return null; // nothing if user hasn't visited a tool yet

  const toolNames = {
    "budget-tracker": "Budget Tracker",
    "savings-goal": "Savings Goal Planner",
    "debt-payoff": "Debt Payoff Planner",
    "bill-splitter": "Bill Splitter",
    "emergency-fund": "Emergency Fund Estimator",
    "net-worth": "Net Worth Tracker",
    "credit-cards": "Credit Card Finder"
  };

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 mb-6 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm font-semibold text-emerald-800">
          👋 Welcome back!
        </p>
        <p className="text-xs text-emerald-700 mt-1">
          Last time, you were using the{" "}
          <span className="font-semibold">
            {toolNames[lastTool] || "tools"}
          </span>{" "}
          tool. Want to pick up where you left off?
        </p>
      </div>
      <Link
        to={`/tools#${lastTool}`}
        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
      >
        Go back →
      </Link>
    </div>
  );
}
