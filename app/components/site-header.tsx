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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
        <div
          className={`pointer-events-auto flex w-full items-center justify-between gap-4 rounded-full border bg-white/85 py-2 pl-5 pr-2 backdrop-blur-xl transition-[border-color,background-color] duration-300 sm:pl-8 sm:pr-2.5 ${
            scrolled ? "border-black/10 bg-white/90" : "border-black/[0.06]"
          }`}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex items-center gap-3.5 rounded-sm"
          >
            <Image
              src="/endpoint-leads-dark.svg"
              alt={siteConfig.name}
              width={1656}
              height={708}
              priority
              className="h-11 w-auto sm:h-14"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1.5 lg:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-12 items-center rounded-full px-5 text-[16px] font-semibold text-ink/80 transition-colors hover:bg-brand/[0.07] hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={siteConfig.demoHref}
            className="inline-flex min-h-12 items-center rounded-full bg-brand px-6 text-[15px] font-bold text-white sm:min-h-14 sm:px-8 sm:text-[16px] transition-colors hover:bg-brand-hover"
          >
            Book a free meeting
          </a>
        </div>
      </div>
    </header>
  );
}
