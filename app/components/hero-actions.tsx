// The two hero buttons. The filled one opens the talk-to-us popup;
// the outlined one goes to the booking section further down the page.

import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "../site-config";
import OpenContact from "./open-contact";

export default function HeroActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <OpenContact className="inline-flex h-[42px] items-center bg-brand px-4 text-[16px] font-medium text-white transition-colors hover:bg-brand-hover">
        Get a free demo
      </OpenContact>
      <a
        href={siteConfig.calendlyUrl || "#book-demo"}
        className="btn-ghost inline-flex h-[42px] items-center gap-2 px-4 text-[16px] font-medium text-ink"
      >
        <CalendarBlank aria-hidden="true" weight="fill" className="size-[18px] text-ink" />
        Book a time on Calendly
      </a>
    </div>
  );
}
