import React from "react";
import { NavLink } from "react-router-dom";

export default function AppBottomNav() {
  const navItems = [
    { to: "/app", label: "Home", icon: "🏠" },
    { to: "/tools/budget-coach", label: "Budget", icon: "🧠" },
    { to: "/tools/debt-payoff", label: "Debt", icon: "🎯" },
    { to: "/tools/credit-cards", label: "Cards", icon: "💳" },
  ];

  return (
    <>
      {/* Spacer so content is not hidden behind nav */}
      <div className="h-20" />

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
        <div className="mx-auto grid max-w-md grid-cols-4 px-2 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-xs font-semibold transition ${
                  isActive
                    ? "bg-sky-100 text-sky-700"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`
              }
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}