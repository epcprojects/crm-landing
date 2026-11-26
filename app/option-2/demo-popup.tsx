"use client";

// Option 2's popup for every "book a demo", "talk to us" and "contact us"
// button: the same "Book your free demo" form as the hero, centred over a
// soft dimmed backdrop. Closes on the X, on Escape and on a tap outside.

import { useEffect, type ReactNode } from "react";
import ContactProvider from "../components/contact";
import ReachUsForm from "./reach-us-form";

/** The popup provider for Option 2's pages, set to show this popup. */
export function Option2ContactProvider({ children }: { children: ReactNode }) {
  return <ContactProvider renderSheet={(close) => <DemoPopup onClose={close} />}>{children}</ContactProvider>;
}

export default function DemoPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // start typing straight away
    window.setTimeout(() => document.querySelector<HTMLInputElement>("#demo-popup input")?.focus(), 50);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-[#0f1a2e]/35 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label="Book your free demo" className="sheet-in my-auto w-full max-w-[640px]">
        <div className="rounded-[28px] bg-white p-1.5 shadow-[0_40px_80px_-30px_rgba(15,26,46,0.55)] [&_form]:!pb-5">
          <ReachUsForm id="demo-popup" framed={false} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
