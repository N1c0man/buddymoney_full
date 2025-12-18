import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { setCanonical } from "../utils/seo";

const POSTS = [
  {
    title: "Emergency Fund Basics",
    slug: "emergency-fund-basics",
    excerpt: "Why every household needs one and how much you should save.",
  },
  {
    title: "Start a Budget in 10 Minutes",
    slug: "how-to-start-a-budget-in-10-minutes",
    excerpt: "A simple quick-start guide anyone can follow today.",
  },
  {
    title: "Side Hustle Income Tips",
    slug: "side-hustle-income-tips",
    excerpt: "Easy ways to earn more and boost your financial freedom.",
  },
];

export default function Blog() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCanonical("/blog");
  }, []);

  const filtered = useMemo(() => {
    if (!search) return POSTS;
    return POSTS.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Learn the Basics</h1>
      <p className="text-slate-600 mb-8">
        Beginner-friendly personal-finance guides designed to help you gain
        confidence with money.
      </p>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full max-w-md border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* Blog card grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{post.excerpt}</p>
            <span className="text-xs text-indigo-600 font-medium mt-3 inline-block">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
