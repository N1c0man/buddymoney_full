// src/components/SocialShare.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SocialShare({
  title,
  text,
  url,
  className = "",
  layout = "row", // "row" or "column" if you ever want a sidebar later
}) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const shareUrl = url || currentUrl;

  // If we still don't have a URL (very first render), don't render anything
  if (!shareUrl) return null;

  const shareTitle = title || "Check this out on BuddyMoney";
  const shareText = text || "I found this helpful on BuddyMoney and wanted to share it with you.";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  const encodedTitle = encodeURIComponent(shareTitle);

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const emailHref = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(
    `${shareText}\n\n${shareUrl}`
  )}`;

  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  }

  const baseButton =
    "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition-colors";

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className={`flex flex-wrap items-center gap-2 ${
          layout === "column" ? "flex-col items-stretch" : ""
        }`}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Share
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {/* X / Twitter */}
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={baseButton}
          >
            <span className="text-sm">𝕏</span>
            <span>Post</span>
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={baseButton}
          >
            <span>📘</span>
            <span>Facebook</span>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={baseButton}
          >
            <span>💼</span>
            <span>LinkedIn</span>
          </a>

          {/* Email */}
          <a href={emailHref} className={baseButton}>
            <span>✉️</span>
            <span>Email</span>
          </a>

          {/* Copy link */}
          <button type="button" onClick={handleCopy} className={baseButton}>
            <span>🔗</span>
            <span>{copied ? "Copied!" : "Copy link"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
