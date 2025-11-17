import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-50 border-t border-green-100 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 grid gap-4 md:flex md:items-center md:justify-between">
        {/* Left side — logo or site name */}
        <Link to="/" className="text-xl font-extrabold text-green-700 hover:text-green-800 transition">
          Buddy<span className="text-blue-700">Money</span>
        </Link>

        {/* Center — nav links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <Link to="/about" className="hover:text-green-600 transition">About</Link>
          <Link to="/blog" className="hover:text-green-600 transition">Blog</Link>
          <Link to="/tools" className="hover:text-green-600 transition">Tools</Link>
          <Link to="/privacy" className="hover:text-green-600 transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-green-600 transition">Terms of Service</Link>
        </div>

        {/* Right side — copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right mt-4 md:mt-0">
          © {new Date().getFullYear()} BuddyMoney. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
