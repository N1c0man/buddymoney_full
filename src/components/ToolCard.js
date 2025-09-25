import React from "react";
import { Link } from "react-router-dom";

export default function ToolCard({ title, desc, to, emoji }) {
  return (
    <Link to={to} className="block rounded-2xl bg-white p-6 shadow-soft hover:shadow-lg transition">
      <div className="text-3xl">{emoji}</div>
      <h3 className="mt-3 font-bold text-lg text-brand-900">{title}</h3>
      <p className="text-sm text-brand-800/80 mt-1">{desc}</p>
    </Link>
  );
}
