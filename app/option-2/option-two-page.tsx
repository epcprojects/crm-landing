// Option 2 (/option-2), laid out after the Dreelio reference section by
// section: floating pill menu, sky hero with the app, a line of offices, a
// "work from anywhere" photo with a Mobile / Web switch, two split feature
// sections, a feature grid, a big quote with a moving row of reviews, plans,
// guides, a "stay in touch" pair and a sky-backed closing call to action with
// the footer. All copy is Endpoint Leads' own; photos and clay icons are
// AI-made (public/option-2, public/benefits). Nothing here changes the home page.

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  CalendarBlank,
  Check,
  SealPercent,
} from "@phosphor-icons/react/dist/ssr";
import ContactProvider from "../components/contact";
import Faq from "./faq";
import WhyStack from "./why-stack";
import MobileMenu from "./mobile-menu";
import FitScale from "./fit-scale";
import { AgentBreakdown, NotesFollowUps, QuietLead, StageCounts, WaitingLeads } from "../components/problem-section";
import Reveal from "../components/reveal";
import { AppFrame, ProjectsScreen, UsersScreen } from "../components/dashboard-screens";
import ReachUsForm from "./reach-us-form";
import WhatsappIcon from "../components/whatsapp-icon";
import { siteConfig, whatsappLink } from "../site-config";
import { DemoButton } from "./demo-button";
import Devices from "./devices";
import Testimonials from "./testimonials";

// the home page header's links, pointing at the matching Option 2 sections
const nav = [
  { label: "Platform", href: "#clients" },
  { label: "Why us", href: "#features" },
  { label: "See how it works", href: "#devices" },
  { label: "FAQ", href: "#faq" },
];

const offices = ["Raza Estates", "Malik Properties", "City Rentals", "Bahria Homes", "Qureshi & Co", "Shah Realty"];


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
    <section id="guides" className="scroll-mt-28 px-5 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
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
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[13px] font-medium text-[#111113]">{eyebrow}</span>
      <h2 className="text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">{title}</h2>
      {line && <p className="max-w-[34rem] text-[17px] text-[#5b5b63]">{line}</p>}
    </div>
  );
}

/** The app screen in a soft rounded frame. */
function Screen({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/70 bg-white/60 p-2 shadow-[0_40px_80px_-40px_rgba(30,40,70,0.45)] backdrop-blur sm:rounded-[28px] sm:p-3">
      <div className="overflow-hidden rounded-[16px] border border-black/[0.05] bg-white sm:rounded-[20px]">
        <AppFrame active={active}>{children}</AppFrame>
      </div>
    </div>
  );
}

