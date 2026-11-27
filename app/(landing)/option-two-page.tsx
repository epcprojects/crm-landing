// Option 2 (/option-2), laid out after the Dreelio reference section by
// section: floating pill menu, sky hero with the app, a line of offices, a
// "work from anywhere" photo with a Mobile / Web switch, two split feature
// sections, a feature grid, a big quote with a moving row of reviews, plans,
// guides, a "stay in touch" pair and a sky-backed closing call to action with
// the footer. All copy is Endpoint Leads' own; photos and clay icons are
// AI-made (public/option-2, public/benefits). Nothing here changes the home page.

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  Buildings,
  CalendarCheck,
  Check,
  Lightning,
  SealPercent,
  ShieldCheck,
  Trophy,
  UserCheck,
} from "@phosphor-icons/react/dist/ssr";
import { Option2ContactProvider } from "./demo-popup";
import Faq from "./faq";
import FeaturesList from "./features-list";
import { officeLogos } from "./office-logos";
import WhyStackCopy from "./why-stack-copy";

/** The duplicate "Why Endpoint Leads" deck stays hidden until this is true. */
const SHOW_WHY_COPY = false;
import { Option2Footer, Option2Header } from "./chrome";
import BackToTop from "../components/back-to-top";
import FloatingDock from "./floating-dock";
import FitScale from "./fit-scale";
import { AgentBreakdown, NotesFollowUps, QuietLead, StageCounts, WaitingLeads } from "../components/problem-section";
import Reveal from "../components/reveal";
import CountUp from "../components/count-up";
import { AppFrame } from "../components/dashboard-screens";
import LiveProjectsScreen from "./live-projects-screen";
import LiveUsersScreen from "./live-users-screen";
import { PanelToasts, type DemoToast } from "./live-demo";
import ReachUsForm from "./reach-us-form";
import WhatsappIcon from "../components/whatsapp-icon";
import { DemoButton } from "./demo-button";
import Devices from "./devices";
import Testimonials from "./testimonials";




const plans: { name: string; price: string; line: string; items: string[]; cta: string; featured?: boolean }[] = [
  {
    name: "Starter",
    price: "Small team",
    line: "For an office with up to 5 agents.",
    items: ["Every client in one place", "WhatsApp and call from a lead", "Next steps with owners and dates", "Works on any phone"],
    cta: "Ask for a price",
  },
  {
    name: "Office",
    price: "Most offices",
    line: "For a growing office with 6 to 15 agents.",
    items: ["Everything in Starter", "Agent roles and assigned projects", "Staff-only chat on every client", "Status counts for every project"],
    cta: "Book your free demo",
    featured: true,
  },
  {
    name: "Group",
    price: "Flexible",
    line: "For several branches or larger teams.",
    items: ["Everything in Office", "Help moving your existing clients in", "Setup with your team", "Owner view across every branch"],
    cta: "Talk to us",
  },
];

const guides = [
  { tag: "Follow-ups", title: "Why late follow-ups cost real estate offices their best leads", image: "/benefits/follow-ups.webp" },
  { tag: "Agents", title: "How to see which agent is closing, without asking anyone", image: "/benefits/agents.webp" },
  { tag: "WhatsApp", title: "Keeping every client conversation on one file", image: "/benefits/conversations.webp" },
];

