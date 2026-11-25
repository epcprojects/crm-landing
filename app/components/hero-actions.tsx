// The two hero buttons. The filled one moves visitors to the enquiry form;
// the outlined one goes to the booking section further down the page.

import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export default function HeroActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href="#demo-enquiry"
        className="inline-flex h-[42px] items-center bg-brand px-4 text-[16px] font-medium text-white transition-colors hover:bg-brand-hover"
      >
        Get a free demo
      </a>
      <a
        href="#start"
        className="btn-ghost inline-flex h-[42px] items-center gap-2 px-4 text-[16px] font-medium text-ink"
      >
        <CalendarBlank aria-hidden="true" weight="fill" className="size-[18px] text-ink" />
        Book a time on Calendly
      </a>
    </div>
  );
}
