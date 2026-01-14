// src/components/AffiliateCalloutAmazonPlanner.jsx
import React from "react";

/**
 * Amazon Budget Planner Callout (trust-first)
 * - Calm tone
 * - No price / no hype
 * - Includes required disclosure
 * - Uses rel="nofollow sponsored noopener"
 */
export default function AffiliateCalloutAmazonPlanner({
  href,
  title = "Prefer pen & paper?",
  cta = "View the budget planner on Amazon →",
  note = "As an Amazon Associate, BuddyMoney may earn from qualifying purchases.",
  className = "",
}) {
  // ✅ Put your Amazon affiliate link here OR pass via prop
  const DEFAULT_HREF = "https://amzn.to/4qkJbzI";
  const link = href || DEFAULT_HREF;

  return (
    <aside
      className={[
        "rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 md:p-5",
        "shadow-sm",
        className,
      ].join(" ")}
      aria-label="Optional budgeting tool recommendation"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-emerald-100 shadow-sm">
          <span className="text-lg" aria-hidden="true">
            ✍️
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">{title}</p>

          <p className="mt-1 text-sm text-slate-700">
            While budgeting apps and spreadsheets work well for many people, some
            find they stay more consistent when they write things down. A simple
            budget planner can help you organize your needs, wants, and savings
            in one place.
          </p>

          <a
            href={link}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
          >
            {cta}
          </a>

          <p className="mt-2 text-[11px] text-slate-500">{note}</p>
        </div>
      </div>
    </aside>
  );
}
