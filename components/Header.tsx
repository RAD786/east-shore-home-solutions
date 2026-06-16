"use client";

/**
 * Sticky site header with responsive nav and a prominent Call Now button.
 */

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo / brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-sm font-bold text-white"
          >
            ES
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-navy">
              East Shore
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-seafoam-600">
              Home Solutions
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy/80 transition-colors hover:text-seafoam-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/contact"
            className="rounded-lg border border-navy/15 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-seafoam-500 hover:text-seafoam-600"
          >
            Free Quote
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-colors hover:bg-accent-600"
          >
            <PhoneIcon />
            {siteConfig.phone}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-navy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-navy/10 bg-white md:hidden">
          <nav
            className="mx-auto flex max-w-container flex-col gap-1 px-4 py-3"
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-base font-medium text-navy/80 hover:bg-sand-200"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-3 py-3 text-center text-base font-semibold text-navy"
              onClick={() => setOpen(false)}
            >
              <PhoneIcon />
              Call {siteConfig.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
