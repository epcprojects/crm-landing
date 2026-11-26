"use client";

// What a visitor sees after sending the "Book your free demo" form, in its own
// popup: a green clay tick when the request is in, or an orange clay alert
// when we already have their request. Used by the hero form and by the popup
// form. Closes on Done, on the X, on Escape and on a tap outside.

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { CalendarCheck, PhoneCall, X } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "../site-config";

export type DemoResult = { kind: "saved" | "duplicate"; firstName: string; phone: string; email: string };

/** The card itself, without the backdrop (the demo popup shows it in place of its form). */
export function DemoResultCard({ result, onClose }: { result: DemoResult; onClose: () => void }) {
  const saved = result.kind === "saved";
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative flex flex-col items-center gap-5 rounded-[22px] bg-white px-6 pb-7 pt-8 text-center sm:px-9 sm:pb-9 motion-safe:animate-[pop-in_400ms_cubic-bezier(0.22,1,0.36,1)]"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-black/10 text-[#3d3d44] transition-colors hover:border-[#111113] hover:text-[#111113]"
      >
        <X weight="bold" className="size-4" />
      </button>

      {/* the clay icon on a soft halo in its own colour */}
      <span className="relative grid size-24 place-items-center">
        <span className={`absolute inset-2 rounded-full blur-xl ${saved ? "bg-[#22c55e]/25" : "bg-[#f79009]/25"}`} />
        <Image
          src={saved ? "/option-2/result-tick-white.webp" : "/option-2/result-alert-white.webp"}
          alt=""
          width={192}
          height={192}
          className="relative size-24 select-none drop-shadow-[0_10px_14px_rgba(17,17,19,0.16)] motion-safe:animate-[pop-in_500ms_cubic-bezier(0.22,1,0.36,1)]"
        />
      </span>

      <div className="flex flex-col gap-2">
        <h2 className="text-[24px] font-semibold leading-tight tracking-[-0.025em] text-[#111113] sm:text-[26px]">
          {saved ? `Thanks, ${result.firstName}. Your demo request is in!` : "You’ve already booked a demo"}
        </h2>
        <p className="mx-auto max-w-[26rem] text-[14.5px] leading-relaxed text-[#5b5b63]">
          {saved
            ? `We’ve received your details. Someone from our team usually replies within ${siteConfig.replyTime} in working hours (9–5, Monday to Saturday) to set up your free 20-minute demo.`
            : "You have already submitted a demo booking request. Our team will reach out to you in 1–2 days."}
        </p>
      </div>

      {/* what happens next, only for a new request */}
      {saved && (
        <ul className="flex w-full max-w-[26rem] flex-col gap-2 text-left">
          <li className="flex items-center gap-3 rounded-2xl bg-[#f7f8fa] px-4 py-3 text-[13.5px] text-[#3d3d44]">
            <PhoneCall weight="fill" className="size-5 flex-none text-[#16a34a]" />
            <span>
              We’ll call you on <strong className="font-semibold text-[#111113]">{result.phone}</strong>
            </span>
          </li>
          <li className="flex items-center gap-3 rounded-2xl bg-[#f7f8fa] px-4 py-3 text-[13.5px] text-[#3d3d44]">
            <CalendarCheck weight="fill" className="size-5 flex-none text-[#16a34a]" />
            <span>
              and confirm a time by email at <strong className="break-words font-semibold text-[#111113]">{result.email}</strong>
            </span>
          </li>
        </ul>
      )}

      <button
        type="button"
        onClick={onClose}
        className="inline-flex h-11 items-center rounded-full bg-[#111113] px-7 text-[14px] font-medium text-white transition-colors hover:bg-[#2a2a2e]"
      >
        Done
      </button>
    </div>
  );
}

/** The card in its own popup over a dimmed page. */
export default function DemoResultPopup({ result, onClose }: { result: DemoResult; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-[#0f1a2e]/35 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={result.kind === "saved" ? "Demo request received" : "Demo already booked"} className="sheet-in my-auto w-full max-w-[520px]">
        <div className="rounded-[28px] bg-white p-1.5 shadow-[0_40px_80px_-30px_rgba(15,26,46,0.55)]">
          <DemoResultCard result={result} onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
