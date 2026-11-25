"use client";

// A small arrow button pinned to the bottom right that takes you back to the
// top. It appears once the page's first section (the hero) has scrolled out
// of view. Home pages use a softly rounded square; Option 2 a full circle.

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

export default function BackToTop({ shape = "rounded" }: { shape?: "rounded" | "circle" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const hero = document.querySelector("main section");
      const past = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > window.innerHeight;
      setShow(past);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={toTop}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-5 right-5 z-40 grid size-12 place-items-center bg-gradient-to-b from-[#3a3a44] to-[#0a0a0d] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_28px_-12px_rgba(10,10,13,0.7)] transition-[opacity,transform,filter] duration-300 hover:brightness-125 sm:bottom-7 sm:right-7 ${
        shape === "circle" ? "rounded-full" : "rounded-xl"
      } ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <ArrowUp weight="bold" className="size-5" />
    </button>
  );
}
