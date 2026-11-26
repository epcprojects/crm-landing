import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  CalendarBlank,
  CaretDown,
  ChartLineUp,
  Check,
  CheckCircle,
  ChatsCircle,
  Clock,
  DeviceMobile,
  Desktop,
  FunnelSimple,
  House,
  IdentificationBadge,
  Lightning,
  LockKey,
  MagnifyingGlass,
  PaperPlaneTilt,
  Phone,
  ShieldCheck,
  Sparkle,
  TrendUp,
  UserCircle,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig, whatsappLink } from "../site-config";
import WhatsappIcon from "../components/whatsapp-icon";

const primaryCta = whatsappLink("Hi Endpoint Leads, I would like a demo for my real estate office.");
const bookingCta = siteConfig.calendlyUrl || "#contact";

const leadRows = [
  { ref: "EL-1843", title: "Commercial space enquiry", owner: "MF", stage: "New Lead", tone: "bg-[#e9f8f1] text-[#208f65]" },
  { ref: "EL-1842", title: "Apartment details request", owner: "SA", stage: "Contacted", tone: "bg-[#e7f6fb] text-[#158aa7]" },
  { ref: "EL-1841", title: "Studio apartment for rent", owner: "AB", stage: "Qualified", tone: "bg-[#f5eafb] text-[#a23ab1]" },
];

const faqs = [
  ["What happens on the demo?", "We ask how your office handles leads today, then show the client, agent, follow-up, and reporting views around your workflow."],
  ["Can agents use it on their phones?", "Yes. Endpoint Leads runs in the browser, so agents can reply and update leads from a phone, tablet, or computer."],
  ["Can you move our current leads in?", "Yes. Send your existing list or spreadsheet and we will help organize it during setup."],
  ["Can clients see internal notes?", "No. Client conversations and staff-only notes stay separate inside the client record."],
  ["How much does it cost?", "Pricing depends on your team size and setup. Message us and we will share the right option for your office."],
];

function Brand() {
  return (
    <Image
      src="/endpoint-leads-dark.svg"
      alt={siteConfig.name}
      width={1656}
      height={708}
      priority
      className="h-9 w-auto"
    />
  );
}

function PillLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 ${
        dark
          ? "bg-[#121217] text-white shadow-[0_10px_24px_-14px_rgba(18,18,23,0.75)]"
          : "border border-black/10 bg-white text-ink shadow-[0_10px_26px_-20px_rgba(18,18,23,0.5)]"
      }`}
    >
      {children}
    </a>
  );
}

function SectionTitle({ label, title, copy }: { label: string; title: string; copy?: string }) {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
      <span className="rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[12px] font-medium text-body shadow-[0_8px_20px_-16px_rgba(18,18,23,0.45)]">
        {label}
      </span>
      <h2 className="mt-5 text-[clamp(2.25rem,5vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.045em] text-ink text-balance">
        {title}
      </h2>
      {copy && <p className="mt-5 max-w-[580px] text-[16px] leading-relaxed text-body sm:text-[17px]">{copy}</p>}
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-14 h-[500px] w-full max-w-[1000px] sm:h-[570px]">
      <div className="option2-float-slow absolute left-[1%] top-16 z-20 hidden rounded-full bg-[#15151b] px-4 py-2.5 text-[12px] font-medium text-white shadow-xl md:flex md:items-center md:gap-2">
        <LockKey weight="fill" className="size-4" /> Staff-only notes
      </div>
      <div className="option2-float absolute right-[2%] top-8 z-20 hidden w-[210px] rounded-[20px] border border-white/80 bg-white/90 p-4 shadow-[0_28px_60px_-30px_rgba(47,43,94,0.5)] backdrop-blur md:block">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-body">Follow-ups today</span>
          <CalendarBlank weight="fill" className="size-4 text-brand" />
        </div>
        <p className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">12</p>
        <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-[#23815b]"><TrendUp className="size-3" /> 4 completed</p>
      </div>

      <div className="absolute inset-x-[7%] bottom-0 top-0 overflow-hidden rounded-[36px_36px_0_0] border border-white/80 bg-white/80 p-2.5 shadow-[0_45px_100px_-48px_rgba(35,35,70,0.5)] backdrop-blur sm:inset-x-[12%] sm:p-3">
        <div className="flex h-full overflow-hidden rounded-[27px_27px_0_0] border border-black/[0.07] bg-white">
          <aside className="hidden w-[132px] flex-none border-r border-black/[0.06] bg-[#fbfbfd] px-3 py-5 md:block">
            <div className="flex items-center gap-2 px-2 text-[11px] font-semibold"><Buildings weight="fill" className="size-4 text-brand" /> Endpoint</div>
            <nav className="mt-6 space-y-1 text-[10px] text-body">
              {[
                [House, "Dashboard", true],
                [UserCircle, "Contacts", false],
                [FunnelSimple, "All leads", false],
                [Buildings, "Projects", false],
                [UsersThree, "Agents", false],
              ].map(([Icon, label, active]) => {
                const NavIcon = Icon as typeof House;
                return (
                  <span key={String(label)} className={`flex items-center gap-2 rounded-lg px-2 py-2 ${active ? "bg-[#eeebff] font-semibold text-brand" : ""}`}>
                    <NavIcon className="size-3.5" /> {String(label)}
                  </span>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0 flex-1 bg-[#f8f8fb] p-3 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-semibold tracking-[-0.02em] sm:text-[18px]">Good day, Super admin</p>
                <p className="mt-1 text-[9px] text-body sm:text-[10px]">Here is your lead overview</p>
              </div>
              <button className="flex items-center gap-1 rounded-lg bg-brand px-3 py-2 text-[9px] font-semibold text-white" type="button">
                <Sparkle weight="fill" className="size-3" /> New lead
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
              {[
                ["New leads", "36", "#23ae72"],
                ["Contacted", "365", "#24bad7"],
                ["Qualified", "9", "#c956d1"],
                ["Won", "12", "#745ae7"],
              ].map(([label, value, color]) => (
                <div key={label} className="rounded-xl border border-black/[0.06] bg-white p-3 shadow-[0_10px_24px_-22px_rgba(18,18,23,0.35)]">
                  <div className="flex items-center justify-between text-[9px] text-body">
                    <span>{label}</span><span className="size-2 rounded-full" style={{ backgroundColor: color }} />
                  </div>
                  <p className="mt-2 text-[20px] font-semibold tracking-[-0.04em]">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1.45fr_1fr]">
              <div className="rounded-2xl border border-black/[0.06] bg-white p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div><p className="text-[11px] font-semibold">Lead activity</p><p className="text-[8px] text-body">This month</p></div>
                  <ChartLineUp className="size-4 text-brand" />
                </div>
                <div className="mt-5 flex h-24 items-end gap-2">
                  {[44, 58, 46, 76, 64, 92, 82, 108, 96, 122].map((height, index) => (
                    <span key={index} className="flex-1 rounded-t-md bg-[#d8d2ff]" style={{ height: `${height * 0.72}px`, opacity: 0.48 + index * 0.045 }} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-black/[0.06] bg-white p-3 sm:p-4">
                <div className="flex items-center justify-between"><p className="text-[11px] font-semibold">Agent response</p><Clock className="size-4 text-brand" /></div>
                <div className="mt-4 space-y-3">
                  {[["MF", "Muhammad", "8 min"], ["SA", "Sumayya", "11 min"], ["AB", "Abdul", "14 min"]].map(([initials, name, time]) => (
                    <div key={initials} className="flex items-center gap-2 text-[9px]">
                      <span className="grid size-6 place-items-center rounded-full bg-[#efedf8] text-[8px] font-semibold">{initials}</span>
                      <span className="min-w-0 flex-1 truncate font-medium">{name}</span>
                      <span className="text-body">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
              <div className="flex items-center justify-between border-b border-black/[0.06] px-3 py-2.5">
                <p className="text-[10px] font-semibold">Recent leads</p>
                <span className="flex items-center gap-1 text-[8px] text-body"><MagnifyingGlass className="size-3" /> Search</span>
              </div>
              {leadRows.map((lead) => (
                <div key={lead.ref} className="grid grid-cols-[54px_1fr_28px_auto] items-center gap-2 border-b border-black/[0.05] px-3 py-2.5 text-[8px] last:border-0 sm:grid-cols-[64px_1fr_90px_32px_auto]">
                  <span className="text-body">{lead.ref}</span>
                  <span className="truncate font-medium">{lead.title}</span>
                  <span className="hidden truncate text-body sm:block">Islamabad Rentals</span>
                  <span className="grid size-6 place-items-center rounded-full bg-[#f0f0f3] text-[7px] font-semibold">{lead.owner}</span>
                  <span className={`rounded-full px-2 py-1 font-medium ${lead.tone}`}>{lead.stage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="option2-float absolute bottom-16 left-[2%] z-20 hidden w-[205px] rounded-[20px] border border-white/80 bg-white/90 p-4 shadow-[0_28px_60px_-30px_rgba(47,43,94,0.5)] backdrop-blur md:block">
        <div className="flex items-center gap-2"><WhatsappIcon className="size-8" /><span className="text-[11px] font-semibold">Client replied</span></div>
        <p className="mt-3 text-[11px] leading-snug text-body">Saturday at 11 works for me.</p>
      </div>
    </div>
  );
}

function FeatureVisualPipeline() {
  return (
    <div className="mt-8 rounded-[22px] border border-black/[0.06] bg-white p-4 shadow-[0_22px_40px_-32px_rgba(18,18,23,0.45)]">
      <div className="flex items-center justify-between text-[10px]"><span className="font-semibold">Lead pipeline</span><span className="text-body">Today</span></div>
      <div className="mt-4 space-y-2.5">
        {[["New Lead", 78, "#29bd7b"], ["Contacted", 58, "#24bad7"], ["Qualified", 36, "#c956d1"]].map(([label, width, color]) => (
          <div key={String(label)} className="grid grid-cols-[74px_1fr_22px] items-center gap-2 text-[9px]"><span>{label}</span><span className="h-2 overflow-hidden rounded-full bg-black/[0.05]"><span className="block h-full rounded-full" style={{ width: `${width}%`, backgroundColor: String(color) }} /></span><span className="text-right text-body">{Math.round(Number(width) / 2)}</span></div>
        ))}
      </div>
    </div>
  );
}

function FeatureVisualChat() {
  return (
    <div className="mt-8 space-y-3 rounded-[22px] border border-black/[0.06] bg-white p-4 shadow-[0_22px_40px_-32px_rgba(18,18,23,0.45)]">
      <p className="mr-8 rounded-[13px_13px_13px_4px] bg-[#f2f2f5] px-3 py-2 text-[10px] leading-snug">Is the apartment still available?</p>
      <p className="ml-8 rounded-[13px_13px_4px_13px] bg-brand px-3 py-2 text-[10px] leading-snug text-white">Yes. Would Saturday work for a visit?</p>
      <div className="flex items-center gap-2 pt-1 text-[9px] text-body"><CheckCircle weight="fill" className="size-4 text-[#25a35a]" /> Follow-up set for Saturday</div>
    </div>
  );
}

function FeatureVisualTasks() {
  return (
    <div className="mt-8 space-y-2 rounded-[22px] border border-black/[0.06] bg-white p-4 shadow-[0_22px_40px_-32px_rgba(18,18,23,0.45)]">
      {[['Call back today', true], ['Share payment plan', true], ['Site visit · Sat 11:00', false]].map(([task, done]) => (
        <div key={String(task)} className="flex items-center gap-2 rounded-xl bg-[#fafafd] px-3 py-2.5 text-[10px]"><span className={`grid size-5 place-items-center rounded-full ${done ? 'bg-[#e8f7ee] text-[#23815b]' : 'bg-[#eeebff] text-brand'}`}>{done ? <Check weight="bold" className="size-3" /> : <Clock weight="bold" className="size-3" />}</span><span className="flex-1 font-medium">{task}</span><span className="text-body">Today</span></div>
      ))}
    </div>
  );
}

export default function OptionTwoLanding() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-ink">
      <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5">
        <div className="mx-auto flex min-h-[66px] max-w-[720px] items-center gap-5 rounded-full border border-white/80 bg-white/92 px-4 py-2 shadow-[0_14px_34px_-22px_rgba(18,18,23,0.45)] backdrop-blur-xl sm:px-5">
          <Link href="/option-3" aria-label={`${siteConfig.name} Option 3 home`} className="shrink-0"><Brand /></Link>
          <nav className="hidden flex-1 items-center justify-center gap-7 text-[14px] font-medium md:flex">
            <a href="#features" className="hover:text-brand">Features</a>
            <a href="#how" className="hover:text-brand">How it works</a>
            <a href="#start" className="hover:text-brand">Start</a>
            <a href="#faq" className="hover:text-brand">FAQ</a>
          </nav>
          <a href={primaryCta} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex min-h-11 items-center rounded-full bg-[#121217] px-5 text-[13px] font-semibold text-white shadow-[0_9px_20px_-12px_rgba(18,18,23,0.8)]">
            Book a demo
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#c9e9ff_0%,#edf8ff_55%,#ffffff_100%)] px-5 pb-0 pt-36 sm:pt-40">
          <div className="pointer-events-none absolute -left-24 top-[32%] size-72 rounded-full bg-white/70 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-[44%] size-80 rounded-full bg-white/80 blur-3xl" />
          <div className="relative mx-auto max-w-7xl text-center">
            <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3.5 py-2 text-[12px] font-medium text-body shadow-[0_10px_24px_-18px_rgba(40,50,80,0.35)] backdrop-blur">
              <Sparkle weight="fill" className="size-4 text-brand" /> Built for real estate teams
            </p>
            <h1 className="mx-auto mt-7 max-w-[860px] text-[clamp(3rem,7vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ink text-balance">
              Every lead in one place. Every follow-up on time.
            </h1>
            <p className="mx-auto mt-7 max-w-[610px] text-[17px] leading-relaxed text-[#5f6571] sm:text-[19px]">
              Endpoint Leads gives real estate offices one view of clients, conversations, agents, and the next action that moves each deal forward.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PillLink href={primaryCta} dark>Get a WhatsApp demo</PillLink>
              <PillLink href={bookingCta}>Book a time</PillLink>
            </div>
            <DashboardPreview />
          </div>
        </section>

        <section id="features" className="scroll-mt-28 px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionTitle label="Features" title="Run the whole office with less chasing." copy="The information your team needs stays beside the client, the conversation, and the next step." />
            <div className="mt-14 grid gap-4 lg:grid-cols-6">
              <article className="min-h-[430px] overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#fafafa] p-7 lg:col-span-2">
                <ChartLineUp className="size-6 text-brand" />
                <h3 className="mt-5 text-[23px] font-medium tracking-[-0.035em]">See the pipeline live</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-body">Know how many leads are new, contacted, qualified, on hold, or won.</p>
                <FeatureVisualPipeline />
              </article>
              <article className="min-h-[430px] overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#fafafa] p-7 lg:col-span-2">
                <ChatsCircle className="size-6 text-brand" />
                <h3 className="mt-5 text-[23px] font-medium tracking-[-0.035em]">Keep every conversation</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-body">Client messages and staff-only notes stay on the same record without mixing the two.</p>
                <FeatureVisualChat />
              </article>
              <article className="min-h-[430px] overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#fafafa] p-7 lg:col-span-2">
                <CalendarBlank className="size-6 text-brand" />
                <h3 className="mt-5 text-[23px] font-medium tracking-[-0.035em]">Never lose the next step</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-body">Give every follow-up an owner and date, then see what is due or overdue.</p>
                <FeatureVisualTasks />
              </article>

              <article className="relative min-h-[360px] overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#f5f2ff] p-7 lg:col-span-3 sm:p-9">
                <IdentificationBadge className="size-7 text-brand" />
                <h3 className="mt-5 max-w-sm text-[28px] font-medium tracking-[-0.04em]">See how every agent is doing.</h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-body">Compare assigned leads, closed deals, reply speed, and missed follow-ups without asking for updates.</p>
                <div className="absolute bottom-0 right-0 w-[64%] min-w-[330px] rounded-tl-[26px] border-l border-t border-black/[0.07] bg-white p-5 shadow-[-20px_-20px_50px_-44px_rgba(18,18,23,0.55)]">
                  {[["Maha", "7 closed", "9 min", 82], ["Ali", "6 closed", "12 min", 68], ["Zoya", "3 closed", "18 min", 46]].map(([name, closed, time, width]) => (
                    <div key={String(name)} className="grid grid-cols-[72px_1fr_58px] items-center gap-3 border-b border-black/[0.05] py-3 text-[10px] last:border-0"><span className="font-semibold">{name}</span><span className="h-2 overflow-hidden rounded-full bg-black/[0.05]"><span className="block h-full rounded-full bg-brand" style={{ width: `${width}%` }} /></span><span className="text-right text-body">{time}</span><span className="col-span-3 -mt-2 text-[9px] text-body">{closed}</span></div>
                  ))}
                </div>
              </article>

              <article className="relative min-h-[360px] overflow-hidden rounded-[30px] border border-black/[0.07] bg-[#f2f9ff] p-7 lg:col-span-3 sm:p-9">
                <DeviceMobile className="size-7 text-brand" />
                <h3 className="mt-5 max-w-sm text-[28px] font-medium tracking-[-0.04em]">Work from the office or the road.</h3>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-body">Open Endpoint Leads in a browser on a computer, tablet, or phone. There is nothing to install.</p>
                <div className="absolute bottom-0 right-[7%] h-[218px] w-[136px] rounded-t-[28px] border-[7px] border-[#17171d] bg-white p-2 shadow-[0_30px_50px_-30px_rgba(18,18,23,0.55)]">
                  <div className="mx-auto h-2 w-12 rounded-full bg-[#17171d]" />
                  <div className="mt-4 space-y-2"><span className="block h-12 rounded-xl bg-[#efecff]" /><span className="block h-8 rounded-xl bg-[#f0f2f6]" /><span className="block h-8 rounded-xl bg-[#f0f2f6]" /><span className="block h-8 rounded-xl bg-[#e8f7ee]" /></div>
                </div>
                <div className="absolute bottom-0 right-[33%] hidden h-[164px] w-[260px] rounded-t-[20px] border border-black/[0.08] bg-white p-3 shadow-[0_30px_50px_-34px_rgba(18,18,23,0.5)] sm:block"><div className="flex gap-2"><span className="h-2 flex-1 rounded bg-[#e7e9ef]" /><span className="h-2 w-8 rounded bg-brand/30" /></div><div className="mt-4 grid grid-cols-3 gap-2"><span className="h-14 rounded-lg bg-[#efecff]" /><span className="h-14 rounded-lg bg-[#e9f8f1]" /><span className="h-14 rounded-lg bg-[#e7f6fb]" /></div><span className="mt-3 block h-12 rounded-lg bg-[#f3f3f6]" /></div>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-black/[0.06] bg-[#fbfbfc] px-5 py-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-[13px] font-medium text-body">One workspace across your working day</p>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[[Desktop, "Office desktop"], [DeviceMobile, "Mobile browser"], [WhatsappIcon, "Client conversations"], [PaperPlaneTilt, "Lead exports"]].map(([Icon, label]) => {
                const ItemIcon = Icon as typeof Desktop;
                return <div key={String(label)} className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-[22px] border border-black/[0.06] bg-white text-[13px] font-medium shadow-[0_18px_36px_-32px_rgba(18,18,23,0.5)]"><ItemIcon className="size-6 text-brand" weight="fill" />{String(label)}</div>;
              })}
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-28 px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionTitle label="How it works" title="From first call to a working CRM in three steps." />
            <div className="mt-16 divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {[
                ["01", "Show us how your office works", "A short call or WhatsApp conversation about your leads, agents, and follow-up process.", ChatsCircle],
                ["02", "Set up your team and clients", "We help add your agents, projects, statuses, and existing lead list.", UsersThree],
                ["03", "Run every lead from one place", "Your team works from the same client record, conversation, and next-step list.", Lightning],
              ].map(([number, title, copy, Icon]) => {
                const StepIcon = Icon as typeof ChatsCircle;
                return (
                  <article key={String(number)} className="grid gap-6 py-9 sm:grid-cols-[70px_1fr_1.4fr_58px] sm:items-center sm:py-11">
                    <span className="text-[13px] font-medium text-body">{String(number)}</span>
                    <h3 className="text-[23px] font-medium tracking-[-0.035em]">{String(title)}</h3>
                    <p className="max-w-xl text-[15px] leading-relaxed text-body">{String(copy)}</p>
                    <span className="grid size-12 place-items-center rounded-full border border-black/[0.08] bg-[#fafafa] text-brand"><StepIcon className="size-5" /></span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="start" className="scroll-mt-28 px-5 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionTitle label="Start" title="Choose the next step for your office." copy="See the product around your team, or ask a quick question first." />
            <div className="mt-14 grid gap-4 lg:grid-cols-2">
              <article className="flex min-h-[420px] flex-col rounded-[32px] border border-black/[0.08] bg-[#f7f7f8] p-8 sm:p-10">
                <span className="grid size-12 place-items-center rounded-full bg-white text-brand shadow-sm"><Phone weight="fill" className="size-5" /></span>
                <h3 className="mt-8 text-[32px] font-medium tracking-[-0.045em]">See a demo for your office</h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-body">A focused walkthrough of leads, agents, conversations, and follow-ups based on how your team works.</p>
                <ul className="mt-8 space-y-3 text-[14px]">
                  {["Around 20 minutes", "Built around your workflow", "Questions answered live"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="size-4 text-brand" weight="bold" />{item}</li>)}
                </ul>
                <a href={bookingCta} target={bookingCta.startsWith("http") ? "_blank" : undefined} rel={bookingCta.startsWith("http") ? "noopener noreferrer" : undefined} className="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#121217] px-6 text-[14px] font-semibold text-white">Book a time <ArrowRight className="size-4" /></a>
              </article>
              <article className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[32px] border border-[#8174ef]/30 bg-[#ece9ff] p-8 sm:p-10">
                <div className="absolute -right-24 -top-24 size-72 rounded-full bg-white/65 blur-3xl" />
                <span className="relative grid size-12 place-items-center rounded-full bg-white shadow-sm"><WhatsappIcon className="size-7" /></span>
                <h3 className="relative mt-8 text-[32px] font-medium tracking-[-0.045em]">Ask us on WhatsApp</h3>
                <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-body">Ask about pricing, setup, moving your current leads, or anything you want to see before booking.</p>
                <div className="relative mt-8 rounded-[18px] bg-white/75 p-4 text-[13px] leading-relaxed text-[#4e4a58] backdrop-blur">Hi Endpoint Leads, I would like to know how this would work for my real estate office.</div>
                <a href={primaryCta} target="_blank" rel="noopener noreferrer" className="relative mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[14px] font-semibold text-white">Start a conversation <ArrowRight className="size-4" /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#111117] px-5 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div><span className="text-[12px] font-medium text-white/55">What owners can see</span><h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.05em]">The full picture, without asking for updates.</h2></div>
              <p className="max-w-xl text-[16px] leading-relaxed text-white/65 lg:justify-self-end">Open leads, response time, agent ownership, overdue follow-ups, status changes, and recent activity stay visible in one workspace.</p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/10 sm:grid-cols-3">
              {[["36", "New leads"], ["17 min", "Average first reply"], ["7", "Overdue follow-ups"]].map(([value, label]) => <div key={label} className="bg-[#18181f] p-8 sm:p-10"><p className="text-[42px] font-medium tracking-[-0.05em]">{value}</p><p className="mt-2 text-[13px] text-white/55">Illustrative dashboard data · {label}</p></div>)}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 px-5 py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><span className="rounded-full border border-black/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-body">FAQ</span><h2 className="mt-6 text-[clamp(2.4rem,5vw,3.8rem)] font-medium leading-[1.06] tracking-[-0.05em]">Questions before you start.</h2><p className="mt-5 max-w-sm text-[15px] leading-relaxed text-body">Need something else? Message us and we will answer directly.</p><a href={primaryCta} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-brand">Ask a question <ArrowRight className="size-4" /></a></div>
            <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {faqs.map(([question, answer], index) => (
                <details key={question} open={index === 0} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-medium"><span>{question}</span><span className="grid size-9 flex-none place-items-center rounded-full border border-black/[0.08]"><CaretDown className="size-4 transition-transform group-open:rotate-180" /></span></summary>
                  <p className="max-w-2xl pr-12 pt-4 text-[14px] leading-relaxed text-body">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-5 pb-8 pt-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-[linear-gradient(145deg,#b9ddff_0%,#d9d5ff_52%,#9a8cf7_100%)] px-6 py-16 text-center sm:px-12 sm:py-24">
            <ShieldCheck weight="fill" className="mx-auto size-8 text-brand" />
            <h2 className="mx-auto mt-6 max-w-[760px] text-[clamp(2.5rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.055em]">Every client. Every conversation. Every next step.</h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-[#4f4b60]">See how Endpoint Leads fits your real estate office.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3"><PillLink href={primaryCta} dark>Get a WhatsApp demo</PillLink><PillLink href={bookingCta}>Book a time</PillLink></div>
          </div>
        </section>
      </main>

      <footer className="px-5 pb-8 pt-16">
        <div className="mx-auto max-w-7xl border-t border-black/[0.08] pt-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
            <div><Brand /><p className="mt-5 max-w-sm text-[14px] leading-relaxed text-body">The CRM for real estate offices. Every client and every next step in one place.</p></div>
            <div className="text-[14px]"><p className="font-semibold">Product</p><div className="mt-4 flex flex-col gap-3 text-body"><a href="#features">Features</a><a href="#how">How it works</a><a href="#start">Get started</a><a href={siteConfig.signInHref} target="_blank" rel="noopener noreferrer">Sign in</a></div></div>
            <div className="text-[14px]"><p className="font-semibold">Legal</p><div className="mt-4 flex flex-col gap-3 text-body"><Link href="/privacy-policy">Privacy policy</Link><Link href="/policy-for-automation">Automation terms</Link><Link href="/user-data-deletion-request">Data deletion</Link></div></div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] py-6 text-[12px] text-body"><span>© 2026 Endpoint Leads</span><span>Option 3</span></div>
        </div>
      </footer>
    </div>
  );
}
