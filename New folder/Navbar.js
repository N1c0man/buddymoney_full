import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkCls = ({ isActive }) =>
    "px-3 py-2 rounded-md text-sm font-medium transition-colors " +
    (isActive
      ? "bg-green-600 text-white"
      : "text-gray-700 hover:bg-green-100");

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between md:flex-nowrap">
        {/* Logo (centered on mobile, left on md+) */}
        <div className="w-full md:w-auto flex justify-center md:justify-start mb-2 md:mb-0">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <img
              src="/icons/BMlogo.png"
              alt="BuddyMoney Logo"
              className="h-14 w-auto md:h-16 drop-shadow-md transition-transform duration-300 hover:scale-105"
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkCls}>Home</NavLink>
          <NavLink to="/blog" className={linkCls}>Blog</NavLink>
          <NavLink to="/tools" className={linkCls}>Tools</NavLink>
          <NavLink to="/about" className={linkCls}>About</NavLink>
        </nav>

        {/* Mobile toggle button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-green-100 transition-colors"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Hamburger / Close icon */}
          {open ? (
            // Close (X)
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-gray-700">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            // Hamburger
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-gray-700">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu (animated expand/collapse) */}
      <div
        id="mobile-menu"
        className={
          "md:hidden overflow-hidden transition-all duration-300 " +
          (open ? "max-h-60 opacity-100" : "max-h-0 opacity-0")
        }
      >
        <div className="px-4 pb-3 grid gap-2">
          <NavLink to="/" onClick={() => setOpen(false)}
            className={({ isActive }) =>
              "block px-3 py-2 rounded-md text-base font-medium transition-colors " +
              (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
            }>
            Home
          </NavLink>
          <NavLink to="/blog" onClick={() => setOpen(false)}
            className={({ isActive }) =>
              "block px-3 py-2 rounded-md text-base font-medium transition-colors " +
              (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
            }>
            Blog
          </NavLink>
          <NavLink to="/tools" onClick={() => setOpen(false)}
            className={({ isActive }) =>
              "block px-3 py-2 rounded-md text-base font-medium transition-colors " +
              (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
            }>
            Tools
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}
            className={({ isActive }) =>
              "block px-3 py-2 rounded-md text-base font-medium transition-colors " +
              (isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-100")
            }>
            About
          </NavLink>
        </div>
      </div>
    </header>
  );
}
