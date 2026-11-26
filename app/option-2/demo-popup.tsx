"use client";

// Option 2's popup for every "book a demo", "talk to us" and "contact us"
// button: the same "Book your free demo" form as the hero, centred over a
// soft dimmed backdrop. Closes on the X, on Escape and on a tap outside. Once
// the request is sent, the form gives way to the result in a new, smaller popup.

import { useEffect, useState, type ReactNode } from "react";
import ContactProvider from "../components/contact";
import ReachUsForm from "./reach-us-form";
import { DemoResultCard, type DemoResult } from "./demo-result";

/** The popup provider for Option 2's pages, set to show this popup. */
export function Option2ContactProvider({ children }: { children: ReactNode }) {
  return <ContactProvider renderSheet={(close) => <DemoPopup onClose={close} />}>{children}</ContactProvider>;
}

export default function DemoPopup({ onClose }: { onClose: () => void }) {
  const [result, setResult] = useState<DemoResult | null>(null);

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
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-[#0f1a2e]/35 p-2 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      {result ? (
        // the result, as a new popup in place of the form
        <div key="result" role="dialog" aria-modal="true" aria-label={result.kind === "saved" ? "Demo request received" : "Demo already booked"} className="sheet-in my-auto w-full max-w-[520px]">
          <div className="rounded-[28px] bg-white p-1.5 shadow-[0_40px_80px_-30px_rgba(15,26,46,0.55)]">
            <DemoResultCard result={result} onClose={onClose} />
          </div>
        </div>
      ) : (
        <div key="form" role="dialog" aria-modal="true" aria-label="Book your free demo" className="sheet-in my-auto w-full max-w-[640px]">
          <div className="rounded-[28px] bg-white p-1.5 shadow-[0_40px_80px_-30px_rgba(15,26,46,0.55)] [&_form]:!pb-5 max-sm:[&_form]:!px-4">
            <ReachUsForm id="demo-popup" framed={false} onClose={onClose} onResult={setResult} />
          </div>
        </div>
      )}
    </div>
  );
}
