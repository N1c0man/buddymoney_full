import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, posts } from "./postsIndex";
import RelatedCreditCardGuides from "../components/RelatedCreditCardGuides";
import ShareBar from "../components/ShareBar";
import AffiliateCalloutSmartCredit from "../components/AffiliateCalloutSmartCredit";

const SITE_URL = "https://www.buddymoney.com";

// ------------------------------------------
// Helpers
// ------------------------------------------

// Detect callout type based on first word: TIP, NOTE, WARNING, INFO
function classifyCallout(text) {
  if (!text) return null;

  const lower = String(text).toLowerCase();

  if (lower.startsWith("tip:")) return { label: "TIP", color: "emerald" };
  if (lower.startsWith("note:")) return { label: "NOTE", color: "blue" };
  if (lower.startsWith("warning:")) return { label: "WARNING", color: "red" };
  if (lower.startsWith("info:")) return { label: "INFO", color: "yellow" };

  return null;
}

// Slugify heading text for IDs / anchors
function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Convert ReactMarkdown children into plain text
function childrenToText(children) {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(childrenToText).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return childrenToText(children.props.children);
  }
  return "";
}

// Extract headings from raw markdown (##, ###, ####)
function extractHeadings(markdown = "") {
  const lines = markdown.split("\n");
  const headings = [];

  for (const line of lines) {
    const match = /^(#{2,4})\s+(.*)/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length; // 2, 3, or 4
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ level, text, id });
  }

  return headings;
}

// ------------------------------------------
// Related tools (internal links)
// ------------------------------------------

const ALL_TOOLS_LINK = {
  title: "See all BuddyMoney tools",
  description: "Explore every calculator and planner in one place.",
  path: "/tools",
};

