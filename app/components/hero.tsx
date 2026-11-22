import { siteConfig } from "../site-config";
import { PhoneCapture } from "./contact";
import HeroSideCards from "./hero-side-cards";
import ProductShot from "./product-shot";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#f3f1ff] to-white pt-50 sm:pt-48"
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
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-5 sm:px-10">
        <div className="flex max-w-[880px] flex-col items-center gap-6 text-center">
          <p className="rise inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[14px] font-semibold">
            <span aria-hidden="true" className="size-2 rounded-full bg-[#25a35a]" />
            Our team is online · replies in about {siteConfig.replyTime}
          </p>
          <h1
            id="hero-heading"
            className="text-[clamp(2.3rem,5.6vw,4rem)] font-extrabold leading-[1.03] tracking-[-0.035em] text-balance"
          >
            <span className="line-mask">
              <span className="line-in text-ink/90">
                Every client. Every conversation.
              </span>
            </span>
            <span className="line-mask">
              <span className="line-in text-brand" style={{ animationDelay: "90ms" }}>
                In one place.
              </span>
            </span>
          </h1>
          <p
            className="rise max-w-[36rem] text-[17px] leading-[1.7] text-body sm:text-[19px]"
            style={{ animationDelay: "120ms" }}
          >
            The CRM for real estate offices. Leave your WhatsApp number and
            we&rsquo;ll show you Endpoint Leads with your own office in mind.
          </p>
          <div className="rise w-full max-w-[560px]" style={{ animationDelay: "180ms" }}>
            <PhoneCapture cta="Get a WhatsApp demo" />
          </div>
          <p className="rise text-[13px] text-ink/60" style={{ animationDelay: "220ms" }}>
            Free · no spam · or{" "}
            <a href="#start" className="font-semibold text-brand underline-offset-2 hover:underline">
              book a time on Calendly
            </a>
          </p>
        </div>

        <div className="frame-in relative w-full max-w-[980px]">
          <ProductShot />
        </div>
        <HeroSideCards />
      </div>
    </section>
  );
}
