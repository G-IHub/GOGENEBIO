import React, { useState } from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import useActiveSection from "../hooks/useActiveSection";

const links = [
  { href: "#curriculum", label: "Curriculum", id: "curriculum" },
  { href: "#how-it-works", label: "How It Works", id: "how-it-works" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.map((l) => l.id));

  return (
    <header className="sticky top-0 z-50 bg-[#F7F7F7]/85 backdrop-blur border-b border-[#e6e1ef]">
      <div className="flex items-center justify-between px-6 lg:px-16 py-3.5">
        <Link
          to="/gogenbio"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Genomac Holdings"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-base text-[#0f0f0f]">
              GOGeneBio
            </span>
            <span className="font-data text-[9px] tracking-widest text-[#8a8598] uppercase hidden sm:block">
              A Genomac Holdings Initiative
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className={`font-landing text-sm font-medium transition ${
                active === l.id
                  ? "text-[#b241b7]"
                  : "text-[#4f4f4f] hover:text-[#b241b7]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/form" className="hidden sm:block">
            <button className="text-white py-2 px-4 font-landing font-semibold bg-linear-to-r from-[#b241b7] to-[#3d168b] rounded-full hover:bg-gradient-to-l hover:from-[#3d168b] hover:to-[#b241b7] cursor-pointer transition duration-300 text-xs lg:text-sm">
              Register Now &rarr;
            </button>
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#e6e1ef] text-[#3d168b]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#e6e1ef] bg-[#F7F7F7] px-6 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-landing text-sm font-medium py-2 ${
                active === l.id ? "text-[#b241b7]" : "text-[#4f4f4f]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <Link to="/form" onClick={() => setOpen(false)} className="mt-2">
            <button className="w-full text-white py-2.5 font-landing font-semibold bg-linear-to-r from-[#b241b7] to-[#3d168b] rounded-full text-sm">
              Register Now &rarr;
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
