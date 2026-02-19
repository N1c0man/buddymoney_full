import React from "react";
import { motion } from "framer-motion";

export default function WelcomeBackBanner({ lastTool }) {
  if (!lastTool) return null;

  const toolNames = {
    "budget-tracker": "Budget Tracker",
    "savings-goal": "Savings Goal Planner",
    "debt-payoff": "Debt Payoff Planner",
    "bill-splitter": "Bill Splitter",
    "emergency-fund": "Emergency Fund Estimator",
    "net-worth": "Net Worth Tracker",
    "credit-cards": "Credit Card Finder",
  };

  const scrollAndFlash = () => {
    // ✅ LOG: confirm click runs
    console.log("Go back button clicked!");
    console.log("Dispatching highlightTools event now...");

    // ✅ broadcast event to Tools.jsx listener
    const event = new CustomEvent("highlightTools");
    window.dispatchEvent(event);

    // --- existing scroll/flash logic for the actual tool section ---
    let element = document.querySelector(`#${lastTool}`);

    // if it's an inner div, move up to its parent section
    if (element && element.tagName.toLowerCase() !== "section") {
      const parentSection = element.closest("section.scroll-mt-24");
      if (parentSection) element = parentSection;
    }

    // final fallback mapping for known IDs
    if (!element) {
      const fallback = {
        "budget-tracker": "#budget",
        "savings-goal": "#savings",
        "debt-payoff": "#debt",
        "bill-splitter": "#split",
        "emergency-fund": "#emergency",
        "net-worth": "#networth",
      }[lastTool];
      if (fallback) element = document.querySelector(fallback);
    }

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // ⚡ highlight the *visible* outer section
      const target =
        element.tagName.toLowerCase() === "section"
          ? element
          : element.closest("section") || element;

      target.classList.add("animate-flashHighlight");
      setTimeout(() => target.classList.remove("animate-flashHighlight"), 1000);
    }
  };

  return (
    <motion.div
      className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 mb-6 flex items-center justify-between shadow-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <p className="text-sm font-semibold text-emerald-800">👋 Welcome back!</p>
        <p className="text-xs text-emerald-700 mt-1">
          Last time, you were using the{" "}
          <span className="font-semibold">
            {toolNames[lastTool] || "tools"}
          </span>{" "}
          tool. Want to pick up where you left off?
        </p>
      </div>

      <button
        onClick={scrollAndFlash}
        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow hover:bg-emerald-700 transition"
      >
        Go back →
      </button>
    </motion.div>
  );
}
