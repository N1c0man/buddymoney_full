import React from "react";
import { Link } from "react-router-dom";
import { postsIndex } from "./postsIndex";

export default function BlogList() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-6">BuddyMoney Blog</h1>
      <p className="text-gray-600 mb-8">
        Friendly, beginner-first money guides to help you budget, save, and grow.
      </p>

      <ul className="space-y-6">
        {postsIndex.map((p) => (
          <li key={p.slug} className="border rounded-xl p-5 hover:shadow-sm">
            <h2 className="text-2xl font-bold">
              <Link to={`/blog/${p.slug}`} className="text-blue-800 hover:underline">
                {p.title}
              </Link>
            </h2>
            <div className="text-gray-500 text-sm mt-1">{new Date(p.date).toDateString()}</div>
            <p className="mt-3 text-gray-700">{p.description}</p>
            <div className="mt-4">
              <Link to={`/blog/${p.slug}`} className="text-green-600 font-semibold hover:underline">
                Read article →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
