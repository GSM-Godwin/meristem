"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png"; // ← your logo path

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── STICKY NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50">

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-5 md:px-10 lg:px-20 h-22 bg-primarybg">

          <Link href="/">
            <Image src={logo} alt="Meristem Family Office" height={48} priority />
          </Link>

          {/* Contact Us — hidden on mobile */}
          <Link
            href="/contact"
            className="hidden md:block px-5 py-2 text-sm border border-yellow bg-white text-[#6B3A1F] hover:bg-[#6B3A1F] hover:text-white transition-colors duration-200"
          >
            Contact Us
          </Link>

          {/* Hamburger — visible on mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.25 p-3 z-51 relative touch-manipulation"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-yellow rounded transition-transform duration-300 pointer-events-none ${mobileOpen ? "translate-y-1.75 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-yellow rounded transition-opacity duration-300 pointer-events-none ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-yellow rounded transition-transform duration-300 pointer-events-none ${mobileOpen ? "translate-y-[1.75 -rotate-45" : ""}`} />
          </button>

        </div>

        {/* BOTTOM BAR — desktop only */}
        <nav className="hidden md:flex items-center justify-end px-5 md:px-10 lg:px-20 h-12 bg-yellow gap-2">
          <Link href="/about" className="px-5 h-12 flex items-center text-white text-[16px] hover:opacity-75 transition-opacity">
            About Us
          </Link>
          <Link href="/insights" className="px-5 h-12 flex items-center text-white text-[16px] hover:opacity-75 transition-opacity">
            Insights
          </Link>
          <Link href="/perspectives" className="pl-5 h-12 flex items-center text-white text-[16px] hover:opacity-75 transition-opacity">
            Perspectives
          </Link>
        </nav>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <nav className="md:hidden flex flex-col bg-[#F8F3EC] border-t border-[#6B3A1F]/10">
            <Link
              href="/about"
              className="px-6 py-4 text-[#3B2314] font-medium text-base border-b border-[#6B3A1F]/10 hover:bg-[#6B3A1F]/5"
              onClick={() => setMobileOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/insights"
              className="px-6 py-4 text-[#3B2314] font-medium text-base border-b border-[#6B3A1F]/10 hover:bg-[#6B3A1F]/5"
              onClick={() => setMobileOpen(false)}
            >
              Insights
            </Link>
            <Link
              href="/perspectives"
              className="px-6 py-4 text-[#3B2314] font-medium text-base border-b border-[#6B3A1F]/10 hover:bg-[#6B3A1F]/5"
              onClick={() => setMobileOpen(false)}
            >
              Perspectives
            </Link>

            {/* Contact Us inside mobile menu */}
            <div className="p-6">
              <Link
                href="/contact"
                className="block text-center px-5 py-2 text-sm border border-[#6B3A1F] text-[#6B3A1F] hover:bg-[#6B3A1F] hover:text-white transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}

      </header>

      {/* Spacer — pushes content below the fixed navbar */}
      <div className="h-32 md:h-32" />
    </>
  );
}