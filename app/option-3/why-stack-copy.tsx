"use client";

// A copy of the "Why Endpoint Leads" card deck (why-stack.tsx), kept hidden
// on the page for now. Switch it on with SHOW_WHY_COPY in option-two-page.tsx.
// It has its own ids, so it can sit next to the original without clashing.
//
// Option 3 "Why Endpoint Leads", built like the reference's sticky card deck.
// The section is tall; inside it a full-screen stage stays pinned while you
// scroll. A giant faint line of words drifts sideways behind the heading,
// and the cards stack up: each new card rises from below and fades in, while
// the ones already shown step back, a little smaller and lower, so their
// coloured edges peek out under the front card. Every name, office and number is sample
// data, the same kind used elsewhere on the site.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Star } from "@phosphor-icons/react/dist/ssr";

const cards = [
  {
    tag: "All conversations in one place",
    value: "1",
    unit: "file per client",
    quote: "Every WhatsApp, call and note sits on the client’s file. Anyone in the office can pick up where the last agent left off.",
    name: "Imran Siddiqui",
    role: "Owner · Siddiqui Estates, Lahore",
    image: "/option-2/why-1.webp",
    bg: "#e6e0f3",
  },
  {
    tag: "Never miss a follow-up",
    value: "96%",
    unit: "follow-ups done on time",
    quote: "Each next step has a date and an owner. Late ones turn red, so nothing quietly slips past us any more.",
    name: "Nadia Farooq",
    role: "Senior agent · Farooq Realty, Karachi",
    image: "/option-2/why-2.webp",
    bg: "#dcebe2",
  },
  {
    tag: "Complete visibility into your agents",
    value: "4",
    unit: "min average first reply",
    quote: "I can see who replies fast and who is closing, without asking anyone. Our reply times dropped in the first month.",
    name: "Ahmed Javed",
    role: "Sales manager · Skyline Towers, Islamabad",
    image: "/option-2/why-3.webp",
    bg: "#d9e7f6",
  },
  {
    tag: "Understand business performance",
    value: "1,248",
    unit: "enquiries handled this month",
    quote: "Leads, visits and closed deals per project in one view. Our Monday meeting now takes ten minutes.",
    name: "Rabia Anwar",
    role: "Office manager · Anwar Properties, Rawalpindi",
    image: "/option-2/why-4.webp",
    bg: "#f3e3d6",
  },
  {
    tag: "Manage it from anywhere",
    value: "0",
    unit: "apps to install",
    quote: "I update clients from the site visit itself. The same file opens on my phone and on the office laptop.",
    name: "Danish Iqbal",
    role: "Agent · City Rentals, Lahore",
    image: "/option-2/why-5.webp",
    bg: "#efe6cf",
  },
];

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

