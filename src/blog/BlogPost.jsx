import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import { getPostBySlug, posts } from "./postsIndex";
import RelatedCreditCardGuides from "../components/RelatedCreditCardGuides";
import ShareBar from "../components/ShareBar";
import AffiliateCalloutSmartCredit from "../components/AffiliateCalloutSmartCredit";
import { setCanonical } from "../utils/seo";

/* ------------------------------------------
   Strip frontmatter (--- ... ---) from markdown
------------------------------------------ */
function stripFrontmatter(raw) {
  const FRONTMATTER_REGEX = /^---\s*[\s\S]*?---\s*/;
  const match = raw.match(FRONTMATTER_REGEX);
  if (!match) return raw;
  return raw.slice(match[0].length);
}

const SITE_URL = "https://www.buddymoney.com";

/* ------------------------------------------
   Helpers
------------------------------------------ */

// Detect callout type based on first word
function classifyCallout(text) {
  if (!text) return null;
  const lower = String(text).toLowerCase();
  if (lower.startsWith("tip:")) return { label: "TIP", color: "emerald" };
  if (lower.startsWith("note:")) return { label: "NOTE", color: "blue" };
  if (lower.startsWith("warning:")) return { label: "WARNING", color: "red" };
  if (lower.startsWith("info:")) return { label: "INFO", color: "yellow" };
  return null;
}

// Slugify heading for anchor links
function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Convert ReactMarkdown children to plain text
function childrenToText(children) {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children?.props?.children) return childrenToText(children.props.children);
  return "";
}

