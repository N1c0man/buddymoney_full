// src/components/ShareBar.jsx
import React, { useEffect, useState } from "react";

export default function ShareBar({
  variant = "top", // "top" or "bottom"
  label,          // override label text
  pageUrl,        // optional explicit URL
  title,          // optional custom share title/text
  className = "",
}) {
  const [resolvedUrl, setResolvedUrl] = useState(pageUrl || "");
  const [copied, setCopied] = useState(false);

  // Resolve URL once on mount if not provided
  useEffect(() => {
    if (!pageUrl && typeof window !== "undefined") {
      setResolvedUrl(window.location.href);
    }
  }, [pageUrl]);

  const shareUrl = resolvedUrl || pageUrl || "";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(
    title ||
      "I’m using this BuddyMoney tool to get a calm, realistic plan for my money."
  );

  async function handleCopyLink() {
    if (!shareUrl) return;
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        navigator.clipboard.writeText
      ) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  }

  const isBottom = variant === "bottom";

  // Default labels
  const effectiveLabel =
    label || (isBottom ? "Share this tool" : "Share");

  const wrapperClass = isBottom
    ? "mt-6 border-t border-slate-200 pt-4"
    : "mb-8";

  return (
    <div className={`${wrapperClass} ${className}`}>
      <div className="flex flex-wrap items-center gap-3 text-[11px] justify-between">
        <span className="uppercase tracking-[0.18em] text-slate-400 font-semibold">
          {effectiveLabel}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy page link"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:border-emerald-400 hover:bg-emerald-50/60 hover:text-emerald-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[12px] w-[12px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13.828 10.172a4 4 0 0 1 0 5.656l-3 3a4 4 0 1 1-5.656-5.656l1.172-1.172" />
              <path d="M10.172 13.828a4 4 0 0 1 0-5.656l3-3a4 4 0 1 1 5.656 5.656l-1.172 1.172" />
            </svg>
            {copied ? "Copied!" : "Copy link"}
          </button>

          {/* X / Twitter */}
          <a
            aria-label="Share on X (Twitter)"
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:border-emerald-400 hover:bg-emerald-50/60 hover:text-emerald-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[12px] w-[12px]"
              viewBox="0 0 1200 1227"
              fill="currentColor"
            >
              <path d="M714 519L1160 0H1049L659 447L370 0H0L461 687L0 1227H111L514 748L830 1227H1200L714 519Z" />
            </svg>
            X
          </a>

          {/* Facebook */}
          <a
            aria-label="Share on Facebook"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:border-emerald-400 hover:bg-emerald-50/60 hover:text-emerald-700 transition-all"
          >
            <svg
              className="h-[12px] w-[12px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12" />
            </svg>
            Facebook
          </a>

          {/* LinkedIn */}
          <a
            aria-label="Share on LinkedIn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-white hover:border-emerald-400 hover:bg-emerald-50/60 hover:text-emerald-700 transition-all"
          >
            <svg
              className="h-[12px] w-[12px]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5C3.88 3.5 3 4.4 3 5.5s.88 2 1.98 2h.02c1.1 0 2-.9 2-2s-.9-2-2.02-2zM3 8.98h4v12H3zM15.5 8.9c-2.04 0-3 1.12-3.5 1.9V9H8v12h4v-6c0-1.17.67-2.03 2-2.03 1.33 0 2 .86 2 2.03v6h4v-7.5c0-3.67-2.33-5.5-4.5-5.5z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
