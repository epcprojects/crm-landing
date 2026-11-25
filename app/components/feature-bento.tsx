// Six benefits as a stack of large cards beside a sticky heading. Each card has
// an icon, a title and one line, under a clean photo (AI-made, in
// public/benefits) of an office doing that thing.

import {
  BellRinging,
  ChartLineUp,
  ChatTeardropText,
  DeviceMobile,
  IdentificationCard,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import StackList from "./stack-list";

/* --------------------------------- cards -------------------------------- */

const perks: {
  icon: typeof ChatTeardropText;
  title: string;
  line: string;
  image: string;
  alt: string;
  bg: string;
  tone: string;
  tone2: string;
}[] = [
  {
    icon: ChatTeardropText,
    title: "All conversations in one place",
    line: "Open any client and read what was said, who said it and what was promised.",
    image: "/benefits/conversations.webp",
    alt: "An agent smiling as he reads client messages on his phone",
    bg: "radial-gradient(90% 85% at 0% 100%,#ff7a5966 0%,rgba(255,255,255,0) 62%),radial-gradient(80% 75% at 100% 0%,#ffc46b80 0%,rgba(255,255,255,0) 66%),linear-gradient(165deg,#fff7f2 0%,#ffe4d8 100%)",
    tone: "#e8553a",
    tone2: "#f5a524",
  },
  {
    icon: BellRinging,
    title: "Never miss a client follow-up",
    line: "Every next step has an owner and a date, and late ones stand out.",
    image: "/benefits/follow-ups.webp",
    alt: "An agent on a call with a client, planner in hand",
    bg: "radial-gradient(90% 85% at 0% 100%,#10b9a066 0%,rgba(255,255,255,0) 62%),radial-gradient(80% 75% at 100% 0%,#7fe6c480 0%,rgba(255,255,255,0) 66%),linear-gradient(165deg,#f1fbf8 0%,#d6f4ea 100%)",
    tone: "#0e9f88",
    tone2: "#3fcf9e",
  },
  {
    icon: UsersThree,
    title: "Complete visibility into your agents",
    line: "See who is closing and who is slow to reply.",
    image: "/benefits/agents.webp",
    alt: "An office manager checking in on two agents at their laptops",
    bg: "radial-gradient(90% 85% at 0% 100%,#4f6bff66 0%,rgba(255,255,255,0) 62%),radial-gradient(80% 75% at 100% 0%,#6fc6ff80 0%,rgba(255,255,255,0) 66%),linear-gradient(165deg,#f4f5ff 0%,#dfe4ff 100%)",
    tone: "#3b5bf6",
    tone2: "#4fb3f5",
  },
  {
    icon: ChartLineUp,
    title: "Understand business performance",
    line: "Leads, closed deals and reply times in one view.",
    image: "/benefits/performance.webp",
    alt: "An owner looking at sales charts on a tablet",
    bg: "radial-gradient(90% 85% at 0% 100%,#a855f766 0%,rgba(255,255,255,0) 62%),radial-gradient(80% 75% at 100% 0%,#f472b680 0%,rgba(255,255,255,0) 66%),linear-gradient(165deg,#fbf5ff 0%,#f2e2ff 100%)",
    tone: "#9b3fe6",
    tone2: "#ec4899",
  },
  {
    icon: IdentificationCard,
    title: "Keep client information centralized",
    line: "One file per client, not one chat per agent.",
    image: "/benefits/client-file.webp",
    alt: "An agent at his desk holding a client's file",
    bg: "radial-gradient(90% 85% at 0% 100%,#f59e0b66 0%,rgba(255,255,255,0) 62%),radial-gradient(80% 75% at 100% 0%,#b5e65580 0%,rgba(255,255,255,0) 66%),linear-gradient(165deg,#fffbf0 0%,#fdf0cc 100%)",
    tone: "#d98706",
    tone2: "#84cc16",
  },
  {
    icon: DeviceMobile,
    title: "Manage your business from anywhere",
    line: "The same clients and next steps at your desk or on a phone. Nothing to install.",
    image: "/benefits/anywhere.webp",
    alt: "An agent outside an apartment building checking his phone",
    bg: "radial-gradient(90% 85% at 0% 100%,#f43f5e66 0%,rgba(255,255,255,0) 62%),radial-gradient(80% 75% at 100% 0%,#fb923c80 0%,rgba(255,255,255,0) 66%),linear-gradient(165deg,#fff5f6 0%,#ffe0e4 100%)",
    tone: "#e11d48",
    tone2: "#f97316",
  },
];

export default function FeatureBento() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="scroll-mt-20 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col gap-5 self-start lg:sticky lg:top-28">
          <p className="eyebrow">WHY ENDPOINT LEADS</p>
          <h2 id="benefits-heading" className="text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.15] text-balance">
            Everything your office needs, <span className="serif">without the chasing.</span>
          </h2>
        </div>

        <StackList className="flex flex-col gap-5 lg:gap-48">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <li
                key={perk.title}
                style={{ top: `calc(6.5rem + ${index * 14}px)` }}
                className="stack-card relative flex flex-col gap-5 overflow-hidden rounded-[28px] border border-black/[0.07] bg-white p-3 shadow-[0_24px_48px_-36px_rgba(16,24,40,0.35)]"
              >
                <div className="relative aspect-[3/2] max-h-[420px] w-full overflow-hidden rounded-[20px]" style={{ background: perk.bg }}>
                  {/* plain img: the 1600px photo is served as-is, not recompressed */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={perk.image}
                    alt={perk.alt}
                    width={1600}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <div className="flex min-h-[66px] items-start gap-4 px-3 pb-1 sm:px-4">
                  <span
                    style={{
                      color: perk.tone,
                      background: `linear-gradient(135deg, color-mix(in srgb, ${perk.tone} 14%, white) 0%, color-mix(in srgb, ${perk.tone2} 22%, white) 100%)`,
                      boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${perk.tone} 18%, white), 0 6px 14px -8px color-mix(in srgb, ${perk.tone} 55%, transparent)`,
                    }}
                    className="grid size-10 flex-none place-items-center rounded-xl"
                  >
                    <Icon aria-hidden="true" weight="duotone" className="size-5" />
                  </span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <h3 className="text-[20px] font-normal leading-snug tracking-[-0.015em] text-ink sm:text-[22px]">{perk.title}</h3>
                    <p className="text-[15px] leading-snug text-body">{perk.line}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </StackList>
      </div>
    </section>
  );
}
