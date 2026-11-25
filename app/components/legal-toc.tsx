"use client";

// The legal pages' "On this page" list, as a sticky card beside the text.
// It highlights the section you are reading as you scroll, keeps that entry
// in view inside the card, and jumps straight to any section on a click.

import { useEffect, useRef, useState } from "react";

type Section = { id: string; text: string };

export default function LegalToc({
  sections,
  accent,
  activeBg,
  bar,
}: {
  sections: Section[];
  /** text colour of the current entry */
  accent: string;
  /** soft background of the current entry */
  activeBg: string;
  /** colour of the progress bar */
  bar: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const jumping = useRef(false);

  // follow the scroll: the current section is the last heading above the top band
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (jumping.current) return;
      const line = 200;
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      // at the very bottom, the last section is the current one
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1]?.id ?? current;
      setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
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
  }, [sections]);

  // keep the current entry visible inside the card's own scroll
  useEffect(() => {
    const box = list.current;
    const item = box?.querySelector<HTMLElement>(`[data-id="${CSS.escape(active)}"]`);
    if (!box || !item) return;
    const top = item.offsetTop - box.offsetTop;
    if (top < box.scrollTop + 8 || top + item.offsetHeight > box.scrollTop + box.clientHeight - 8) {
      box.scrollTo({ top: top - box.clientHeight / 2 + item.offsetHeight / 2, behavior: "smooth" });
    }
  }, [active]);

  const go = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActive(id);
    jumping.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
    // hold the clicked entry until the scroll has settled
    const done = () => {
      jumping.current = false;
      window.removeEventListener("scrollend", done);
    };
    window.addEventListener("scrollend", done, { once: true });
    window.setTimeout(done, reduce ? 100 : 1500);
  };

  return (
    <nav
      aria-label="On this page"
      className="sticky top-28 flex max-h-[calc(100vh-9rem)] flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_18px_40px_-24px_rgba(16,24,40,0.3)]"
    >
      <div className="flex flex-col gap-2.5 border-b border-black/[0.06] px-4 pb-3 pt-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/50">On this page</p>
        {/* how far through the document you are */}
        <span className="h-1 overflow-hidden rounded-full bg-black/[0.06]">
          <span className="block h-full rounded-full transition-[width] duration-150" style={{ width: `${progress * 100}%`, background: bar }} />
        </span>
      </div>
      <ol ref={list} className="legal-toc flex-1 space-y-0.5 overflow-y-auto p-2">
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} data-id={s.id}>
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                aria-current={on ? "location" : undefined}
                className={`block rounded-xl px-3 py-2 text-[12.5px] leading-snug transition-colors ${on ? `font-semibold ${accent} ${activeBg}` : "font-medium text-body hover:bg-black/[0.03] hover:text-ink"}`}
              >
                {s.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
