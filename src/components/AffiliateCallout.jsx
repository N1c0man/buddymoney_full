import React from "react";
import { Link } from "react-router-dom";

export default function AffiliateCallout({
  tipTitle,
  body,
  disclosure = "(affiliate link — helps support BuddyMoney at no extra cost to you)",
  ctaText = "Learn more →",
  to,
  variant = "full", // "full" | "compact"
  className = "",
}) {
  if (!to) return null;

  return (
    <div
      className={[
        "my-6 p-5 rounded-xl bg-sky-50 border border-sky-200 text-slate-800",
        className,
      ].join(" ")}
      role="note"
      aria-label="Affiliate recommendation"
    >
      {tipTitle ? (
        <p className="font-semibold mb-1 text-sky-700">💡 TIP: {tipTitle}</p>
      ) : null}

      {body ? <div className="mb-2 text-sm">{body}</div> : null}

      {disclosure ? (
        <p className="italic text-xs mb-3 text-emerald-800/90">{disclosure}</p>
      ) : null}

      {variant === "full" ? (
        <Link
          to={to}
          rel="nofollow sponsored"
          aria-label={`${ctaText} (affiliate link)`}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-600 hover:shadow-md transition"
        >
          👉 {ctaText}
        </Link>
      ) : (
        <Link
          to={to}
          rel="nofollow sponsored"
          aria-label={`${ctaText} (affiliate link)`}
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}
