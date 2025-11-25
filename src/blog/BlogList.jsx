import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "./postsIndex";

export default function BlogList() {
  const [search, setSearch] = useState("");

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
    <main className="pt-2 lg:pt-4 pb-16">
      {/* ✅ Card wrapper to match the rest of the site */}
      <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white shadow-sm px-4 py-6 md:px-6 md:py-8">
        {/* Header */}
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-500 mb-3">
            Learn the Basics
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Guides for everyday money decisions
          </h1>

          <p className="text-sm md:text-base text-slate-600">
            Short, friendly guides on budgeting, saving, emergency funds,
            side hustles, and debt—written for real people, not finance pros.
          </p>
        </header>

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
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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
            ))}
          </div>
        )}

        {/* Note */}
        <p className="mt-8 text-xs text-slate-500">
          We&apos;re continuing to add more guides over time. Check back for new
          topics and deeper dives.
        </p>
      </div>
    </main>
  );
}