/** Guides section, not shown for now (the benefits section sits in its place). */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Guides() {
  return (
    <section id="guides" className="scroll-mt-28 px-4 py-8 sm:px-10 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-12">
        <SectionHead eyebrow="Guides" title={<>Ideas to run a<br /> calmer real estate office</>} />
        <article className="grid overflow-hidden rounded-[26px] bg-[#f4f6f9] p-3 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[20px]">
            <Image src="/option-2/blog-team.webp" alt="A team of agents planning at a table" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-4 p-5 sm:p-8">
            <span className="self-start rounded-full bg-[#7a3a1d] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">Must read</span>
            <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em]">How to make sure no client ever waits for a reply</h3>
            <p className="text-[16px] leading-relaxed text-[#5b5b63]">Give every enquiry an owner, set the next step and let late ones stand out. A simple routine for busy offices.</p>
            <span className="mt-auto flex items-center justify-between">
              <span className="flex items-center gap-3">
                <Image src="/avatars/maha.webp" alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
                <span>
                  <span className="block text-[14px] font-semibold">Maha Khan</span>
                  <span className="block text-[12px] text-[#6b6b72]">Endpoint Leads team</span>
                </span>
              </span>
              <span className="rounded-full bg-[#e8553a] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">Featured</span>
            </span>
          </div>
        </article>
        <ul className="grid gap-4 sm:grid-cols-3">
          {guides.map((g) => (
            <li key={g.title} className="flex flex-col gap-3 rounded-[22px] bg-[#f4f6f9] p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[16px]">
                <Image src={g.image} alt="" fill sizes="(min-width: 640px) 360px, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-col gap-2 px-2 pb-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b6b72]">{g.tag}</span>
                <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.015em]">{g.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ small parts ------------------------------ */

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="self-start rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[13px] font-medium text-[#111113]">{children}</span>;
}

/** One word with the green underline that draws itself in, as in the FAQ heading. */
function Mark({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg aria-hidden="true" viewBox="0 0 240 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full">
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#4ade80" />
            <stop offset="1" stopColor="#16a34a" />
          </linearGradient>
        </defs>
        <path d="M4 14 C 60 6, 150 4, 236 9" pathLength={1} fill="none" stroke={`url(#${id})`} strokeWidth="6" strokeLinecap="round" className="underline-draw" />
      </svg>
    </span>
  );
}

/** Section heading styled like the FAQ: a grey pill, then the headline. */
function SectionHead({ eyebrow, title, line }: { eyebrow: string; title: ReactNode; line?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center sm:gap-5">
      <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[12.5px] font-medium text-[#111113] sm:text-[13px]">{eyebrow}</span>
      <h2 className="text-[1.75rem] sm:text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">{title}</h2>
      {line && <p className="max-w-[34rem] text-[15px] text-[#5b5b63] sm:text-[17px]">{line}</p>}
    </div>
  );
}

/** The app screen in a soft rounded frame. */
function Screen({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white/60 p-2 shadow-[0_40px_80px_-40px_rgba(30,40,70,0.45)] backdrop-blur sm:rounded-[28px] sm:p-3">
      {/* on phones the frame takes its content's height, with no minimum, so no empty space is left at the bottom */}
      <div className="overflow-hidden rounded-[16px] border border-black/[0.05] bg-white max-sm:[&>div]:min-h-0 sm:rounded-[20px]">
        <AppFrame active={active} logo={<img src="/option-2/endpoint-mark.svg" alt="" className="size-7" />}>{children}</AppFrame>
      </div>
    </div>
  );
}

/** A moving row of office logos, faded at both ends. */
function Offices({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6 sm:py-12">
      {label && <p className="text-[14px] text-[#6b6b72]">{label}</p>}
      <div className="w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {/* each office has its own logo, all in one soft grey; a touch smaller on phones */}
        <div className="ticker-track flex w-max items-center gap-10 text-[#8e8e97] max-sm:origin-left max-sm:scale-[0.85] sm:gap-16">
          {[...officeLogos, ...officeLogos, ...officeLogos, ...officeLogos].map((OfficeLogo, i) => (
            <span key={i} aria-hidden={i >= officeLogos.length}>
              <OfficeLogo />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A feature section: the app on a coloured panel, words and tags beside it. */
function Split({
  id,
  eyebrow,
  title,
  line,
  tags,
  panel,
  flip = false,
  floats,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  line: ReactNode;
  tags: { icon: string; label: string }[];
  panel: string;
  flip?: boolean;
  floats?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-4 py-8 sm:px-10 sm:py-24">
      <div className={`mx-auto grid w-full max-w-6xl items-center gap-6 sm:gap-10 lg:gap-14 ${flip ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}>
        {/* the whole dashboard, scaled down to fit the panel */}
        <div className={`relative overflow-hidden rounded-[22px] p-3 sm:rounded-[28px] sm:p-7 ${flip ? "lg:order-2" : ""}`} style={{ background: panel }}>
          <FitScale width={900}>{children}</FitScale>
          {floats}
        </div>
        <div className="flex flex-col gap-3 sm:gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[1.6rem] sm:text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-balance">{title}</h2>
          <p className="max-w-[30rem] text-[15px] leading-relaxed text-[#5b5b63] sm:text-[17px]">{line}</p>
          {/* the button on the left, the tags as clay icons on the far right:
              spaced apart on bigger screens, overlapping on phones */}
          <div className="mt-1 flex w-full max-w-[30rem] flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:mt-0 sm:gap-x-5 sm:gap-y-4">
            <DemoButton>Get a free demo</DemoButton>
            <ul className="tag-wave ml-auto flex items-center -space-x-2.5 sm:gap-2.5 sm:space-x-0">
              {tags.map((tag, i) => (
                <li
                  key={tag.label}
                  tabIndex={0}
                  style={{ "--i": i } as CSSProperties}
                  className="group/tag relative grid size-11 place-items-center rounded-full border border-black/[0.08] bg-white shadow-[0_0_0_2px_#fff,0_1px_2px_rgba(17,17,19,0.08),0_10px_20px_-10px_rgba(30,40,70,0.45)] transition-transform duration-200 outline-none hover:z-10 hover:-translate-y-0.5 focus-visible:z-10 focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#111113]/20 sm:size-14"
                >
                  <Image src={tag.icon} alt={tag.label} width={80} height={80} className="size-7 mix-blend-multiply sm:size-9" />
                  {/* tooltip above the icon on hover or keyboard focus */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-full mb-2.5 translate-y-1 whitespace-nowrap ${i === tags.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"} rounded-lg bg-[#111113] px-2.5 py-1.5 text-[12.5px] font-medium text-white opacity-0 shadow-[0_8px_20px_-8px_rgba(17,17,19,0.5)] transition-[opacity,transform] duration-200 group-hover/tag:translate-y-0 group-hover/tag:opacity-100 group-focus-visible/tag:translate-y-0 group-focus-visible/tag:opacity-100`}
                  >
                    {tag.label}
                    {/* the last tooltip sits right-aligned so it never pokes past the screen edge */}
                    <span className={`absolute top-full border-x-[5px] ${i === tags.length - 1 ? "right-4" : "left-1/2 -translate-x-1/2"} border-t-[5px] border-x-transparent border-t-[#111113]`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// notifications that arrive one by one on the Projects and Users panels
const projectToasts: DemoToast[] = [
  { icon: <WhatsappIcon className="size-4" />, tone: "#12b76a", title: "New enquiry", line: "Usman Tariq · just now" },
  { icon: <CalendarCheck weight="fill" className="size-4" />, tone: "#7a5af8", title: "Site visit booked", line: "Hina Raza · Sat, 4:00 pm" },
  { icon: <Buildings weight="fill" className="size-4" />, tone: "#0ba5ec", title: "3 new leads", line: "Tower B (Sales) · today" },
  { icon: <Trophy weight="fill" className="size-4" />, tone: "#f79009", title: "Deal closed, well done!", line: "City Rentals · shop, F-10" },
];
const userToasts: DemoToast[] = [
  { icon: <UserCheck weight="fill" className="size-4" />, tone: "#12b76a", title: "Invite accepted", line: "Maha Khan joined" },
  { icon: <Lightning weight="fill" className="size-4" />, tone: "#e0703a", title: "Fastest reply today", line: "Ali Raza · 4 min" },
  { icon: <ShieldCheck weight="fill" className="size-4" />, tone: "#7a5af8", title: "Role updated", line: "Sana Iqbal · now a Viewer" },
  { icon: <Buildings weight="fill" className="size-4" />, tone: "#0ba5ec", title: "Project assigned", line: "Zoya Ahmed · Tower B" },
];

/* --------------------------------- page --------------------------------- */

export default function OptionTwoPage() {
  return (
    <Option2ContactProvider>
      <div className="bg-white text-[#111113]">
        {/* floating pill menu */}
        <Option2Header onLanding />

        <main id="top">
          {/* hero */}
          <section className="relative overflow-hidden bg-white px-4 pb-8 pt-28 sm:px-10 sm:pb-10 sm:pt-44 [@media(min-width:1024px)_and_(min-height:701px)_and_(max-height:820px)]:!pt-28 [@media(min-width:1024px)_and_(max-height:700px)]:!pt-24">
            {/* a sharp sky photo with clouds (AI-made, public/option-2/sky.webp),
                fading into white at the bottom */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 bottom-24 sm:bottom-32">
              <Image src="/option-2/sky-hero.webp" alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
              <span className="absolute inset-x-0 -bottom-px h-28 bg-gradient-to-b from-transparent to-white sm:h-36" />
            </div>
            {/* words on the left, the demo form on the right */}
            <div className="relative mx-auto grid max-w-6xl items-center gap-8 sm:gap-10 sm:pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-16">
              <div className="flex flex-col items-start gap-4 text-left sm:gap-6 [@media(min-width:1024px)_and_(max-height:820px)]:!gap-5 [@media(min-width:1024px)_and_(max-height:700px)]:!gap-4">
                {/* the same headline, line and buttons as the home page hero */}
                {/* a short punch line above the headline, in a white pill */}
                <p className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-black/[0.04] bg-white py-1.5 pl-3 pr-3.5 text-[14px] font-medium max-[359px]:gap-1.5 max-[359px]:pl-2.5 max-[359px]:pr-3 max-[359px]:text-[12px] text-[#111113] shadow-[0_1px_2px_rgba(17,17,19,0.05),0_8px_20px_-12px_rgba(25,55,100,0.3)]">
                  {/* a glowing green dot */}
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22c55e] opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]" />
                  </span>
                  Stop chasing leads. Start closing them.
                </p>
                <h1 className="text-[2rem] sm:text-[clamp(2.25rem,5vw,3.75rem)] lg:text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-balance">
                  Manage your complete <span className="whitespace-nowrap">real estate</span> business from one place.
                </h1>
                <p className="max-w-[34rem] text-[16px] leading-relaxed text-[#3d3d44] sm:text-[18px]">
                  Endpoint Leads is a real estate CRM that gives owners and agents one place to manage leads,
                  client conversations, projects, follow-ups and team activity.
                </p>
                {/* two key numbers with clay icons; the numbers count up from zero as
                    they come into view. Two frosted cards: on phones each card is
                    centred with the icon on top; from 640px the icon sits left. */}
                <dl className="mt-1 grid w-full grid-cols-2 gap-2.5 sm:mt-2 sm:gap-3 [@media(min-width:1024px)_and_(max-height:820px)]:!mt-0">
                  {[
                    { value: 14, label: "Islamabad’s biggest projects launched", icon: "/option-2/kpi-tower.webp" },
                    { value: 15, label: "High ticket clients saved every quarter", icon: "/option-2/kpi-shield.webp" },
                  ].map((k, i) => (
                    <div
                      key={k.label}
                      style={{ "--d": `${-i * 2.5}s` } as CSSProperties}
                      className="kpi-wave flex flex-col items-center gap-1.5 rounded-[18px] border border-white/80 bg-white/70 px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_-16px_rgba(25,55,100,0.45)] backdrop-blur-md sm:flex-row sm:gap-4 sm:rounded-[22px] sm:py-4 sm:pl-4 sm:pr-5 sm:text-left [@media(min-width:1024px)_and_(max-height:700px)]:!py-2.5"
                    >
                      {/* the clay icon on its own, no tile behind it */}
                      <Image src={k.icon} alt="" width={80} height={80} className="kpi-sway size-12 flex-none drop-shadow-[0_4px_6px_rgba(17,17,19,0.12)] sm:size-16 [@media(min-width:1024px)_and_(max-height:700px)]:!size-12" />
                      <div className="flex min-w-0 flex-col items-center gap-1.5 sm:items-start">
                        <dt className="order-2 max-w-[10rem] text-[13px] font-medium leading-snug text-[#4a4a52] sm:max-w-none sm:text-[15px] [@media(min-width:1024px)_and_(max-height:700px)]:!text-[13.5px]">{k.label}</dt>
                        <dd className="order-1 text-[32px] font-semibold leading-none tracking-[-0.035em] tabular-nums text-[#111113] sm:text-[42px] [@media(min-width:1024px)_and_(max-height:700px)]:!text-[32px]">
                          <CountUp to={k.value} />
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="relative w-full pt-5">
                {/* the year-end offer, floating on the top edge of the form */}
                <div className="absolute inset-x-0 top-0 z-10 flex justify-center">
                  <p className="pw-float inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/80 bg-white py-1.5 pl-1.5 pr-4 text-[13px] font-medium leading-snug text-[#111113] shadow-[0_12px_28px_-14px_rgba(25,55,100,0.45)] sm:text-[14px]">
                    <span className="grid size-6 flex-none place-items-center rounded-full bg-gradient-to-b from-[#34d37a] to-[#16a34a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                      <SealPercent aria-hidden="true" weight="fill" className="size-4" />
                    </span>
                    <span>
                      <strong className="bg-gradient-to-r from-[#16a34a] to-[#0d9f6e] bg-clip-text font-semibold text-transparent">Save 25%</strong>
                      <span className="hidden sm:inline"> on your purchase before 31 December 2026.</span>
                      <span className="sm:hidden"> before 31 Dec 2026</span>
                    </span>
                  </p>
                </div>
                <ReachUsForm />
              </div>
            </div>
          </section>

          <Offices />

          {/* work from anywhere */}
          <section id="devices" className="scroll-mt-28 px-4 py-8 sm:px-10 sm:py-20">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-12">
              <SectionHead eyebrow="Seamless across devices" title={<>Works on both<br className="hidden sm:block" /> Mobile and <Mark id="devices-underline">Computer</Mark></>} />
              <Devices />
            </div>
          </section>

          <Split
            id="clients"
            eyebrow="Client management"
            title="Manage all your projects and see every status update in One click"
            line={<><strong className="font-semibold text-[#111113]">Every lead in one place</strong>, with its project, contact, agent and status on one dashboard. Call or WhatsApp a client straight from their file, and see what is late before they notice.</>}
            panel="radial-gradient(80% 70% at 100% 0%,#ffd9c7 0%,rgba(255,217,199,0) 60%),linear-gradient(180deg,#e3dbfb 0%,#efeafd 55%,#fbe9e2 100%)"
            floats={<PanelToasts items={projectToasts} className="bottom-4 right-4 sm:bottom-6 sm:right-6" />}
            tags={[
              { icon: "/option-2/tag-leads.webp", label: "Leads" },
              { icon: "/option-2/tag-contacts.webp", label: "Contacts" },
              { icon: "/option-2/tag-whatsapp.webp", label: "WhatsApp" },
              { icon: "/option-2/tag-calls.webp", label: "Calls" },
            ]}
          >
            <Screen active="Projects">
              <LiveProjectsScreen />
            </Screen>
          </Split>

          <Split
            id="agents"
            eyebrow="Agent management"
            title="Control all your agent’s activity in one place"
            line={<><strong className="font-semibold text-[#111113]">Add your agents</strong>, give each a role and choose which projects they work on. Each person sees only what you give them, and you see everyone.</>}
            panel="linear-gradient(180deg,#f7efe6 0%,#f3f0eb 55%,#e6eedf 100%)"
            flip
            floats={<PanelToasts items={userToasts} className="bottom-4 right-4 sm:bottom-6 sm:right-6" />}
            tags={[
              { icon: "/option-2/tag-invites.webp", label: "Invitations" },
              { icon: "/option-2/tag-roles.webp", label: "Roles" },
              { icon: "/option-2/tag-projects.webp", label: "Projects" },
              { icon: "/option-2/tag-steps.webp", label: "Next steps" },
            ]}
          >
            <Screen active="Users">
              <LiveUsersScreen />
            </Screen>
          </Split>

          {/* the problems: Option 2's layout and type (three smaller cards,
              then two big ones), with the home page problem section's words and
              live widgets */}
          <section id="features" className="scroll-mt-28 px-4 py-8 sm:px-10 sm:py-24">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-12">
              <SectionHead eyebrow="The problem" title={<>Your office is busy. Are your<br className="hidden sm:block" /> clients moving <Mark id="features-underline">forward?</Mark></>} />
              {/* both rows of cards in one group, so the gap between the rows matches the gap between cards */}
              <div className="flex flex-col gap-3 sm:gap-4">
              {/* one column on phones, two on tablets (the third spans both), three on laptops */}
              <ul className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>li:last-child]:sm:col-span-2 [&>li:last-child]:lg:col-span-1">
                {[
                  { title: "Clients wait for answers", line: "Nobody is sure whose job it is to reply.", picture: <WaitingLeads /> },
                  { title: "Follow-ups live in heads", line: "Next steps are scattered across chats and memory.", picture: <NotesFollowUps /> },
                  { title: "Deals go quiet", line: "Interested buyers go cold before anyone notices.", picture: <QuietLead /> },
                ].map((c) => (
                  <li key={c.title} className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-[20px] bg-[#f3f0eb] p-5 sm:gap-4 sm:rounded-[24px] sm:p-7">
                    <h3 className="text-[17px] font-semibold tracking-[-0.015em] sm:text-[19px]">{c.title}</h3>
                    <p className="-mt-1.5 text-[14px] leading-relaxed text-[#5b5b63] sm:-mt-2.5 sm:text-[15px]">{c.line}</p>
                    <Reveal className="mt-auto pt-2 sm:pt-4">
                      <div aria-hidden="true">{c.picture}</div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:gap-4 lg:grid-cols-2">
                {[
                  { title: "No view of your agents", line: "You can’t see who is closing and who needs help.", picture: <AgentBreakdown /> },
                  {
                    title: "No picture of your pipeline",
                    line: "You can’t tell how many leads sit at each stage.",
                    picture: <StageCounts />,
                    // on phones the "754 lost" tag moves below the card instead of covering its rows
                    fit: "max-sm:[&>div>*:nth-child(2)]:!left-auto max-sm:[&>div>*:nth-child(2)]:!right-0 max-sm:[&>div>*:nth-child(2)]:!top-[206px]",
                  },
                ].map((c: { title: string; line: string; picture: ReactNode; fit?: string }) => (
                  <article key={c.title} className="flex min-w-0 flex-col gap-3 rounded-[20px] bg-[#f3f0eb] p-5 sm:gap-4 sm:rounded-[24px] sm:p-8">
                    <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em] sm:text-[24px]">{c.title}</h3>
                    <p className="text-[14px] leading-relaxed text-[#5b5b63] sm:text-[15px]">{c.line}</p>
                    <Reveal className="mt-auto w-full pt-2 sm:pt-4">
                      <div aria-hidden="true" className={c.fit}>{c.picture}</div>
                    </Reveal>
                  </article>
                ))}
              </div>
              </div>
            </div>
          </section>

          {/* features: every feature on a card, two per row */}
          <FeaturesList />
          {/* the old "why Endpoint Leads" card deck, hidden for now */}
          {SHOW_WHY_COPY && <WhyStackCopy />}

          {/* reviews, laid out like the reference: dark, three columns */}
          <Testimonials />

          {/* plans */}
          <section id="plans" className="scroll-mt-28 px-4 py-8 sm:px-10 sm:py-24">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-12">
              {/* heading styled like the FAQ: grey pill, green underline on one word;
                  left-aligned on phones, in line with the cards, centred from tablets up */}
              <div className="flex flex-col items-start gap-3 text-left sm:items-center sm:gap-5 sm:text-center">
                <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[12.5px] font-medium text-[#111113] sm:text-[13px]">Plans</span>
                <h2 className="text-[1.75rem] sm:text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">
                  Simple plans
                  <br /> for busy{" "}
                  <span className="relative inline-block">
                    offices
                    <svg aria-hidden="true" viewBox="0 0 240 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full">
                      <defs>
                        <linearGradient id="plans-underline" x1="0" x2="1" y1="0" y2="0">
                          <stop offset="0" stopColor="#4ade80" />
                          <stop offset="1" stopColor="#16a34a" />
                        </linearGradient>
                      </defs>
                      <path d="M4 14 C 60 6, 150 4, 236 9" pathLength={1} fill="none" stroke="url(#plans-underline)" strokeWidth="6" strokeLinecap="round" className="underline-draw" />
                    </svg>
                  </span>
                </h2>
                <p className="mt-1 max-w-[34rem] text-[15px] text-[#5b5b63] sm:text-[17px]">The price depends on the size of your team. Book a demo and we will tell you straight away.</p>
              </div>
              <div className="mx-auto grid w-full max-w-xl items-stretch gap-3 sm:gap-4 lg:max-w-none lg:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`flex flex-col gap-5 rounded-[22px] p-5 sm:gap-6 sm:rounded-[26px] sm:p-7 ${
                      plan.featured
                        ? "border border-[#9cc3ec] bg-[linear-gradient(180deg,#b9d6f2_0%,#e7f0f9_55%,#f6f1ea_100%)] shadow-[0_30px_60px_-36px_rgba(30,60,110,0.45)]"
                        : "border border-black/[0.06] bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[15px] font-medium text-[#5b5b63]">Endpoint {plan.name}</p>
                      {plan.featured && <span className="rounded-full bg-[#12b76a] px-2.5 py-1 text-[11px] font-semibold text-white">Most popular</span>}
                    </div>
                    <div>
                      <p className="text-[30px] font-semibold leading-none tracking-[-0.04em] sm:text-[36px]">{plan.price}</p>
                      <p className="mt-2 text-[14px] text-[#5b5b63] sm:mt-3 sm:text-[15px]">{plan.line}</p>
                    </div>
                    <ul className="flex flex-col gap-2.5 sm:gap-3">
                      {plan.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-[14px] sm:text-[15px]">
                          <Check weight="bold" className="size-4 flex-none text-[#111113]" /> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <DemoButton full light={!plan.featured}>
                        {plan.cta}
                      </DemoButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Faq />

          {/* the sky bottom: closing call to action, footer */}
          <div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f1f6fc_18%,#d6e7f7_45%,#a9cff3_100%)]">
            {/* the same sky photo behind the closing call to action and footer */}
            {/* the photo fades in over its top half, so there is no edge */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.35)_30%,#000_60%)]">
              <Image src="/option-2/sky.webp" alt="" fill sizes="100vw" className="object-cover object-bottom" />
            </div>
            {/* white fading down over the top, so the sky melts out of the FAQ with no edge */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.85)_35%,rgba(255,255,255,0)_100%)] sm:h-80" />

            {/* closing call to action */}
            <section className="relative px-4 py-8 text-center sm:px-10 sm:pb-20 sm:pt-32">
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 sm:gap-5">
                <h2 className="text-[2rem] sm:text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em]">Ready to get started</h2>
                <p className="text-[15px] text-[#3d3d44] sm:text-[17px]">A free 20-minute demo with your own team and clients in mind.</p>
                <DemoButton>Book your free demo</DemoButton>
              </div>
            </section>

            {/* footer in a frosted card */}
            <Option2Footer onLanding />
          </div>
        </main>
        <FloatingDock />
        <BackToTop shape="circle" />
      </div>
    </Option2ContactProvider>
  );
}