// Extract ##, ###, #### headings
function extractHeadings(markdown = "") {
  const lines = markdown.split("\n");
  const headings = [];

  for (const line of lines) {
    const match = /^(#{2,4})\s+(.*)/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ level, text, id });
  }
  return headings;
}

/* ------------------------------------------
   Related Tools
------------------------------------------ */

const ALL_TOOLS_LINK = {
  title: "See all BuddyMoney tools",
  description: "Explore every calculator and planner in one place.",
  path: "/tools",
};

function getRelatedTools(post) {
  if (!post) return [ALL_TOOLS_LINK];
  const slug = post.slug || "";

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
        description: "See your finances from a higher level.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  if (slug.includes("emergency-fund")) {
    return [
      {
        title: "Emergency Fund Calculator",
        description: "Dial in your ideal 3–6 month safety net.",
        path: "/tools",
      },
      {
        title: "Savings Goal Planner",
        description: "Create a plan to reach your cushion.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  if (slug.includes("secured-credit")) {
    return [
      {
        title: "Credit Card Finder (Preview)",
        description: "Compare real cards by score, type, annual fee.",
        path: "/tools/credit-cards",
      },
      {
        title: "Budget Tracker",
        description: "Make room for the deposit and payments.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  if (slug.includes("crush-credit-card-debt") || slug.includes("debt")) {
    return [
      {
        title: "Debt Payoff Planner",
        description: "Use snowball or avalanche to pay off balances.",
        path: "/tools",
      },
      {
        title: "Budget Tracker",
        description: "Free cash to accelerate payoff.",
        path: "/tools",
      },
      ALL_TOOLS_LINK,
    ];
  }

  return [
    {
      title: "Budget Tracker",
      description: "Build a simple spending plan.",
      path: "/tools",
    },
    {
      title: "Emergency Fund Calculator",
      description: "Know how much you should keep on hand.",
      path: "/tools",
    },
    ALL_TOOLS_LINK,
  ];
}

/* ------------------------------------------
   Markdown component overrides
------------------------------------------ */

const markdownComponents = {
  blockquote({ children }) {
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
          <strong className={`text-${callout.color}-700`}>{callout.label}</strong>
          <div className="mt-1 text-slate-700">
            {String(raw).replace(/^[^:]+:\s*/i, "")}
          </div>
        </div>
      );
    }

    return (
      <blockquote className="border-l-4 border-emerald-400 bg-emerald-50 px-4 py-3 rounded-xl text-sm md:text-base text-slate-800">
        {children}
      </blockquote>
    );
  },

  h2({ children }) {
    const text = childrenToText(children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="scroll-mt-24 text-2xl md:text-3xl font-semibold text-slate-900 mt-8 mb-3"
      >
        {children}
      </h2>
    );
  },

  h3({ children }) {
    const text = childrenToText(children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="scroll-mt-24 text-xl md:text-2xl font-semibold text-slate-900 mt-6 mb-2"
      >
        {children}
      </h3>
    );
  },

  h4({ children }) {
    const text = childrenToText(children);
    const id = slugify(text);
    return (
      <h4
        id={id}
        className="scroll-mt-24 text-lg font-semibold text-slate-900 mt-5 mb-2"
      >
        {children}
      </h4>
    );
  },

  img({ alt, title, ...props }) {
    const caption = title || alt;

    return (
      <figure className="my-6">
        <img
          alt={alt || ""}
          loading="lazy"
          {...props}
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

  // External link handling: add rel="nofollow sponsored" + new tab
  a({ href, children, ...props }) {
    const isExternal =
      href && /^https?:\/\//i.test(href) && !href.includes("buddymoney.com");

    return (
      <a
        href={href}
        {...props}
        {...(isExternal
          ? {
              target: "_blank",
              rel: "nofollow sponsored noopener noreferrer",
            }
          : {})}
        className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
      >
        {children}
      </a>
    );
  },
};

/* ------------------------------------------
   Component
------------------------------------------ */

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;

  // ✅ Stable canonical URL (www + slug)
  const canonicalUrl = useMemo(() => {
    if (!slug) return `${SITE_URL}/blog`;
    return `${SITE_URL}/blog/${slug}`;
  }, [slug]);

  // Canonical tag (DOM helper)
  useEffect(() => {
    if (!slug) return;
    setCanonical(`/blog/${slug}`);
  }, [slug]);

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

  // Auto SmartCredit logic: show on credit/debt/secured posts
  const isCreditIntent = useMemo(() => {
    if (!post) return false;
    const s = (post.slug || "").toLowerCase();
    const t = (post.tag || "").toLowerCase();
    return (
      s.includes("credit") ||
      s.includes("debt") ||
      s.includes("secured") ||
      t.includes("credit") ||
      t.includes("debt")
    );
  }, [post]);

  // ✅ NEW: personalize CTA text based on article intent
  const smartCreditIntent = useMemo(() => {
    if (!post) return "general";
    const s = (post.slug || "").toLowerCase();
    const t = (post.tag || "").toLowerCase();

    if (s.includes("debt") || t.includes("debt")) return "debt";

    // "secured" or "rebuild" intent
    if (
      s.includes("secured") ||
      s.includes("rebuild") ||
      s.includes("rebuilding") ||
      s.includes("bad-credit") ||
      t.includes("credit")
    ) {
      return "rebuild";
    }

    // "cards" intent
    if (
      s.includes("credit-card") ||
      s.includes("credit-cards") ||
      s.includes("cards")
    ) {
      return "cards";
    }

    return "general";
  }, [post]);

  /* ------------------------------------------
     SEO + JSON-LD
  ------------------------------------------ */
  useEffect(() => {
    if (!post) return;

    const title = `${post.seoTitle || post.title} | BuddyMoney`;
    document.title = title;

    const description =
      post.metaDescription ||
      post.excerpt ||
      "Read this BuddyMoney guide to learn about budgeting, saving, debt payoff, and more.";

    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
    else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // ✅ Use stable canonical URL (not window.location.href)
    const url = canonicalUrl;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": ["BlogPosting"],
      headline: post.title,
      description,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      author: { "@type": "Organization", name: "BuddyMoney" },
      publisher: {
        "@type": "Organization",
        name: "BuddyMoney",
        logo: {
          "@type": "ImageObject",
          url: "https://www.buddymoney.com/images/buddymoney-logo.png",
        },
      },
    };

    if (post.heroImage) jsonLd.image = post.heroImage;
    if (post.datePublished) jsonLd.datePublished = post.datePublished;
    if (post.dateModified || post.lastUpdated)
      jsonLd.dateModified = post.dateModified || post.lastUpdated;

    // FAQ schema
    if (Array.isArray(post.faq) && post.faq.length > 0) {
      jsonLd["@type"].push("FAQPage");
      jsonLd.mainEntity = post.faq.map((q, i) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
        url: `${url}#faq-${i + 1}`,
      }));
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => script.remove();
  }, [post, canonicalUrl]);

  /* ------------------------------------------
     Load Markdown (strip frontmatter)
  ------------------------------------------ */
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

    if (post.file) {
      fetch(post.file)
        .then((res) => {
          if (!res.ok) throw new Error("not-found");
          return res.text();
        })
        .then((text) => {
          const cleaned = stripFrontmatter(text);
          setMarkdown(cleaned);
          setHeadings(extractHeadings(cleaned));
          setLoading(false);
        })
        .catch(() => {
          setError("This article is still being written or could not be loaded.");
          setLoading(false);
        });
    } else {
      setError("This article does not have content yet.");
      setLoading(false);
    }
  }, [post]);

  /* ------------------------------------------
     Sharing
  ------------------------------------------ */
  useEffect(() => {
    // ✅ Share stable canonical URL
    setShareUrl(canonicalUrl);
  }, [canonicalUrl]);

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

  /* ------------------------------------------
     Not Found State
  ------------------------------------------ */
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

  /* ------------------------------------------
     MAIN RENDER
  ------------------------------------------ */
  return (
    <>
      {/* ✅ This is what fixes “User-declared canonical: None” in GSC */}
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <main className="pt-2 lg:pt-4 pb-16">
        {/* Progress bar */}
        <div className="fixed inset-x-0 top-0 z-[1000000] h-1 bg-sky-100/40">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-emerald-400 to-sky-500 transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <section className="mt-4 rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8">
            {/* Back */}
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

              {/* Author */}
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

              {/* Tags */}
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

            {/* Hero Image */}
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

            {/* Auto SmartCredit callout for credit/debt posts */}
            {isCreditIntent && (
              <div className="mb-6">
                <AffiliateCalloutSmartCredit intent={smartCreditIntent} />
              </div>
            )}

            {/* Social share top */}
            <ShareBar
              variant="top"
              label="Share this article"
              title={`${post.title} – BuddyMoney`}
            />

            {/* Main layout grid */}
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

              {/* Article column */}
              <div className="space-y-10">
                {/* Loader / error */}
                {loading && <p className="text-sm text-slate-500">Loading article...</p>}
                {error && !loading && <p className="text-sm text-slate-500">{error}</p>}

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

                {/* Share bottom */}
                <div className="mb-8">
                  <ShareBar
                    variant="bottom"
                    label="Share this article"
                    title={`${post.title} – BuddyMoney`}
                  />
                </div>

                {/* Related credit card guides */}
                <RelatedCreditCardGuides />

                {/* Related tools */}
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

                {/* FAQs */}
                {!loading && !error && Array.isArray(post.faq) && post.faq.length > 0 && (
                  <section className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 shadow-sm">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 mb-3">
                      Frequently asked questions
                    </h2>

                    <div className="space-y-3">
                      {post.faq.map((item, idx) => (
                        <details
                          key={`${post.slug}-faq-${idx}`}
                          className="group rounded-xl border border-sky-200 bg-white/80 px-4 py-3"
                        >
                          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800 group-hover:text-sky-700 flex items-center justify-between">
                            {item.question}
                            <span className="ml-2 text-sky-500 group-open:rotate-180 transition-transform">
                              ▼
                            </span>
                          </summary>

                          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </details>
                      ))}
                    </div>
                  </section>
                )}

                {/* Prev / Next */}
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
    </>
  );
}
