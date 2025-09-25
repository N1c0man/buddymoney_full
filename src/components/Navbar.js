import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkCls = ({isActive}) => 
    "px-3 py-2 rounded-md text-sm font-medium " + (isActive ? "bg-brand-600 text-white" : "text-brand-800 hover:bg-brand-100");
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '2.5rem' }}>
  <span style={{ color: '#1e3a8a' }}>Buddy</span>
  <span style={{ color: '#84cc16' }}>Money</span>
</h1>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkCls}>Home</NavLink>
          <NavLink to="/blog" className={linkCls}>Blog</NavLink>
          <NavLink to="/tools" className={linkCls}>Tools</NavLink>
          <NavLink to="/about" className={linkCls}>About</NavLink>
        </nav>
      </div>
    </header>
  );
}
