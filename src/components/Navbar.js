import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const baseLink =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const inactive = "text-slate-700 hover:bg-emerald-50";
const active = "bg-emerald-600 text-white shadow-sm";

function desktopNavLinkClass({ isActive }) {
  return `${baseLink} ${isActive ? active : inactive}`;
}

// Desktop dropdown
function DesktopDropdown({ label, icon, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`${baseLink} ${inactive} flex items-center gap-1`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-1.5">
          {icon && <span className="text-[13px]">{icon}</span>}
          <span>{label}</span>
        </span>
        <span className="text-[10px]">▾</span>
      </button>

      <div
        className={
          "absolute left-0 top-full z-[100000] min-w-[220px] " +
          "rounded-xl border border-slate-200 bg-white shadow-lg " +
          "transition-all duration-150 ease-out " +
          (open
            ? "opacity-100 translate-y-1 visible"
            : "opacity-0 -translate-y-1 invisible")
        }
      >
        <div className="pt-1 px-2 pb-2 text-sm text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openGuides, setOpenGuides] = useState(true);
  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => {
    setOpen(false);
    setOpenGuides(true);
    setOpenAdvanced(false);
  };

  const headerBase =
    "sticky top-0 z-[99999] backdrop-blur-md transition-all duration-300";
  const headerTop = "bg-white/80 shadow-sm";
  const headerScrolled =
    "bg-white/95 shadow-md border-b border-emerald-100/80";

  return (
    <header className={`${headerBase} ${scrolled ? headerScrolled : headerTop}`}>
      {/* HEADER BAR */}
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-3 relative flex items-center justify-center md:justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobile}
          className="flex items-center"
        >
          <img
            src="/icons/BMlogo.png"
            alt="BuddyMoney Logo"
            className="h-12 md:h-16 w-auto transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={desktopNavLinkClass}>🏠 Home</NavLink>
          <span className="h-6 w-px bg-emerald-100" />
          <NavLink to="/credit-cards" className={desktopNavLinkClass}>💳 Credit Cards</NavLink>
          <span className="h-6 w-px bg-emerald-100" />
          <NavLink to="/coach" className={desktopNavLinkClass}>🎯 Budget Coach</NavLink>
          <span className="h-6 w-px bg-emerald-100" />
          <NavLink to="/mortgage" className={desktopNavLinkClass}>📊 Mortgage</NavLink>
          <span className="h-6 w-px bg-emerald-100" />
          <NavLink to="/tools" className={desktopNavLinkClass}>🧰 Tools</NavLink>
          <span className="h-6 w-px bg-emerald-100" />

          <DesktopDropdown label="Guides" icon="📚">
            <NavLink to="/blog" className={desktopNavLinkClass}>All Guides</NavLink>
            <NavLink to="/blog/emergency-fund-basics" className={desktopNavLinkClass}>Emergency Fund</NavLink>
            <NavLink to="/blog/crush-credit-card-debt" className={desktopNavLinkClass}>Credit Cards</NavLink>
          </DesktopDropdown>

          <span className="h-6 w-px bg-emerald-100" />
          <NavLink to="/blog" className={desktopNavLinkClass}>📰 Blog</NavLink>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-emerald-50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={
          "md:hidden transition-all duration-300 backdrop-blur-sm bg-white/90 " +
          (open
            ? "max-h-[80vh] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden")
        }
      >
        <div className="px-4 pb-4 grid gap-2">
          <NavLink to="/" onClick={closeMobile} className={inactive}>🏠 Home</NavLink>
          <NavLink to="/credit-cards" onClick={closeMobile} className={inactive}>💳 Credit Cards</NavLink>
          <NavLink to="/coach" onClick={closeMobile} className={inactive}>🎯 Budget Coach</NavLink>
          <NavLink to="/mortgage" onClick={closeMobile} className={inactive}>📊 Mortgage</NavLink>
          <NavLink to="/tools" onClick={closeMobile} className={inactive}>🧰 Tools</NavLink>
          <NavLink to="/blog" onClick={closeMobile} className={inactive}>📰 Blog</NavLink>
        </div>
      </div>
    </header>
  );
}