/** A moving row of office names, faded at both ends. */
function Offices({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-6 px-5 py-12">
      {label && <p className="text-[14px] text-[#6b6b72]">{label}</p>}
      <div className="w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="ticker-track flex w-max gap-14">
          {[...offices, ...offices, ...offices, ...offices].map((name, i) => (
            <span key={i} className="whitespace-nowrap text-[22px] font-semibold tracking-[-0.03em] text-[#9a9aa2]">
              {name}
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
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  line: ReactNode;
  tags: { icon: string; label: string }[];
  panel: string;
  flip?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-5 py-16 sm:px-10 sm:py-24">
      <div className={`mx-auto grid w-full max-w-6xl items-center gap-10 lg:gap-14 ${flip ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"}`}>
        {/* the whole dashboard, scaled down to fit the panel */}
        <div className={`relative overflow-hidden rounded-[28px] p-4 sm:p-7 ${flip ? "lg:order-2" : ""}`} style={{ background: panel }}>
          <FitScale width={900}>{children}</FitScale>
        </div>
        <div className="flex flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.03] tracking-[-0.04em]">{title}</h2>
          <p className="max-w-[30rem] text-[17px] leading-relaxed text-[#5b5b63]">{line}</p>
          {/* the button on the left, the tags as clay icons on the far right:
              spaced apart on bigger screens, overlapping on phones */}
          <div className="flex w-full max-w-[30rem] flex-wrap items-center justify-between gap-x-5 gap-y-4">
            <DemoButton>Get a free demo</DemoButton>
            <ul className="ml-auto flex items-center -space-x-2.5 sm:gap-2.5 sm:space-x-0">
              {tags.map((tag) => (
                <li
                  key={tag.label}
                  tabIndex={0}
                  className="group/tag relative grid size-11 place-items-center rounded-full border border-black/[0.08] bg-white shadow-[0_0_0_2px_#fff,0_1px_2px_rgba(17,17,19,0.08),0_10px_20px_-10px_rgba(30,40,70,0.45)] transition-transform duration-200 outline-none hover:z-10 hover:-translate-y-0.5 focus-visible:z-10 focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#111113]/20 sm:size-14"
                >
                  <Image src={tag.icon} alt={tag.label} width={80} height={80} className="size-7 mix-blend-multiply sm:size-9" />
                  {/* tooltip above the icon on hover or keyboard focus */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg bg-[#111113] px-2.5 py-1.5 text-[12.5px] font-medium text-white opacity-0 shadow-[0_8px_20px_-8px_rgba(17,17,19,0.5)] transition-[opacity,transform] duration-200 group-hover/tag:translate-y-0 group-hover/tag:opacity-100 group-focus-visible/tag:translate-y-0 group-focus-visible/tag:opacity-100"
                  >
                    {tag.label}
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-x-[5px] border-t-[5px] border-x-transparent border-t-[#111113]" />
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

/* --------------------------------- page --------------------------------- */

export default function OptionTwoPage() {
  const waLink = whatsappLink("Hi Endpoint Leads, I saw your website.");

  return (
    <ContactProvider>
      <div className="bg-white text-[#111113]">
        {/* floating pill menu */}
        <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4">
          <nav
            aria-label="Primary"
            className="pointer-events-auto relative mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full border border-black/[0.06] bg-white/85 py-2 pl-3 pr-2 shadow-[0_12px_30px_-18px_rgba(17,17,19,0.35)] backdrop-blur-xl"
          >
            <a href="#top" aria-label="Endpoint Leads home" className="flex-none">
              <Image src="/endpoint-leads-dark.svg" alt="Endpoint Leads" width={1656} height={708} className="-my-2 h-14 w-auto" />
            </a>
            <span className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <a key={item.label} href={item.href} className="rounded-full px-3.5 py-2 text-[14px] text-[#2b2b30] transition-colors hover:bg-black/[0.05]">
                  {item.label}
                </a>
              ))}
            </span>
            {/* the button sits in the bar from md up; on phones it moves into the menu */}
            <span className="hidden md:block">
              <DemoButton size="sm">Book your free demo</DemoButton>
            </span>
            <MobileMenu links={nav} />
          </nav>
        </header>

        <main id="top">
          {/* hero */}
          <section className="relative overflow-hidden bg-white px-5 pb-10 pt-36 sm:px-10 sm:pt-44">
            {/* a sharp sky photo with clouds (AI-made, public/option-2/sky.webp),
                fading into white at the bottom */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 bottom-24 sm:bottom-32">
              <Image src="/option-2/sky-hero.webp" alt="" fill priority sizes="100vw" className="object-cover object-bottom" />
              <span className="absolute inset-x-0 -bottom-px h-28 bg-gradient-to-b from-transparent to-white sm:h-36" />
            </div>
            {/* words on the left, the demo form on the right */}
            <div className="relative mx-auto grid max-w-6xl items-center gap-10 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-16">
              <div className="flex flex-col items-start gap-6 text-left">
                {/* the same headline, line and buttons as the home page hero */}
                <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
                  Manage your complete real estate business from one place.
                </h1>
                <p className="max-w-[34rem] text-[18px] leading-relaxed text-[#3d3d44]">
                  A solution that gives you complete transparency and control over your real estate
                  business, helping you scale your business in less time.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <a href="#demo-enquiry" className="inline-flex h-11 items-center rounded-full bg-[#111113] px-5 text-[15px] font-medium text-white transition-colors hover:bg-[#2a2a2e]">
                    Get a free demo
                  </a>
                  <a
                    href={siteConfig.calendlyUrl || "#demo-enquiry"}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-transparent px-5 text-[15px] font-medium transition-colors hover:border-[#111113]"
                  >
                    <CalendarBlank aria-hidden="true" weight="fill" className="size-[18px]" />
                    Book a time on Calendly
                  </a>
                </div>
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
          <section id="devices" className="scroll-mt-28 px-5 py-16 sm:px-10 sm:py-20">
            <div className="mx-auto flex max-w-6xl flex-col gap-12">
              <SectionHead eyebrow="Seamless across devices" title={<>Work from anywhere,<br className="hidden sm:block" /> stay in <Mark id="devices-underline">sync</Mark></>} />
              <Devices />
            </div>
          </section>

          <Split
            id="clients"
            eyebrow="Client management"
            title="Keep every client moving forward"
            line={<><strong className="font-semibold text-[#111113]">Every lead in one place</strong>, with its project, contact, agent and status on one dashboard. Call or WhatsApp a client straight from their file, and see what is late before they notice.</>}
            panel="radial-gradient(80% 70% at 100% 0%,#ffd9c7 0%,rgba(255,217,199,0) 60%),linear-gradient(180deg,#e3dbfb 0%,#efeafd 55%,#fbe9e2 100%)"
            tags={[
              { icon: "/option-2/tag-leads.webp", label: "Leads" },
              { icon: "/option-2/tag-contacts.webp", label: "Contacts" },
              { icon: "/option-2/tag-whatsapp.webp", label: "WhatsApp" },
              { icon: "/option-2/tag-calls.webp", label: "Calls" },
            ]}
          >
            <Screen active="Projects">
              <ProjectsScreen />
            </Screen>
          </Split>

          <Split
            id="agents"
            eyebrow="Agent management"
            title="See who is closing, help who is not"
            line={<><strong className="font-semibold text-[#111113]">Add your agents</strong>, give each a role and choose which projects they work on. Each person sees only what you give them, and you see everyone.</>}
            panel="linear-gradient(180deg,#f7efe6 0%,#f3f0eb 55%,#e6eedf 100%)"
            flip
            tags={[
              { icon: "/option-2/tag-invites.webp", label: "Invitations" },
              { icon: "/option-2/tag-roles.webp", label: "Roles" },
              { icon: "/option-2/tag-projects.webp", label: "Projects" },
              { icon: "/option-2/tag-steps.webp", label: "Next steps" },
            ]}
          >
            <Screen active="Users">
              <UsersScreen />
            </Screen>
          </Split>

          {/* the problems: Option 2's layout and type (three smaller cards,
              then two big ones), with the home page problem section's words and
              live widgets */}
          <section id="features" className="scroll-mt-28 px-5 py-16 sm:px-10 sm:py-24">
            <div className="mx-auto flex max-w-6xl flex-col gap-12">
              <SectionHead eyebrow="The problem" title={<>Your office is busy. Are your<br className="hidden sm:block" /> clients moving <Mark id="features-underline">forward?</Mark></>} />
              <ul className="grid gap-4 sm:grid-cols-3">
                {[
                  { title: "Clients wait for answers", line: "Nobody is sure whose job it is to reply.", picture: <WaitingLeads /> },
                  { title: "Follow-ups live in heads", line: "Next steps are scattered across chats and memory.", picture: <NotesFollowUps /> },
                  { title: "Deals go quiet", line: "Interested buyers go cold before anyone notices.", picture: <QuietLead /> },
                ].map((c) => (
                  <li key={c.title} className="flex min-w-0 flex-col gap-4 overflow-hidden rounded-[24px] bg-[#f3f0eb] p-6 sm:p-7">
                    <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{c.title}</h3>
                    <p className="-mt-2.5 text-[15px] leading-relaxed text-[#5b5b63]">{c.line}</p>
                    <Reveal className="mt-auto pt-4">
                      <div aria-hidden="true">{c.picture}</div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-2">
                {[
                  { title: "No view of your agents", line: "You can’t see who is closing and who needs help.", picture: <AgentBreakdown /> },
                  { title: "No picture of your pipeline", line: "You can’t tell how many leads sit at each stage.", picture: <StageCounts /> },
                ].map((c) => (
                  <article key={c.title} className="flex min-w-0 flex-col gap-4 rounded-[24px] bg-[#f3f0eb] p-6 sm:p-8">
                    <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.02em]">{c.title}</h3>
                    <p className="text-[15px] leading-relaxed text-[#5b5b63]">{c.line}</p>
                    <Reveal className="mt-auto w-full pt-4">
                      <div aria-hidden="true">{c.picture}</div>
                    </Reveal>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* reviews, laid out like the reference: dark, three columns */}
          <Testimonials />

          {/* why Endpoint Leads: a sticky card deck like the reference */}
          <WhyStack />

          {/* plans */}
          <section id="plans" className="scroll-mt-28 px-5 py-16 sm:px-10 sm:py-24">
            <div className="mx-auto flex max-w-6xl flex-col gap-12">
              {/* heading styled like the FAQ: grey pill, green underline on one word */}
              <div className="flex flex-col items-center gap-5 text-center">
                <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[13px] font-medium text-[#111113]">Plans</span>
                <h2 className="text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">
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
                <p className="mt-1 max-w-[34rem] text-[17px] text-[#5b5b63]">The price depends on the size of your team. Book a demo and we will tell you straight away.</p>
              </div>
              <div className="grid items-stretch gap-4 lg:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`flex flex-col gap-6 rounded-[26px] p-7 ${
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
                      <p className="text-[36px] font-semibold leading-none tracking-[-0.04em]">{plan.price}</p>
                      <p className="mt-3 text-[15px] text-[#5b5b63]">{plan.line}</p>
                    </div>
                    <ul className="flex flex-col gap-3">
                      {plan.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-[15px]">
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

          {/* the sky bottom: stay in touch, closing call to action, footer */}
          <div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f1f6fc_18%,#d6e7f7_45%,#a9cff3_100%)]">
            {/* the same sky photo behind the closing call to action and footer */}
            {/* the photo fades in over its top half, so there is no edge */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[900px] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.35)_30%,#000_60%)]">
              <Image src="/option-2/sky.webp" alt="" fill sizes="100vw" className="object-cover object-bottom" />
            </div>

            {/* stay in touch */}
            <section id="contact" className="relative scroll-mt-28 px-5 py-16 sm:px-10">
              <div className="mx-auto flex max-w-4xl flex-col gap-12">
                {/* heading styled like the FAQ: grey pill, green underline on one word */}
                <div className="flex flex-col items-center gap-5 text-center">
                  <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[13px] font-medium text-[#111113]">Contact</span>
                  <h2 className="text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">
                    Stay in{" "}
                    <span className="relative inline-block">
                      touch
                      <svg aria-hidden="true" viewBox="0 0 240 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full">
                        <defs>
                          <linearGradient id="contact-underline" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0" stopColor="#4ade80" />
                            <stop offset="1" stopColor="#16a34a" />
                          </linearGradient>
                        </defs>
                        <path d="M4 14 C 60 6, 150 4, 236 9" pathLength={1} fill="none" stroke="url(#contact-underline)" strokeWidth="6" strokeLinecap="round" className="underline-draw" />
                      </svg>
                    </span>
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-4 rounded-[24px] bg-white/85 p-7 backdrop-blur">
                    <div className="flex items-start justify-between">
                      <Image src="/option-2/chat-w.webp" alt="" width={96} height={96} className="-ml-2 -mt-2 size-16 mix-blend-multiply" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b6b72]">Chat with us</span>
                    </div>
                    <h3 className="text-[22px] font-semibold tracking-[-0.02em]">WhatsApp</h3>
                    <p className="text-[15px] leading-relaxed text-[#5b5b63]">Ask anything about Endpoint Leads, pricing or setup, and we will answer on WhatsApp.</p>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-1.5 self-start rounded-full bg-[#f3f0eb] px-4 text-[14px] font-medium hover:bg-[#ebe6df]">
                      Message us <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                  <div className="flex flex-col gap-4 rounded-[24px] bg-white/85 p-7 backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                      <Image src="/option-2/email-w.webp" alt="" width={96} height={96} className="-ml-2 -mt-2 size-16 mix-blend-multiply" />
                      <span className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6b6b72]">Write to us</span>
                    </div>
                    <h3 className="text-[22px] font-semibold tracking-[-0.02em]">Email</h3>
                    <p className="text-[15px] leading-relaxed text-[#5b5b63]">Prefer email? Write to {siteConfig.email} and we will set up your free demo.</p>
                    <a href={`mailto:${siteConfig.email}`} className="inline-flex h-10 items-center gap-1.5 self-start rounded-full bg-[#f3f0eb] px-4 text-[14px] font-medium hover:bg-[#ebe6df]">
                      Email us <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* closing call to action */}
            <section className="relative px-5 pb-16 pt-12 text-center sm:px-10 sm:pb-20">
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
                <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em]">Ready to get started</h2>
                <p className="text-[17px] text-[#3d3d44]">A free 20-minute demo with your own team and clients in mind.</p>
                <DemoButton>Book your free demo</DemoButton>
              </div>
            </section>

            {/* footer in a frosted card */}
            <footer className="relative px-4 pb-6 sm:px-10 sm:pb-10">
              <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-[26px] bg-white/55 p-7 backdrop-blur-md sm:p-10">
                <div className="grid gap-10 sm:grid-cols-[1.6fr_1fr_1fr]">
                  <div className="flex flex-col gap-4">
                    <Image src="/endpoint-leads-dark.svg" alt="Endpoint Leads" width={1656} height={708} className="-mb-7 -ml-[23px] h-24 w-auto self-start" />
                    <p className="max-w-xs text-[14px] leading-relaxed text-[#3d3d44]">The CRM for real estate offices. Every client and every conversation in one place.</p>
                    <span className="flex gap-2.5">
                      <a href={waLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full bg-white">
                        <WhatsappIcon className="size-5" />
                      </a>
                      <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-full bg-white">
                        <Image src="/option-2/gmail.svg" alt="" width={20} height={20} className="size-5" />
                      </a>
                    </span>
                  </div>
                  <nav aria-label="Pages" className="flex flex-col gap-2.5 text-[14px]">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6b6b72]">Pages</p>
                    {nav.slice(0, 4).map((item) => (
                      <a key={item.label} href={item.href} className="hover:text-[#5b5b63]">
                        {item.label}
                      </a>
                    ))}
                  </nav>
                  <nav aria-label="Information" className="flex flex-col gap-2.5 text-[14px]">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6b6b72]">Information</p>
                    <a href="#contact" className="hover:text-[#5b5b63]">Contact</a>
                    <Link href="/privacy-policy" className="hover:text-[#5b5b63]">Privacy</Link>
                    <Link href="/policy-for-automation" className="hover:text-[#5b5b63]">Automation terms</Link>
                    <a href={siteConfig.signInHref} className="hover:text-[#5b5b63]">Sign in</a>
                  </nav>
                </div>
                <div className="flex flex-col justify-between gap-3 border-t border-black/[0.08] pt-6 text-[13px] text-[#5b5b63] sm:flex-row">
                  <span>© 2026 Endpoint Leads</span>
                  <span>Made for real estate offices in Pakistan</span>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </ContactProvider>
  );
}
