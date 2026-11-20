"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "../site-config";

const links = [
  { label: "Platform", href: "#product" },
  { label: "Features", href: "#client-file" },
  { label: "Agent performance", href: "#agents" },
  { label: "How it works", href: "#how-it-works" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`pointer-events-auto mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 rounded-full border bg-white/85 py-1.5 pl-4 pr-1.5 backdrop-blur-xl transition-[border-color,background-color] duration-300 sm:pl-6 ${
          scrolled ? "border-black/10 bg-white/90" : "border-black/[0.06]"
        }`}
      >
        <Link
          href="/"
          aria-label={`${siteConfig.name} by EPC, home`}
          className="flex items-center gap-2.5 rounded-sm"
        >
          <Image
            src="/endpoint-leads-dark.svg"
            alt={siteConfig.name}
            width={1656}
            height={708}
            priority
            className="h-9 w-auto sm:h-10"
          />
          <span
            aria-hidden="true"
            className="hidden border-l border-black/15 pl-2.5 font-label text-xs tracking-[0.14em] text-ink/60 sm:block"
          >
            by EPC
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/[0.07] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={siteConfig.demoHref}
          className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-bold text-white transition-colors hover:bg-brand-hover"
        >
          Book a free meeting
        </a>
      </div>
    </header>
  );
}