export default function WhyStackCopy() {
  const wrap = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLOListElement>(null);
  // how far a waiting card sits below its landing spot: just past the bottom
  // edge of the screen, so on any screen height it slides in from below
  // instead of appearing halfway up a tall screen
  const [rise, setRise] = useState(900);
  // 0 when the stage pins, cards.length - 1 when the last card has landed
  const [p, setP] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once on mount
    setReduce(reduced);
    let raf = 0;
    let shown = 0; // the position drawn on screen
    let target = 0; // the position the scroll asks for
    const read = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const t = run > 0 ? clamp(-r.top / run, 0, 1) : 0;
      target = t * (cards.length - 1);
      const d = deck.current;
      if (d) setRise(Math.max(240, window.innerHeight - d.getBoundingClientRect().top + 24));
    };
    // ease the drawn position toward the scroll position every frame, so a
    // fast trackpad swipe still shows the cards sliding instead of jumping
    const tick = () => {
      raf = 0;
      const gap = target - shown;
      shown = Math.abs(gap) < 0.002 || reduced ? target : shown + gap * 0.14;
      setP(shown);
      if (shown !== target) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      read();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    read();
    shown = target;
    setP(shown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // with reduced motion, show the last state: all cards stacked
  const pos = reduce ? cards.length - 1 : p;

  return (
    <section id="benefits-copy" aria-labelledby="why-heading-copy" className="scroll-mt-20">
      {/* tall track: one screen per card */}
      {/* tall track: a full screen of scrolling per card, so each card gets time on screen */}
      <div ref={wrap} className="relative" style={{ height: `${cards.length * 100 + 40}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-[72px] sm:px-10 sm:pb-10 sm:pt-24 [@media(min-width:1024px)_and_(max-height:820px)]:!pb-8 [@media(min-width:1024px)_and_(max-height:820px)]:!pt-20">
          {/* giant faint words drifting sideways */}
          <p
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(7rem,16vw,13rem)] font-semibold leading-none tracking-[-0.05em] text-[#111113]/[0.05] will-change-transform"
            style={{ transform: `translate(${-pos * 22}vw, -50%)` }}
          >
            Why offices choose Endpoint Leads
          </p>

          {/* heading */}
          <div className="relative mb-5 flex flex-col items-center gap-3 text-center sm:mb-10 sm:gap-5 [@media(min-width:1024px)_and_(max-height:820px)]:!mb-6 [@media(min-width:1024px)_and_(max-height:820px)]:!gap-3">
            <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[13px] font-medium text-[#111113] [@media(max-width:639px)_and_(max-height:740px)]:hidden">Why Endpoint Leads</span>
            <h2 id="why-heading-copy" className="text-[clamp(1.75rem,8vw,2.1rem)] sm:text-[clamp(2.1rem,4.4vw,3.5rem)] [@media(min-width:1024px)_and_(max-height:820px)]:!text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">
              Everything your office needs,
              <br className="hidden sm:block" /> without the{" "}
              <span className="relative inline-block">
                chasing
                <svg aria-hidden="true" viewBox="0 0 240 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full">
                  <defs>
                    <linearGradient id="why-underline-copy" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0" stopColor="#4ade80" />
                      <stop offset="1" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                  <path d="M4 14 C 60 6, 150 4, 236 9" pathLength={1} fill="none" stroke="url(#why-underline-copy)" strokeWidth="6" strokeLinecap="round" className="underline-draw" />
                </svg>
              </span>
            </h2>
          </div>

          {/* the card deck */}
          <ol ref={deck} className="relative grid w-full max-w-[860px]">
            {cards.map((c, i) => {
              const d = pos - i; // < 0 still to come, 0 in front, > 0 behind
              let transform: string;
              let opacity = 1;
              if (d < 0) {
                // still to come: waits just below the screen and slides up into place
                const k = clamp(-d, 0, 1); // 1 = fully below, 0 = landed
                transform = `translateY(${k * rise}px)`;
                opacity = k >= 1 ? 0 : 1;
              } else {
                // already shown: steps back, lower and smaller, so its edge shows
                const depth = Math.min(d, 3.4);
                transform = `translateY(${depth * 14}px) scale(${1 - depth * 0.05})`;
                opacity = d > 3.4 ? 0 : 1;
              }
              return (
                <li
                  key={c.name}
                  aria-hidden={Math.round(pos) !== i}
                  className="relative [grid-area:1/1] will-change-transform"
                  style={{
                    transform,
                    transformOrigin: "50% 100%",
                    opacity,
                    zIndex: i,
                  }}
                >
                  <figure
                    className="grid gap-3 rounded-[24px] p-2.5 sm:rounded-[28px] shadow-[0_30px_60px_-40px_rgba(17,17,19,0.45)] sm:grid-cols-[300px_minmax(0,1fr)] sm:gap-8 sm:p-4"
                    style={{ backgroundColor: c.bg }}
                  >
                    <div className="relative h-[clamp(88px,calc(100svh-590px),180px)] overflow-hidden rounded-[18px] sm:h-[370px] sm:rounded-[20px] [@media(min-width:1024px)_and_(max-height:820px)]:!h-[290px]">
                      <Image src={c.image} alt="" fill sizes="(min-width: 640px) 300px, 100vw" className="object-cover object-top" />
                    </div>
                    <div className="flex flex-col gap-3 px-1.5 pb-1.5 sm:gap-5 sm:px-0 sm:py-4 sm:pr-7 [@media(min-width:1024px)_and_(max-height:820px)]:!gap-3 [@media(min-width:1024px)_and_(max-height:820px)]:!py-2">
                      {/* the benefit as a pill, with its big clay icon on the right */}
                      <div className="flex items-start justify-between gap-4">
                        <span className="mt-1 rounded-full border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.35)_100%)] px-3.5 py-1.5 text-[13.5px] font-medium text-[#111113] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_-10px_rgba(17,17,19,0.35)] backdrop-blur-md backdrop-saturate-150">
                          {c.tag}
                        </span>
                        <Image src={`/option-2/why-icon-${i + 1}.webp`} alt="" width={160} height={160} className="-mr-1 -mt-1 size-12 flex-none sm:-mt-2 sm:size-16 mix-blend-multiply sm:-mb-6 sm:size-20" />
                      </div>
                      <p className="flex flex-wrap items-baseline gap-x-3">
                        <span className="text-[2.25rem] sm:text-[clamp(2.6rem,5vw,3.75rem)] [@media(min-width:1024px)_and_(max-height:820px)]:!text-[3rem] font-medium leading-none tracking-[-0.04em] text-[#111113]">{c.value}</span>
                        <span className="text-[15px] font-medium tracking-[-0.01em] text-[#5b5b63] sm:text-[17px]">{c.unit}</span>
                      </p>
                      <blockquote className="text-[14.5px] leading-snug text-[#2a2a30] sm:text-[19px] sm:leading-relaxed">&ldquo;{c.quote}&rdquo;</blockquote>
                      <figcaption className="mt-auto flex items-end justify-between gap-4 border-t border-black/[0.1] pt-3 sm:pt-4">
                        <span>
                          <span className="block text-[15px] font-medium text-[#111113] sm:text-[17px]">{c.name}</span>
                          <span className="block text-[12.5px] text-[#5b5b63] sm:text-[14px]">{c.role}</span>
                        </span>
                        <span className="flex flex-none gap-0.5 text-[#111113]" aria-label="5 out of 5">
                          {[0, 1, 2, 3, 4].map((s) => (
                            <Star key={s} weight="fill" className="size-3.5" />
                          ))}
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

    </section>
  );
}