function getRelatedTools(post) {
  if (!post) return [ALL_TOOLS_LINK];

  const slug = post.slug || "";

  // Match by slug keywords
  if (slug.includes("side-hustle")) {
    return [
      {
        title: "Budget Tracker",
        description: "Organize new side hustle income and expenses.",
        path: "/tools",
      },
      {
        title: "Emergency Fund Calculator",
        description: "Turn your extra income into a safety cushion.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  if (slug.includes("salary")) {
    return [
      {
        title: "Budget Tracker",
        description: "Put a new salary or raise to work intentionally.",
        path: "/tools",
      },
      {
        title: "Net Worth Tracker",
        description: "See the big picture of how your salary affects wealth.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  if (slug.includes("emergency-fund")) {
    return [
      {
        title: "Emergency Fund Calculator",
        description: "Dial in your ideal 3–6 month cash safety net.",
        path: "/tools",
      },
      {
        title: "Savings Goal Planner",
        description: "Create a monthly plan to reach your safety cushion.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  if (slug.includes("secured-credit")) {
    return [
      {
        title: "Credit Card Finder (Preview)",
        description:
          "Compare sample cards by credit score, type, and annual fee.",
        path: "/tools/credit-cards",
      },
      {
        title: "Budget Tracker",
        description:
          "Make room in your budget for the security deposit and payments.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  if (slug.includes("crush-credit-card-debt") || slug.includes("debt")) {
    return [
      {
        title: "Debt Payoff Planner",
        description: "Use snowball or avalanche to crush credit card debt.",
        path: "/tools",
      },
      {
        title: "Budget Tracker",
        description: "Free up cash to throw at your balances.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  // Default / fallback
  return [
    {
      title: "Budget Tracker",
      description: "Build a simple spending plan that actually works.",
      path: "/tools",
    },
    {
      title: "Emergency Fund Calculator",
      description: "Know exactly how much cash you should keep on hand.",
      path: "/tools",
    },
    ALL_TOOLS_LINK,
  ];
}

// ------------------------------------------
// Markdown component overrides
// ------------------------------------------
const markdownComponents = {
  blockquote({ node, children, ...props }) {
    const raw = childrenToText(children);
    const callout = classifyCallout(raw);

    if (callout) {
      return (
        <div
          className={`
            border-l-4 p-4 my-4 rounded-xl text-sm md:text-base shadow-sm
            bg-${callout.color}-50 border-${callout.color}-400
          `}
        >
          <strong className={`text-${callout.color}-700`}>
            {callout.label}
          </strong>
          <div className="mt-1 text-slate-700">
            {String(raw).replace(/^[^:]+:\s*/i, "")}
          </div>
        </div>
      );
    }

    // Normal blockquote styling
    return (
      <blockquote
        className="border-l-4 border-emerald-400 bg-emerald-50 px-4 py-3 rounded-xl not-italic text-sm md:text-base text-slate-800"
        {...props}
      >
        {children}
      </blockquote>
    );
  },

  // Headings with IDs so TOC links can target them
  h2({ node, children, ...props }) {
    const text = childrenToText(children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="scroll-mt-24 text-2xl md:text-3xl font-semibold text-slate-900 mt-8 mb-3"
        {...props}
      >
        {children}
      </h2>
    );
  },

  h3({ node, children, ...props }) {
    const text = childrenToText(children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="scroll-mt-24 text-xl md:text-2xl font-semibold text-slate-900 mt-6 mb-2"
        {...props}
      >
        {children}
      </h3>
    );
  },

  h4({ node, children, ...props }) {
    const text = childrenToText(children);
    const id = slugify(text);
    return (
      <h4
        id={id}
        className="scroll-mt-24 text-lg font-semibold text-slate-900 mt-5 mb-2"
        {...props}
      >
        {children}
      </h4>
    );
  },

  // Images with captions (use title or alt)
  img({ node, ...props }) {
    const { alt, title, ...rest } = props;
    const caption = title || alt;

    return (
      <figure className="my-6">
        <img
          alt={alt || ""}
          loading="lazy"
          {...rest}
          className="rounded-xl shadow-soft max-h-[420px] w-full object-cover"
        />
        {caption && (
          <figcaption className="mt-2 text-xs text-slate-500 text-center">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },
};

export default function BlogPost() {
  const { slug } = useParams();

  const post = slug ? getPostBySlug(slug) : null;

  const [markdown, setMarkdown] = useState("");
  const [headings, setHeadings] = useState([]);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Prev / next
  const currentIndex = useMemo(
    () => posts.findIndex((p) => p.slug === slug),
    [slug]
  );
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : null;

  const relatedTools = useMemo(() => getRelatedTools(post), [post]);

  // 🔹 SEO + BlogPosting + optional FAQ JSON-LD
  useEffect(() => {
    if (!post) return;

    // Title
    const title = `${post.seoTitle || post.title} | BuddyMoney`;
    document.title = title;

    // Description
    const description =
      post.metaDescription ||
      post.excerpt ||
      "Read this BuddyMoney guide to learn about budgeting, saving, debt payoff, and more in plain English.";

    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // URL
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://buddymoney.com/blog/${post.slug}`;

    // Base BlogPosting schema (array type so we can add FAQPage)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": ["BlogPosting"],
      headline: post.title,
      description,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      url,
      author: {
        "@type": "Organization",
        name: "BuddyMoney",
      },
      publisher: {
        "@type": "Organization",
        name: "BuddyMoney",
        logo: {
          "@type": "ImageObject",
          url: "https://buddymoney.com/images/buddymoney-logo.png",
        },
      },
    };

    if (post.heroImage) {
      jsonLd.image = post.heroImage;
    }
    if (post.datePublished) {
      jsonLd.datePublished = post.datePublished;
    }
    if (post.dateModified || post.lastUpdated) {
      jsonLd.dateModified = post.dateModified || post.lastUpdated;
    }

    // ✅ Valid FAQ enhancement
    if (Array.isArray(post.faq) && post.faq.length > 0) {
      // mark page as also FAQPage
      if (!jsonLd["@type"].includes("FAQPage")) {
        jsonLd["@type"].push("FAQPage");
      }

      // FAQ questions as mainEntity array
      jsonLd.mainEntity = post.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }));
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [post]);

  // Load markdown
  useEffect(() => {
    if (!post) {
      setError("We couldn’t find this article.");
      setMarkdown("");
      setHeadings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setMarkdown("");
    setHeadings([]);

    if (post.file) {
      fetch(post.file)
        .then((res) => {
          if (!res.ok) throw new Error("not-found");
          return res.text();
        })
        .then((text) => {
          setMarkdown(text);
          setHeadings(extractHeadings(text));
          setLoading(false);
        })
        .catch(() => {
          setError(
            "This article is still being written or could not be loaded."
          );
          setLoading(false);
        });
    } else {
      setError("This article does not have content yet.");
      setLoading(false);
    }
  }, [post]);

  // Share URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl || "");
  const encodedTitle = encodeURIComponent(post?.title || "BuddyMoney article");

  const handleCopyLink = async () => {
    if (!navigator?.clipboard || !shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  if (!post) {
    return (
      <main className="pt-2 lg:pt-4 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-10 sm:px-6 sm:py-12">
            <p className="text-slate-700">
              Sorry, we couldn&apos;t find that article.
            </p>
            <Link
              to="/blog"
              className="mt-4 inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-2 lg:pt-4 pb-16">
      {/* Reading progress bar */}
      <div className="fixed inset-x-0 top-0 z-[1000000] h-1 bg-sky-100/40">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-emerald-400 to-sky-500 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4">
        {/* ✅ Rounded card shell around your existing layout */}
        <section className="mt-4 rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8">
          {/* Back link */}
          <div className="mb-4">
            <Link
              to="/blog"
              className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              ← Back to articles
            </Link>
          </div>

          {/* Featured Ribbon */}
          <div className="inline-block bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md mb-2 shadow-sm">
            Featured
          </div>

          {/* Header */}
          <header className="mb-6">
            {post.tag && (
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-2">
                {post.tag}
              </p>
            )}

            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              {post.title}
            </h1>

            {/* Author line */}
            <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-3">
              {post.authorAvatar && (
                <img
                  src={post.authorAvatar}
                  alt={post.author || "BuddyMoney Editorial"}
                  className="h-8 w-8 rounded-full border border-slate-200 object-cover"
                />
              )}

              <div>
                <p>
                  By{" "}
                  <span className="font-medium text-slate-700">
                    {post.author || "BuddyMoney Editorial"}
                  </span>
                </p>
                <p className="text-[10px] text-slate-400">
                  {post.readTime && post.readTime}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
              {post.level && (
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {post.level}
                </span>
              )}
              {post.readTime && <span>{post.readTime}</span>}
            </div>
          </header>

          {/* Optional hero image */}
          {post.heroImage && (
            <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-soft mb-6">
              <img
                src={post.heroImage}
                alt={post.heroImageAlt || post.title}
                loading="lazy"
                className="w-full h-auto"
              />
              {post.heroImageAlt && (
                <figcaption className="px-4 py-3 text-xs text-slate-500">
                  {post.heroImageAlt}
                </figcaption>
              )}
            </figure>
          )}

          {/* Social share — top */}
          <ShareBar
            variant="top"
            label="Share this article"
            title={`${post.title} – BuddyMoney`}
            // pageUrl optional; if omitted it uses window.location.href
          />

          {/* MAIN GRID: Sidebar TOC + Article + Related Tools */}
          <div className="mt-4 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2.1fr)] lg:gap-10">
            {/* Sidebar TOC */}
            <aside className="mb-6 lg:mb-0 lg:self-start lg:sticky lg:top-24">
              {headings.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-[11px]">
                  <p className="mb-1 font-semibold text-slate-600 uppercase tracking-[0.18em]">
                    In this article
                  </p>
                  <ul className="space-y-1">
                    {headings.map((h) => (
                      <li key={h.id} className="leading-snug">
                        <a
                          href={`#${h.id}`}
                          className={`hover:text-emerald-600 ${
                            h.level === 2
                              ? "font-medium text-slate-700"
                              : h.level === 3
                              ? "pl-3 text-slate-600"
                              : "pl-5 text-slate-500"
                          }`}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>

            {/* Right column: Article + related tools + nav */}
            <div className="space-y-10">
              {/* Loading / Error */}
              {loading && (
                <p className="text-sm text-slate-500">Loading article...</p>
              )}
              {error && !loading && (
                <p className="text-sm text-slate-500">{error}</p>
              )}

              {/* ARTICLE BODY */}
              {!loading && !error && markdown && (
                <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl border border-slate-200 shadow-soft">
                  <article
                    className="
                    blog-article-body
                    prose prose-slate max-w-none leading-relaxed
                    prose-headings:text-slate-900
                    prose-strong:text-slate-900
                    prose-a:text-emerald-600
                    prose-blockquote:border-l-emerald-400
                    prose-li:marker:text-emerald-500
                    prose-ul:my-3
                    prose-ol:my-3
                    prose-hr:border-emerald-200
                    prose-img:rounded-xl prose-img:shadow-soft
                  "
                  >
                    <ReactMarkdown components={markdownComponents}>
                      {markdown}
                    </ReactMarkdown>
                  </article>
                </div>
              )}

              {/* Social share — bottom */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <ShareBar
                    variant="bottom"
                    label="Share this article"
                    title={`${post.title} – BuddyMoney`}
                  />
                </div>
              </div>

              {/* Related credit card guides (global block) */}
              <RelatedCreditCardGuides />

              {/* Related tools section */}
              {!loading && !error && (
                <section className="border border-slate-200 rounded-2xl bg-white/90 p-4 shadow-sm">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Related BuddyMoney tools
                  </h2>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Use these tools to put this guide into action.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {relatedTools.map((tool) => (
                      <Link
                        key={tool.title}
                        to={tool.path}
                        className="group rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 hover:border-emerald-400 hover:bg-white transition-colors"
                      >
                        <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                          {tool.title}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                          {tool.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Prev / Next navigation */}
              {(prevPost || nextPost) && (
                <nav className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
                  {prevPost && (
                    <Link
                      to={`/blog/${prevPost.slug}`}
                      className="group border border-slate-200 rounded-xl p-3 bg-slate-50/60 hover:border-emerald-400 hover:bg-white transition-colors"
                    >
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">
                        Previous
                      </p>
                      <p className="font-medium text-slate-700 group-hover:text-emerald-700 line-clamp-2">
                        {prevPost.title}
                      </p>
                    </Link>
                  )}
                  {nextPost && (
                    <Link
                      to={`/blog/${nextPost.slug}`}
                      className="group border border-slate-200 rounded-xl p-3 bg-slate-50/60 hover:border-emerald-400 hover:bg-white transition-colors text-right sm:text-left"
                    >
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1">
                        Next
                      </p>
                      <p className="font-medium text-slate-700 group-hover:text-emerald-700 line-clamp-2">
                        {nextPost.title}
                      </p>
                    </Link>
                  )}
                </nav>
              )}

              {/* Disclaimer */}
              <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
                BuddyMoney articles are for education and planning only. They
                are not financial, legal, or tax advice.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
