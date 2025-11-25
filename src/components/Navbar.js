import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const baseLink =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const inactive = "text-slate-700 hover:bg-emerald-50";
const active = "bg-emerald-600 text-white shadow-sm";

function desktopNavLinkClass({ isActive }) {
  return `${baseLink} ${isActive ? active : inactive}`;
}

// z-index scale for BuddyMoney navbar
// z-[99999]  = sticky navbar shell (above page content)
// z-[100000] = desktop dropdown menus (above sticky header + hero stuff)

// Desktop dropdown with no vertical gap + stable position + subtle motion
function DesktopDropdown({ label, children }) {
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
        <span>{label}</span>
        <span className="text-[10px]">▾</span>
      </button>

      <div
        className={
          "absolute left-0 top-full z-[100000] min-w-[220px] " +
          "rounded-xl border border-slate-200 bg-white shadow-lg " +
          "transform transition-opacity transition-transform duration-150 ease-out " +
          (open
            ? "opacity-100 translate-y-1 visible pointer-events-auto"
            : "opacity-0 -translate-y-1 invisible pointer-events-none")
        }
      >
        {/* Small padding inside instead of margin between button & menu */}
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

  // Detect scroll to change navbar background/shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
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
      <div className="max-w-6xl mx-auto px-4 py-2 md:py-3 flex items-center justify-between md:flex-nowrap">
        {/* Logo (centered on mobile, left on md+) */}
        <div className="w-full md:w-auto flex justify-center md:justify-start mb-1 md:mb-0">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMobile}
          >
            <img
              src="/icons/BMlogo.png"
              alt="BuddyMoney Logo"
              className="h-12 w-auto md:h-16 transition-transform duration-300 hover:scale-105"
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {/* Home */}
          <NavLink to="/" className={desktopNavLinkClass}>
            Home
          </NavLink>

          {/* Tools (simple link, no dropdown) */}
          <NavLink to="/tools" className={desktopNavLinkClass}>
            Tools
          </NavLink>

          {/* Guides dropdown */}
          <DesktopDropdown label="Guides">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `${baseLink} w-full text-left ${
                      isActive
                        ? active
                        : "text-slate-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  Start Here (All Guides)
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog/salary-by-age"
                  className={({ isActive }) =>
                    `${baseLink} w-full text-left ${
                      isActive
                        ? active
                        : "text-slate-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  Salary &amp; Income
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog/side-hustle-ideas"
                  className={({ isActive }) =>
                    `${baseLink} w-full text-left ${
                      isActive
                        ? active
                        : "text-slate-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  Side Hustles
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog/emergency-fund-basics"
                  className={({ isActive }) =>
                    `${baseLink} w-full text-left ${
                      isActive
                        ? active
                        : "text-slate-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  Emergency Fund
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog/crush-credit-card-debt"
                  className={({ isActive }) =>
                    `${baseLink} w-full text-left ${
                      isActive
                        ? active
                        : "text-slate-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  Crush Credit Card Debt
                </NavLink>
              </li>
            </ul>
          </DesktopDropdown>

          {/* Blog */}
          <NavLink to="/blog" className={desktopNavLinkClass}>
            Blog
          </NavLink>

          {/* Advanced Tools & Coach dropdown */}
          <DesktopDropdown label="Mortgage Payoff & Budget Coach">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/mortgage"
                  className={({ isActive }) =>
                    `${baseLink} w-full text-left ${
                      isActive
                        ? active
                        : "text-slate-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  Mortgage Calculator
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/coach"
                  className={({ isActive }) =>
                    `${baseLink} w-full text-left ${
                      isActive
                        ? active
                        : "text-slate-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  Coach
                </NavLink>
              </li>
            </ul>
          </DesktopDropdown>

          {/* About */}
          <NavLink to="/about" className={desktopNavLinkClass}>
            About
          </NavLink>
        </nav>

        {/* Mobile toggle button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              className="text-slate-700"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              className="text-slate-700"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu (animated slide + accordion) */}
      <div
        id="mobile-menu"
        className={
          "md:hidden transform transition-all duration-300 ease-out backdrop-blur-sm bg-white/80 " +
          (open
            ? "max-h-[80vh] opacity-100 overflow-y-auto translate-y-0"
            : "max-h-0 opacity-0 overflow-hidden -translate-y-2")
        }
      >
        <div className="px-4 pb-3 grid gap-2">
          {/* Home */}
          <NavLink
            to="/"
            onClick={closeMobile}
            className={({ isActive }) =>
              "block px-3 py-2 rounded-md text-base font-medium transition-colors " +
              (isActive ? active : inactive)
            }
          >
            Home
          </NavLink>

          {/* Tools */}
          <NavLink
            to="/tools"
            onClick={closeMobile}
            className={({ isActive }) =>
              "block px-3 py-2 rounded-md text-base font-medium transition-colors " +
              (isActive ? active : inactive)
            }
          >
            Tools
          </NavLink>

          {/* Guides accordion */}
          <button
            type="button"
            onClick={() => setOpenGuides((v) => !v)}
            className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"
          >
            <span>Guides</span>
            <span
              className={
                "text-xs transition-transform duration-200 " +
                (openGuides ? "rotate-90" : "")
              }
            >
              ▸
            </span>
          </button>
          <div
            className={
              "grid gap-1 transition-all duration-200 " +
              (openGuides ? "max-h-60" : "max-h-0 overflow-hidden")
            }
          >
            <Link
              to="/blog"
              onClick={closeMobile}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-emerald-50"
            >
              Start Here (All Guides)
            </Link>
            <Link
              to="/blog/salary-by-age"
              onClick={closeMobile}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-emerald-50"
            >
              Salary &amp; Income
            </Link>
            <Link
              to="/blog/side-hustle-ideas"
              onClick={closeMobile}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-emerald-50"
            >
              Side Hustles
            </Link>
            <Link
              to="/blog/emergency-fund-guide"
              onClick={closeMobile}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-emerald-50"
            >
              Emergency Fund
            </Link>
            <Link
              to="/blog/debt-payoff-guide"
              onClick={closeMobile}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-emerald-50"
            >
              Debt &amp; Credit
            </Link>
          </div>

          {/* Blog */}
          <NavLink
            to="/blog"
            onClick={closeMobile}
            className={({ isActive }) =>
              "mt-2 block px-3 py-2 rounded-md text-base font-medium transition-colors " +
              (isActive ? active : inactive)
            }
          >
            Blog
          </NavLink>

          {/* Advanced Tools & Coach accordion */}
          <button
            type="button"
            onClick={() => setOpenAdvanced((v) => !v)}
            className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400"
          >
            <span>Advanced Mortgage Calculator &amp; Coach</span>
            <span
              className={
                "text-xs transition-transform duration-200 " +
                (openAdvanced ? "rotate-90" : "")
              }
            >
              ▸
            </span>
          </button>
          <div
            className={
              "grid gap-1 transition-all duration-200 " +
              (openAdvanced ? "max-h-40" : "max-h-0 overflow-hidden")
            }
          >
            <Link
              to="/mortgage"
              onClick={closeMobile}
              className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-emerald-50"
            >
              Mortgage Calculator
            </Link>
            <NavLink
              to="/coach"
              onClick={closeMobile}
              className={({ isActive }) =>
                "block px-3 py-2 rounded-md text-sm transition-colors " +
                (isActive ? active : "text-slate-700 hover:bg-emerald-50")
              }
            >
              Coach
            </NavLink>
          </div>

          {/* About */}
          <NavLink
            to="/about"
            onClick={closeMobile}
            className={({ isActive }) =>
              "mt-2 block px-3 py-2 rounded-md text-base font-medium transition-colors " +
              (isActive ? active : inactive)
            }
          >
            About
          </NavLink>
        </div>
      </div>
    </header>
  );
}
