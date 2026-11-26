"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CaretRight, List, X } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "../site-config";
import OpenContact from "./open-contact";

// one link per section on the landing page, in page order
const links = [
  { label: "Platform", href: "/#platform" },
  { label: "Why us", href: "/#benefits" },
  { label: "See how it works", href: "/#features" },
  { label: "FAQ", href: "/#faq" },
];

export default function SiteHeader() {
  // on a landing page (/ or /option-2) section links stay on that page;
  // anywhere else they go to the home page
  const pathname = usePathname();
  const onLanding = pathname === "/" || pathname === "/option-2";
  const to = (href: string) => (onLanding && href.startsWith("/#") ? href.slice(1) : href);
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* announcement: folds away once you scroll */}
      <div
        className={`pointer-events-auto overflow-hidden bg-ink text-white transition-[max-height,opacity] duration-300 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
        }`}
      >
        <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2.5 gap-y-1 px-5 py-2.5 text-center text-[13px] sm:text-[14px]">
          <span aria-hidden="true" className="size-2 rounded-full bg-[#25a35a]" />
          Now onboarding real estate offices in {siteConfig.city}.
          <a
            href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Demo for my real estate office")}`}
            className="font-bold text-[#c9c3ff] hover:text-white"
          >
            Email us to book your demo →
          </a>
        </p>
      </div>
      {/* a plain full-width bar: logo left, links centred, two buttons right */}
      <div
        className={`pointer-events-auto w-full border-b bg-white/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
          scrolled ? "border-[#eceef4] shadow-[0_8px_24px_-20px_rgba(21,21,27,0.35)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:h-[72px] sm:px-10">
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
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center justify-center gap-2 lg:flex"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={to(link.href)}
                className="inline-flex min-h-10 items-center rounded-xl px-4 text-[16px] text-ink transition-colors hover:bg-black/[0.04]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="col-start-3 flex items-center justify-end gap-2.5">
            <OpenContact className="hidden h-[42px] items-center whitespace-nowrap bg-brand px-4 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover sm:inline-flex">
              Book your free demo
            </OpenContact>
            <button
              ref={menuButton}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-sheet"
              onClick={() => setOpen(true)}
              className="btn-ghost grid size-[42px] shrink-0 place-items-center text-ink lg:hidden"
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
                  <Link
                    href={to(link.href)}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center justify-between text-[18px] font-bold tracking-[-0.01em] text-ink transition-colors hover:text-brand"
                  >
                    {link.label}
                    <CaretRight
                      aria-hidden="true"
                      weight="bold"
                      className="size-4 text-ink/40"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <OpenContact
            onClick={() => setOpen(false)}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-b from-[#5848e6] to-[#4030c9] px-8 text-[16px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(73,57,210,0.65),inset_0_1px_0_rgba(255,255,255,0.28)]"
          >
            Book your free demo
            <ArrowRight aria-hidden="true" weight="bold" className="size-[18px]" />
          </OpenContact>
        </div>
      </div>
    </header>
  );
}
