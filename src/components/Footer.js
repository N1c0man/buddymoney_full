import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="bg-green-50 border-t border-green-100 mt-16"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="max-w-6xl mx-auto px-6 py-8 grid gap-4 md:flex md:items-start md:justify-between">
        
        {/* Left side — logo */}
        <div itemScope itemType="https://schema.org/Organization">
          <Link
            to="/"
            className="text-xl font-extrabold text-green-700 hover:text-green-800 transition"
            itemProp="url"
          >
            <span itemProp="name">
              Buddy<span className="text-blue-700">Money</span>
            </span>
          </Link>
        </div>

        {/* Center — nav links + centered affiliate disclosure */}
        <div className="flex-1">
          <nav
            className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-600"
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
          >
            <Link to="/about" className="hover:text-green-600 transition" itemProp="url">
              About
            </Link>
            <span className="text-gray-300">|</span>

            <Link to="/blog" className="hover:text-green-600 transition" itemProp="url">
              Blog
            </Link>
            <span className="text-gray-300">|</span>

            <Link to="/tools" className="hover:text-green-600 transition" itemProp="url">
              Tools
            </Link>
            <span className="text-gray-300">|</span>

            <Link
              to="/privacy"
              className="hover:text-green-600 transition inline-flex items-center gap-1"
              itemProp="url"
            >
              <span aria-hidden="true" className="text-[10px]">⚖️</span>
              <span>Privacy Policy</span>
            </Link>
            <span className="text-gray-300">|</span>

            <Link
              to="/terms"
              className="hover:text-green-600 transition inline-flex items-center gap-1"
              itemProp="url"
            >
              <span aria-hidden="true" className="text-[10px]">⚖️</span>
              <span>Terms of Service</span>
            </Link>
            <span className="text-gray-300">|</span>

            <Link
              to="/affiliate-disclosure"
              className="hover:text-green-600 transition inline-flex items-center gap-1"
              itemProp="url"
            >
              <span aria-hidden="true" className="text-[10px]">⚖️</span>
              <span>Affiliate Disclosure</span>
            </Link>
          </nav>
          <div className="w-full text-center mt-2">
  <p className="text-sm text-slate-600">
    📩 Email:{" "}
    <a
      href="mailto:contact&#64;buddymoney&#46;com"
      className="inline-flex items-center rounded-md px-2 py-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 underline-offset-2 hover:underline transition-colors duration-150"
    >
      contact&#64;buddymoney&#46;com
    </a>
  </p>
</div>

          {/* Centered Affiliate Disclosure text */}
          <p className="text-[11px] text-gray-400 mt-3 leading-relaxed max-w-lg mx-auto text-center">
            <strong>Affiliate Disclosure:</strong> BuddyMoney may receive
            compensation from partner links on this site. This does not influence
            our recommendations. We only promote products we genuinely believe
            provide value.
          </p>
        </div>
        

        {/* Right side — copyright (unchanged) */}
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} <span itemProp="name">BuddyMoney</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
