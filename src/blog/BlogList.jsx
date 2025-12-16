import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "./postsIndex";
import ShareBar from "../components/ShareBar";
import { setCanonical } from "../utils/seo";
import AffiliateCalloutSmartCredit from "../components/AffiliateCalloutSmartCredit";

// Category → left-border accent styles
const CATEGORY_STYLES = {
  "CREDIT CARDS": "border-l-4 border-l-emerald-500",
  BUDGETING: "border-l-4 border-l-sky-500",
  DEBT: "border-l-4 border-l-rose-500",
  "EMERGENCY FUND": "border-l-4 border-l-amber-500",
  INCOME: "border-l-4 border-l-indigo-500",
  SAVING: "border-l-4 border-l-lime-500",
  "SIDE HUSTLES": "border-l-4 border-l-purple-500",
  default: "border-l-4 border-l-slate-200",
};

export default function BlogList() {
  const [search, setSearch] = useState("");

  // Canonical for /blog
  useEffect(() => {
    setCanonical("/blog");
  }, []);

  // SEO + JSON-LD for Blog collection
  useEffect(() => {
    const description =
      "Browse BuddyMoney money guides: beginner-friendly articles on budgeting, saving, emergency funds, side hustles, debt payoff, and more.";

    // Set document title
    document.title = "Money Guides & Articles | BuddyMoney Blog";

    // Ensure a single meta description
    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // JSON-LD structured data (Blog + BlogPosting list)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "BuddyMoney Guides",
      url: "https://buddymoney.com/blog",
      description,
      publisher: {
        "@type": "Organization",
        name: "BuddyMoney",
        url: "https://buddymoney.com",
      },
      inLanguage: "en",
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        name: post.title,
        description: post.excerpt,
        url: `https://buddymoney.com/blog/${post.slug}`,
        articleSection: post.tag,
        timeRequired: post.readTime,
        isPartOf: {
          "@type": "Blog",
          name: "BuddyMoney Guides",
          url: "https://buddymoney.com/blog",
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => {
      const haystack = (
        post.title +
        " " +
        post.excerpt +
        " " +
        post.tag +
        " " +
        post.level
      ).toLowerCase();
      return haystack.includes(q);
    });
  }, [search]);

  return (
    <main className="pt-2 lg:pt-4 pb-16 bg-brand-50/40">
      <div className="max-w-5xl mx-auto px-4">
        {/* 👇 BLOG HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-brand-50 via-emerald-50 to-accent-100/70 px-5 py-7 md:px-8 md:py-9 shadow-soft mb-6">
          <div className="relative grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-center">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-600">
                BuddyMoney Guides
              </p>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                Learn money in plain English, one realistic guide at a time.
              </h1>

              <p className="text-sm md:text-base text-brand-800/80 max-w-xl">
                Short, friendly explainers on salary, side hustles, emergency
                funds, debt payoff, and more. No jargon, no guilt—just clear
                steps you can actually take.
              </p>

              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-emerald-700 border border-emerald-100 shadow-sm">
                  📚 Beginner–friendly
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-slate-700 border border-slate-100 shadow-sm">
                  ⏱ Most reads under 10 minutes
                </span>
              </div>
            </div>

            {/* Right info card */}
            <div className="hidden md:block">
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-soft px-4 py-4 text-sm text-slate-700">
                <p className="font-semibold mb-1 text-slate-800">
                  Not sure where to start?
                </p>
                <p className="text-xs text-slate-600 mb-2">
                  Try our guides on salary by age, side hustles, and emergency
                  funds to build a calm money foundation.
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold">
                  Scroll down to browse all guides ↓
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* 👆 END BLOG HERO */}

        <ShareBar
          variant="top"
          label="Share these money guides with someone who is learning about personal finance"
          title="BuddyMoney Blog – Money Guides & Articles"
        />

        {/* MAIN WHITE CARD WRAPPER */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8">
          {/* Header */}
          <header className="mb-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
              Learn the Basics
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Guides for everyday money decisions
            </h1>

            <p className="text-sm md:text-base text-slate-600">
              Short, friendly guides on budgeting, saving, emergency funds, side
              hustles, and debt—written for real people, not finance pros.
            </p>

          </header>
<AffiliateCalloutSmartCredit />

          {/* Search */}
          <div className="mb-8">
            <form
              className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex-1">
                <label className="sr-only" htmlFor="blog-search">
                  Search articles
                </label>
                <input
                  id="blog-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search guides (budget, debt, savings, side hustles...)"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-500 bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
              >
                Search
              </button>
            </form>
            <p className="mt-2 text-xs text-slate-500">
              Try: <span className="font-medium">budget</span>,{" "}
              <span className="font-medium">debt</span>,{" "}
              <span className="font-medium">emergency fund</span>,{" "}
              <span className="font-medium">side hustle</span>
            </p>
          </div>

          {/* Cards grid */}
          {filteredPosts.length === 0 ? (
            <p className="text-sm text-slate-500">
              No matches yet. Try a broader search like{" "}
              <span className="font-medium">budget</span> or{" "}
              <span className="font-medium">debt</span>.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredPosts.map((post) => {
                const tagKey = (post.tag || "default").toUpperCase();
                const accentClass =
                  CATEGORY_STYLES[tagKey] || CATEGORY_STYLES.default;

                return (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className={`
                      group block rounded-2xl border border-slate-200 bg-white p-4
                      shadow-sm transition-all duration-150
                      hover:-translate-y-1 hover:shadow-md hover:border-emerald-400 hover:bg-emerald-50/40
                      ${accentClass}
                    `}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
                        {post.tag}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-emerald-700">
                      {post.title}
                    </h2>

                    <p className="text-xs text-slate-600 mb-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {post.level}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <ShareBar
            variant="bottom"
            label="Share these money guides with someone who is learning about personal finance"
            title="BuddyMoney Blog – Money Guides & Articles"
          />

          {/* Note */}
          <p className="mt-8 text-xs text-slate-500">
            We&apos;re continuing to add more guides over time. Check back for
            new topics and deeper dives.
          </p>
        </div>
      </div>
    </main>
  );
}
