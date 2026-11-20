"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CaretRight, List, X } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "../site-config";

const links = [
  { label: "Platform", href: "#product" },
  { label: "Features", href: "#client-file" },
  { label: "Agent performance", href: "#agents" },
  { label: "How it works", href: "#how-it-works" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The side sheet: lock the page behind it, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const trigger = menuButton.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
        <div
          className={`pointer-events-auto flex w-full items-center justify-between gap-2 rounded-full border bg-white/85 py-2 pl-4 pr-2 backdrop-blur-xl transition-[border-color,background-color] duration-300 sm:gap-4 sm:pl-8 sm:pr-2.5 ${
            scrolled ? "border-black/10 bg-white/90" : "border-black/[0.06]"
          }`}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex shrink-0 items-center rounded-sm"
          >
            <Image
              src="/endpoint-leads-dark.svg"
              alt={siteConfig.name}
              width={1656}
              height={708}
              priority
              className="h-12 w-auto sm:h-14"
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

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.demoHref}
              className="hidden min-h-14 items-center whitespace-nowrap rounded-full bg-brand px-8 text-[16px] font-bold text-white transition-colors hover:bg-brand-hover sm:inline-flex"
            >
              Book a free meeting
            </a>
            <button
              ref={menuButton}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-sheet"
              onClick={() => setOpen(true)}
              className="grid size-12 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-ink transition-colors hover:border-brand/40 hover:text-brand sm:size-14 lg:hidden"
            >
              <List aria-hidden="true" weight="bold" className="size-6 sm:size-7" />
            </button>
          </div>
        </div>
      </div>

      {/* the side sheet (phones and tablets) */}
      <div
        aria-hidden={!open}
        className={`pointer-events-auto fixed inset-0 z-50 lg:hidden ${
          open ? "visible" : "invisible delay-300"
        }`}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/45 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          id="site-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!open}
          className={`absolute inset-y-0 right-0 flex w-[min(88vw,22rem)] flex-col bg-white px-6 pb-8 pt-5 transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/endpoint-leads-dark.svg"
              alt={siteConfig.name}
              width={1656}
              height={708}
              className="h-10 w-auto"
            />
            <button
              ref={closeButton}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-full border border-black/10 text-ink transition-colors hover:border-brand/40 hover:text-brand"
            >
              <X aria-hidden="true" weight="bold" className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-8 flex-1">
            <ul className="divide-y divide-black/[0.07] border-y border-black/[0.07]">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center justify-between text-[18px] font-bold tracking-[-0.01em] text-ink transition-colors hover:text-brand"
                  >
                    {link.label}
                    <CaretRight
                      aria-hidden="true"
                      weight="bold"
                      className="size-4 text-ink/40"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={siteConfig.demoHref}
            onClick={() => setOpen(false)}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#5848e6] to-[#4030c9] px-8 text-[16px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(73,57,210,0.65),inset_0_1px_0_rgba(255,255,255,0.28)]"
          >
            Book a free meeting
            <ArrowRight aria-hidden="true" weight="bold" className="size-[18px]" />
          </a>
        </div>
      </div>
    </header>
  );
}
