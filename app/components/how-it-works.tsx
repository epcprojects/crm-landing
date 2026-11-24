// The numbers section: one large soft card with a centred heading and four
// big figures side by side. Every figure here is sample data: replace with
// real numbers before launch.

import type { ReactNode } from "react";
import { ListChecks, MapPin, Timer, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import CountUp from "./count-up";
import Reveal from "./reveal";

const stats: {
  icon: ReactNode;
  chip: string;
  tone: string;
  value: number;
  unit?: string;
  label: string;
  note: string;
}[] = [
  {
    icon: <WhatsappLogo weight="fill" className="size-3.5" />,
    chip: "WhatsApp + calls",
    tone: "#25b865",
    value: 1248,
    label: "enquiries handled",
    note: "this month, across your whole office",
  },
  {
    icon: <Timer weight="bold" className="size-3.5" />,
    chip: "Down 62%",
    tone: "#0f95d8",
    value: 4,
    unit: "min",
    label: "average first reply",
    note: "from hours, once every enquiry has an owner",
  },
  {
    icon: <ListChecks weight="bold" className="size-3.5" />,
    chip: "Every next step",
    tone: "#4939d2",
    value: 96,
    unit: "%",
    label: "follow-ups done on time",
    note: "late ones stand out for the agent and the owner",
  },
  {
    icon: <MapPin weight="fill" className="size-3.5" />,
    chip: "+9% this quarter",
    tone: "#e8850c",
    value: 31,
    unit: "%",
    label: "leads reach a site visit",
    note: "from first enquiry to a visit on the calendar",
  },
];

const lightHaze = [
  "radial-gradient(60% 55% at 50% -8%, rgba(150,134,255,0.28) 0%, rgba(150,134,255,0) 70%)",
  "radial-gradient(48% 62% at -4% 78%, rgba(120,214,166,0.55) 0%, rgba(120,214,166,0) 72%)",
  "radial-gradient(44% 58% at 30% 112%, rgba(255,187,140,0.6) 0%, rgba(255,187,140,0) 72%)",
  "radial-gradient(44% 58% at 70% 112%, rgba(166,148,255,0.55) 0%, rgba(166,148,255,0) 72%)",
  "radial-gradient(48% 62% at 104% 70%, rgba(122,200,255,0.55) 0%, rgba(122,200,255,0) 72%)",
  "linear-gradient(180deg, #ffffff 0%, #fbfbff 55%, #f6f4ff 100%)",
].join(",");

// a black gradient: a little lighter at the top, deepest at the bottom
const darkHaze = [
  "radial-gradient(60% 45% at 50% -5%, rgba(120,104,255,0.32) 0%, rgba(120,104,255,0) 70%)",
  "radial-gradient(40% 45% at 0% 100%, rgba(120,214,166,0.16) 0%, rgba(120,214,166,0) 72%)",
  "radial-gradient(40% 45% at 100% 100%, rgba(166,148,255,0.2) 0%, rgba(166,148,255,0) 72%)",
  "linear-gradient(180deg, #17171d 0%, #0d0d11 45%, #050507 100%)",
].join(",");

// Apple-style glass pill for the dark card (see .glass-pill in globals.css)
const glassChip =
  "glass-pill stat-chip inline-flex items-center gap-2 rounded-full p-1 pr-3.5 text-[12.5px] font-medium text-white transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1";

const chip =
  "stat-chip inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/95 p-1 pr-3.5 text-[12.5px] font-medium text-ink shadow-[0_4px_14px_-8px_rgba(17,17,17,0.35)] transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:-translate-y-1 group-hover:border-[color-mix(in_srgb,var(--tone)_35%,white)] group-hover:shadow-[0_12px_24px_-10px_color-mix(in_srgb,var(--tone)_60%,transparent)]";

function NumbersSection({ dark = false }: { dark?: boolean }) {
  const id = dark ? "results" : "how";
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-20 overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-16 sm:px-8 sm:py-24">
        <Reveal className={`relative overflow-hidden rounded-[32px] border px-6 pb-28 pt-16 sm:px-14 sm:pt-20 ${dark ? "border-white/10 bg-[#0a0a0d]" : "border-black/[0.06] bg-white"}`}>
          {/* soft colour haze behind the content */}
          <div
            aria-hidden="true"
            className="fx-fade pointer-events-none absolute inset-0"
            style={{ background: dark ? darkHaze : lightHaze }}
          />

          <div className="relative flex flex-col items-center text-center">
            <h2
              id={headingId}
              style={{ "--i": 0 } as React.CSSProperties}
              className={`fx text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.04em] text-balance lg:whitespace-nowrap ${dark ? "text-white" : ""}`}
            >
              Numbers you can see, <br className="lg:hidden" />
              <span className={`serif ${dark ? "!text-[#b3a8ff]" : ""}`}>not just guess.</span>
            </h2>
            <p style={{ "--i": 1 } as React.CSSProperties} className={`fx mt-5 max-w-[44rem] text-[16px] leading-relaxed ${dark ? "text-white/70" : "text-body"}`}>
              Every figure comes from your own enquiries, follow-ups and visits, live on one dashboard.
            </p>
          </div>

          <ul className={`relative grid ${"mt-16"} gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0`}>
            {stats.map((stat, index) => (
              <li
                key={stat.label}
                style={{ "--tone": stat.tone, "--i": index + 2 } as React.CSSProperties}
                className={`fx group flex flex-col items-center gap-4 px-6 text-center ${
                  index > 0 ? `lg:border-l ${dark ? "lg:border-white/10" : "lg:border-black/[0.08]"}` : ""
                }`}
              >
                <span className={`fx-pop ${dark ? glassChip : chip}`} style={{ "--i": index + 3 } as React.CSSProperties}>
                  <span className="stat-chip-icon grid size-6 place-items-center rounded-full bg-[var(--tone)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-500 ease-out">
                    {stat.icon}
                  </span>
                  {stat.chip}
                </span>
                <p className={`text-[clamp(2.75rem,5vw,4.25rem)] font-medium leading-none tracking-[-0.05em] ${dark ? "text-white" : "text-ink"}`}>
                  <CountUp to={stat.value} />
                  {stat.unit && <span className={`serif ml-1 text-[0.8em] ${dark ? "!text-[#b3a8ff]" : ""}`}>{stat.unit}</span>}
                </p>
                <div className="flex flex-col gap-1.5">
                  <p className={`text-[17px] font-medium ${dark ? "text-white" : "text-ink"}`}>{stat.label}</p>
                  <p className={`mx-auto max-w-[14rem] text-[14px] leading-snug ${dark ? "text-white/60" : "text-body"}`}>{stat.note}</p>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ "--i": 7 } as React.CSSProperties} className="fx relative mt-14 flex justify-center">
            <a
              href="#demo-enquiry"
              className="inline-flex h-12 items-center rounded-full bg-brand px-6 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Get a free demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  return <NumbersSection />;
}

/** The same section on a black-to-white background. */
export function NumbersDark() {
  return <NumbersSection dark />;
}
