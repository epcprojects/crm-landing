"use client";

// The two hero buttons. The filled one opens the same talk-to-us sheet the
// WhatsApp number field used to open; the outlined one goes to the booking
// section further down the page.

import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { useContact } from "./contact";

export default function HeroActions() {
  const { openSheet } = useContact();
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => openSheet()}
        className="inline-flex h-[42px] items-center bg-brand px-4 text-[16px] font-medium text-white transition-colors hover:bg-brand-hover"
      >
        Get a WhatsApp demo
      </button>
      <a
        href="#start"
        className="btn-ghost inline-flex h-[42px] items-center gap-2 px-4 text-[16px] font-medium text-ink"
      >
        <CalendarBlank aria-hidden="true" weight="fill" className="size-[18px] text-brand" />
        Book a time on Calendly
      </a>
    </div>
  );
}
