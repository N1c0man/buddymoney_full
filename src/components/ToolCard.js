import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ToolCard({ to, title, emoji, desc }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group h-full"
    >
      <Link
        to={to}
        className="flex h-full flex-col rounded-2xl border border-emerald-100 bg-white/90 p-4 sm:p-5 shadow-sm transition-shadow group-hover:shadow-md group-hover:border-emerald-200"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-2xl transition-transform group-hover:scale-110">
              {emoji}
            </span>
            <h3 className="text-base font-semibold text-slate-900">
              {title}
            </h3>
          </div>
          <span className="text-xs font-medium text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
            Open →
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-600 flex-1">{desc}</p>

        <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-700/80">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Free BuddyMoney tool</span>
        </div>
      </Link>
    </motion.div>
  );
}
