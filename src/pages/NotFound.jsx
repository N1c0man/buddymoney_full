import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { buildUrl } from "../utils/seo";

export default function NotFound() {
  const canonicalUrl = buildUrl("/404");

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Page Not Found | BuddyMoney</title>
        <meta
          name="description"
          content="The page you are looking for could not be found. Explore BuddyMoney tools and guides to help with budgeting, saving, and managing money."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="max-w-xl text-center bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
        <img
          src="/icons/icon-512x512.png"
          alt="BuddyMoney owl mascot"
          className="w-36 h-36 mx-auto mb-6"
        />

        <p className="text-sm font-semibold text-blue-600 mb-2">
          Error 404
        </p>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Oops! Buddy took a wrong turn 🦉
        </h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          The page you are looking for may have moved or no longer exists.
          Let&apos;s get you back to making smarter money decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="rounded-xl bg-blue-600 text-white px-5 py-3 font-semibold hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

          <Link
            to="/tools"
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Explore Tools
          </Link>

          <Link
            to="/blog"
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Read Guides
          </Link>
        </div>
      </main>
    </div>
  );
}