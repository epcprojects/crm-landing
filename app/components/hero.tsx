import { SealPercent } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "../site-config";
import { PhoneCapture } from "./contact";
import HeroSideCards from "./hero-side-cards";
import ProductShot from "./product-shot";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-wash relative overflow-hidden pb-14 pt-50 sm:pb-20 sm:pt-48"
    >
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0">
        {/* a few softly filled cells, snapped to the 48px grid from the centre */}
        {[
          { x: -9, y: 3, c: "bg-brand/[0.07]" },
          { x: -12, y: 8, c: "bg-accent/[0.12]" },
          { x: -6, y: 12, c: "bg-[#25a35a]/[0.07]" },
          { x: 8, y: 2, c: "bg-accent/[0.12]" },
          { x: 11, y: 7, c: "bg-brand/[0.06]" },
          { x: 6, y: 11, c: "bg-[#e08a1e]/[0.08]" },
          { x: -2, y: 1, c: "bg-brand/[0.05]" },
        ].map((cell) => (
          <span
            key={`${cell.x}-${cell.y}`}
            className={`hero-cell ${cell.c}`}
            style={{ left: `calc(50% + ${cell.x * 48 - 23}px)`, top: `${cell.y * 48 + 1}px` }}
          />
        ))}
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-5 sm:gap-16 sm:px-10">
        <div className="flex max-w-[880px] flex-col items-center gap-6 text-center">
          {/* the year-end offer, kept quiet: one small pill above the headline */}
          <p className="rise inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#e7e7ef] bg-white py-1.5 pl-1.5 pr-4 text-left text-[13px] font-semibold leading-snug text-ink sm:text-[14px]">
            <span className="inline-flex flex-none items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[12px] font-bold text-white">
              <SealPercent aria-hidden="true" weight="fill" className="size-3.5" />
              Offer
            </span>
            <span>
              <strong className="font-extrabold text-brand">Save 25%</strong> on
              your purchase before 31 December 2026.
            </span>
          </p>
          <h1
            id="hero-heading"
            className="max-w-[760px] text-[clamp(2.4rem,5.6vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.04em] text-balance"
          >
            <span className="line-mask">
              <span className="line-in text-ink/90">
                Manage your complete real estate business
              </span>
            </span>
            <span className="line-mask">
              <span className="line-in text-brand" style={{ animationDelay: "90ms" }}>
                from one place.
              </span>
            </span>
          </h1>
          <p
            className="rise max-w-[35rem] text-[17px] leading-[1.65] text-body text-pretty sm:text-[18px]"
            style={{ animationDelay: "120ms" }}
          >
            A solution that gives you complete transparency and control over
            your real estate business, helping you scale your business in less
            time.
          </p>
          <div className="rise w-full max-w-[540px]" style={{ animationDelay: "180ms" }}>
            <PhoneCapture cta="Get a WhatsApp demo" />
          </div>
          <p
            className="rise flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-ink/60"
            style={{ animationDelay: "220ms" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2 rounded-full bg-[#25a35a]" />
              Our team is online · replies in about {siteConfig.replyTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              or{" "}
              <a href="#start" className="font-semibold text-brand underline-offset-2 hover:underline">
                book a time on Calendly
              </a>
            </span>
          </p>
        </div>

        {/* the stage: the dashboard preview on a soft lavender panel */}
        <div className="frame-in relative w-full max-w-[1120px]">
          <div className="hero-stage rounded-[24px] border border-[#e7e7ef] px-3 py-5 sm:rounded-[36px] sm:px-10 sm:py-12 lg:py-16">
            <ProductShot maxWidth={860} />
          </div>
          <HeroSideCards group="stage" />
        </div>
        <HeroSideCards group="text" />
      </div>
    </section>
  );
}
