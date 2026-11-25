"use client";

// Option 2's menu on phones: a round menu button in the pill bar that opens a
// panel under it with the page links and the demo button. Closes on a link
// tap, on Escape and on a tap outside. Hidden from md up, where the links and
// button sit in the bar itself.

import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { useContact } from "../components/contact";

export default function MobileMenu({ links }: { links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const { openSheet } = useContact();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={box} className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="option-2-menu"
        onClick={() => setOpen((o) => !o)}
        className="grid size-10 place-items-center rounded-full bg-[#111113] text-white transition-colors hover:bg-[#2a2a2e]"
      >
        {open ? <X weight="bold" className="size-[18px]" /> : <List weight="bold" className="size-[18px]" />}
      </button>

      {/* the panel, just under the pill bar */}
      <div
        id="option-2-menu"
        className={`absolute inset-x-0 top-full mt-2 origin-top rounded-[24px] border border-black/[0.06] bg-white p-2 shadow-[0_24px_48px_-24px_rgba(17,17,19,0.4)] backdrop-blur-xl transition-[opacity,transform] duration-200 ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center rounded-2xl px-4 text-[16px] font-medium text-[#111113] transition-colors hover:bg-black/[0.04]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          onClick={() => {
            setOpen(false);
            openSheet("", "");
          }}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-2xl bg-[#111113] text-[15px] font-medium text-white transition-colors hover:bg-[#2a2a2e]"
        >
          Book your free demo
        </button>
      </div>
    </div>
  );
}
