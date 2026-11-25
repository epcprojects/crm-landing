// The problems as a card grid: a centred label and heading, three upright
// cards (text on top, widgets underneath) and two wide cards (text left,
// widgets right). Each picture is a small cluster of floating widgets that
// shows the problem: they pop in when the card comes on screen, then drift
// gently, with a live detail (a ticking clock, a ringing badge, a note being
// crossed out). Every name and number is sample data.

import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { BellSlash, ChatCircleDots, Clock, NotePencil, PencilSimpleLine, Question, Snowflake, UserCircleDashed } from "@phosphor-icons/react/dist/ssr";
import { statuses, type StatusKey } from "./dashboard-parts";
import Reveal from "./reveal";
import WaitTimer from "./wait-timer";
import WhatsappIcon from "./whatsapp-icon";

const card =
  "overflow-hidden rounded-[24px] border border-black/[0.06] bg-[linear-gradient(180deg,#fdfdfd_0%,#f5f5f5_100%)]";
const widget =
  "rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_18px_36px_-18px_rgba(16,24,40,0.32)]";

function Text({ title, line }: { title: string; line: string }) {
  return (
    <div>
      <h3 className="text-[22px] font-normal leading-tight tracking-[-0.02em] text-ink sm:text-[24px]">{title}</h3>
      <p className="mt-3 max-w-[17rem] text-[15px] leading-snug text-body">{line}</p>
    </div>
  );
}

/** One floating widget: pops in (order i), then drifts (offset f seconds). */
function Float({ i, f = 0, className, children }: { i: number; f?: number; className: string; children: ReactNode }) {
  return (
    <div className={`pw-in absolute ${className}`} style={{ "--i": i } as CSSProperties}>
      <div className="pw-float" style={{ "--f": `${-f}s` } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}

/** A small round icon badge in a widget. */
function Badge({ tone, children, className = "" }: { tone: string; children: ReactNode; className?: string }) {
  return (
    <span
      className={`grid size-9 flex-none place-items-center rounded-xl ${className}`}
      style={{ color: tone, backgroundColor: `color-mix(in srgb, ${tone} 13%, white)` }}
    >
      {children}
    </span>
  );
}

/** A round profile photo (AI-made sample people, in public/avatars). */
function Photo({ src, name, size, className = "" }: { src: string; name: string; size: number; className?: string }) {
  return (
    <Image
      src={`/avatars/${src}.webp`}
      alt={name}
      width={size}
      height={size}
      className={`flex-none rounded-full object-cover ring-2 ring-white shadow-[0_2px_6px_rgba(16,24,40,0.18)] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ------------------------------- pictures ------------------------------- */

/** New messages pile up while a clock keeps counting and nobody owns them. */
export function WaitingLeads() {
  return (
    <div className="relative mx-auto h-[250px] w-full max-w-[300px]">
      <Float i={0} f={0} className="left-0 top-0 w-[86%]">
        <div className={`${widget} flex items-center gap-3 px-3.5 py-3`}>
          <Photo src="usman" name="Usman Tariq" size={36} />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#101828]">
              Usman Tariq <WhatsappIcon className="size-3.5" />
            </span>
            <span className="block truncate text-[12px] text-[#667085]">Is the 10 marla plot still available?</span>
          </span>
          <span className="pw-ping grid size-5 flex-none place-items-center rounded-full bg-[#25d366] text-[10px] font-bold text-white">3</span>
        </div>
      </Float>
      <Float i={1} f={2} className="right-0 top-[74px] w-[78%]">
        <div className={`${widget} flex items-center gap-3 px-3.5 py-3`}>
          <Photo src="sara" name="Sara Khan" size={36} />
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-[#101828]">Sara Khan</span>
            <span className="block truncate text-[12px] text-[#667085]">Hello? Anyone there?</span>
          </span>
          <span className="pw-ping grid size-5 flex-none place-items-center rounded-full bg-[#25d366] text-[10px] font-bold text-white">2</span>
        </div>
      </Float>
      <Float i={2} f={4} className="bottom-2 left-1 w-[88%]">
        <div className={`${widget} flex items-center gap-3 border-[#fecdca] px-3.5 py-3`}>
          <Badge tone="#d92d20">
            <Clock weight="bold" className="pw-tick size-[18px]" />
          </Badge>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-medium uppercase whitespace-nowrap tracking-wide text-[#b42318]">No reply yet</span>
            <span className="block text-[20px] font-bold leading-tight text-[#101828]">
              <WaitTimer start={2 * 3600 + 10 * 60 + 5} />
            </span>
          </span>
          <span className="flex flex-none flex-col items-center gap-0.5 text-[10px] text-[#98a2b3]">
            <UserCircleDashed weight="regular" className="pw-blink size-7 text-[#98a2b3]" />
            nobody
          </span>
        </div>
      </Float>
    </div>
  );
}

/** Follow-ups on a sticky note, a promise with no date, and no reminders. */
export function NotesFollowUps() {
  const notes = [
    { text: "Call Sara back… Tues??", strike: false },
    { text: "Send payment plan to Bilal", strike: true },
    { text: "Usman visit, Sat 4 pm?", strike: false },
    { text: "Who has Nida's number?", strike: false },
  ];
  return (
    <div className="relative mx-auto h-[250px] w-full max-w-[300px]">
      <Float i={0} f={1} className="left-0 top-0 w-[82%]">
        <div className="-rotate-2 rounded-2xl border border-[#f3e19a] bg-[#fff6cf] p-4 shadow-[0_18px_36px_-18px_rgba(120,90,0,0.45)]">
          <p className="flex items-center gap-1.5 text-[12px] font-bold text-[#8a6a00]">
            <NotePencil weight="duotone" className="size-4" /> follow ups!!
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {notes.map((n) => (
              <li key={n.text} className="flex items-center gap-2 text-[13px] leading-snug text-[#3d3200]">
                <span className="size-2.5 flex-none rounded-full border-[1.5px] border-[#c9b25a]" />
                <span className={n.strike ? "pw-strike text-[#a3925a]" : ""}>{n.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Float>
      <Float i={1} f={3} className="right-0 top-[118px] w-max">
        <div className={`${widget} flex items-center gap-2.5 px-3 py-2.5`}>
          <Badge tone="#b54708">
            <BellSlash weight="bold" className="pw-wiggle size-[18px]" />
          </Badge>
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold text-[#101828]">0 reminders</span>
            <span className="block text-[11px] text-[#667085]">Nobody gets a nudge</span>
          </span>
        </div>
      </Float>
      <Float i={2} f={5} className="bottom-0 left-3 w-max max-w-[95%]">
        <div className={`${widget} flex items-center gap-2.5 px-3 py-2.5`}>
          <Badge tone="#0b7fd1">
            <ChatCircleDots weight="duotone" className="size-[18px]" />
          </Badge>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-[#101828]">“I’ll call you tomorrow”</span>
            <span className="flex items-center gap-1 text-[11px] text-[#667085]">
              Said 6 days ago <span className="pw-blink size-1.5 rounded-full bg-[#f04438]" />
            </span>
          </span>
        </div>
      </Float>
    </div>
  );
}

/** A lead whose progress stopped: the bar fills, then stalls and goes cold. */
export function QuietLead() {
  const steps: StatusKey[] = ["contacted", "quote", "nego"];
  return (
    <div className="relative mx-auto h-[250px] w-full max-w-[300px]">
      <Float i={0} f={0} className="left-0 right-0 top-0">
        <div className={`${widget} flex flex-col gap-3.5 p-4`}>
          <div className="flex items-center gap-3">
            <Photo src="zainab" name="Zainab Ali" size={40} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-semibold text-[#101828]">2 bed apartment on loan</span>
              <span className="block text-[12px] text-[#667085]">Zainab Ali · Negotiation</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {steps.map((key, n) => (
              <span key={key} className="h-2 flex-1 overflow-hidden rounded-full bg-[#f2f4f7]">
                <span className="fx-fill block h-full rounded-full" style={{ backgroundColor: statuses[key].color, "--i": n + 2 } as CSSProperties} />
              </span>
            ))}
            <span className="relative h-2 flex-1 rounded-full bg-[#eaecf0]">
              <span className="pw-blink absolute -top-0.5 left-0 size-3 rounded-full border-2 border-white bg-[#f04438]" />
            </span>
          </div>
          <p className="flex items-center gap-1 text-[12px] font-medium text-[#b42318]">
            <Clock weight="bold" className="size-3.5" /> No update for 18 days
          </p>
        </div>
      </Float>
      <Float i={1} f={2} className="bottom-12 right-0 w-max">
        <div className={`${widget} flex items-center gap-2.5 border-[#b9e6fe] px-3 py-2.5`}>
          <Badge tone="#0b7fd1">
            <Snowflake weight="bold" className="pw-spin size-[18px]" />
          </Badge>
          <span>
            <span className="block text-[13px] font-semibold text-[#101828]">Gone cold</span>
            <span className="block text-[11px] text-[#667085]">Buyer stopped replying</span>
          </span>
        </div>
      </Float>
      <Float i={2} f={4} className="bottom-0 left-0 w-[64%]">
        <p className="rounded-[14px_14px_14px_4px] bg-[#eef0f4] px-3 py-2 text-[12px] leading-snug text-[#475467] shadow-[0_12px_24px_-16px_rgba(16,24,40,0.4)]">
          “Let me discuss it with my husband.”
        </p>
      </Float>
    </div>
  );
}

/** Agents with their reply times and how their leads are going. Nobody
 *  watches it, so who replied today is a guess and one agent's leads pile up. */
export function AgentBreakdown() {
  const rows: { photo: string; name: string; dot: string; reply: string; replyTone: string; won: number; hold: number }[] = [
    { photo: "maha", name: "Maha Khan", dot: "bg-[#12b76a]", reply: "4 min", replyTone: "bg-[#ecfdf3] text-[#067647]", won: 7, hold: 3 },
    { photo: "ali", name: "Ali Raza", dot: "bg-[#f79009]", reply: "1 h 20", replyTone: "bg-[#fffaeb] text-[#b54708]", won: 4, hold: 6 },
    { photo: "hamza", name: "Hamza Sheikh", dot: "bg-[#d0d5dd]", reply: "no reply", replyTone: "bg-[#f2f4f7] text-[#667085]", won: 1, hold: 14 },
  ];
  return (
    <div className="relative mx-auto h-[310px] w-full max-w-[360px]">
      <Float i={0} f={0} className="right-0 top-0 w-[90%]">
        <div className={`${widget} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-black/[0.05] px-4 py-2.5">
            <span className="text-[12px] font-semibold text-[#101828]">Agents · today</span>
            <span className="flex items-center gap-1 text-[11px] text-[#98a2b3]">
              <span className="size-1.5 rounded-full bg-[#98a2b3]" /> not live
            </span>
          </div>
          <ul className="flex flex-col">
            {rows.map((r, n) => {
              const total = r.won + r.hold;
              return (
                <li key={r.name} className="flex flex-col gap-2 border-b border-black/[0.05] px-4 py-2.5 last:border-0">
                  <div className="flex items-center gap-2.5 text-[13px]">
                    <span className="relative flex-none">
                      <Photo src={r.photo} name={r.name} size={32} />
                      <span className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white ${r.dot}`} />
                    </span>
                    <span className="mr-auto truncate font-semibold text-[#101828]">{r.name}</span>
                    <span className={`flex-none rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.replyTone}`}>{r.reply}</span>
                  </div>
                  <div className="flex h-1.5 overflow-hidden rounded-full bg-[#f2f4f7]">
                    <span className="fx-fill flex h-full" style={{ width: "100%", "--i": n + 2 } as CSSProperties}>
                      <span style={{ width: `${(r.won / total) * 100}%`, backgroundColor: statuses.won.color }} />
                      <span style={{ width: `${(r.hold / total) * 100}%`, backgroundColor: statuses.hold.color }} />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Float>
      <Float i={1} f={2} className="-left-1 top-[128px] w-max sm:-left-5">
        <div className={`${widget} flex items-center gap-2 border-[#fedf89] px-3 py-2`}>
          <span className="pw-ping size-2 rounded-full bg-[#f79009]" />
          <span className="text-[12px] font-semibold text-[#101828]">14 leads on hold</span>
          <span className="text-[11px] text-[#667085]">· Hamza</span>
        </div>
      </Float>
      <Float i={2} f={4} className="-left-1 bottom-0 w-max sm:-left-5">
        <div className={`${widget} flex items-center gap-3 px-3 py-2.5`}>
          <Badge tone="#7a3cf0">
            <Question weight="bold" className="pw-wiggle size-[18px]" />
          </Badge>
          <span>
            <span className="block text-[13px] font-semibold text-[#101828]">Who replied today?</span>
            <span className="block text-[11px] text-[#667085]">Not tracked anywhere</span>
          </span>
          <span className="flex -space-x-2">
            {["maha", "ali", "hamza"].map((t, n) => (
              <span key={t} className="pw-blink relative size-7 rounded-full" style={{ animationDelay: `${n * 250}ms` }}>
                <Photo src={t} name="" size={28} className="opacity-60 grayscale" />
                <span className="absolute inset-0 grid place-items-center rounded-full text-[11px] font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">?</span>
              </span>
            ))}
          </span>
        </div>
      </Float>
    </div>
  );
}

/** The pipeline as one stacked bar and four stages. The total exists, but it
 *  is counted by hand and lost deals carry no reason. */
export function StageCounts() {
  const items: [StatusKey, number][] = [
    ["new", 36],
    ["contacted", 368],
    ["quote", 202],
    ["lost", 754],
  ];
  const total = items.reduce((sum, [, count]) => sum + count, 0);
  return (
    <div className="relative mx-auto h-[310px] w-full max-w-[360px]">
      <Float i={0} f={1} className="right-0 top-0 w-[90%]">
        <div className={`${widget} flex flex-col gap-3 p-4`}>
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-semibold text-[#101828]">Pipeline</span>
            <span className="text-[20px] font-bold leading-none text-[#101828]">{total.toLocaleString("en-US")}</span>
          </div>
          <div className="flex h-2.5 overflow-hidden rounded-full bg-[#f2f4f7]">
            <span className="fx-fill flex h-full w-full gap-0.5" style={{ "--i": 2 } as CSSProperties}>
              {items.map(([status, count]) => (
                <span
                  key={status}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{ width: `${(count / total) * 100}%`, backgroundColor: statuses[status].color }}
                />
              ))}
            </span>
          </div>
          <ul className="flex flex-col gap-2">
            {items.map(([status, count], n) => {
              const st = statuses[status];
              const Icon = st.icon;
              return (
                <li key={status} className="pw-in flex items-center gap-2 text-[13px] text-[#344054]" style={{ "--i": n + 2 } as CSSProperties}>
                  <Icon weight="regular" className="size-4 flex-none" style={{ color: st.color }} />
                  <span className="mr-auto truncate">{st.label}</span>
                  <span className="font-bold text-[#101828]">{count}</span>
                  <span className="w-9 text-right text-[11px] text-[#98a2b3]">{Math.round((count / total) * 100)}%</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Float>
      <Float i={1} f={3} className="-left-1 top-[118px] w-max sm:-left-5">
        <div className={`${widget} flex items-center gap-2 border-[#fecdca] px-3 py-2`}>
          <span className="pw-ping size-2 rounded-full bg-[#f04438]" />
          <span className="text-[12px] font-semibold text-[#101828]">754 lost</span>
          <span className="text-[11px] text-[#667085]">· no reason logged</span>
        </div>
      </Float>
      <Float i={2} f={5} className="-left-1 bottom-0 w-max sm:-left-5">
        <div className={`${widget} flex items-center gap-3 px-3 py-2.5`}>
          <Badge tone="#e0386a" className="pw-ping-soft">
            <PencilSimpleLine weight="bold" className="pw-wiggle size-[18px]" />
          </Badge>
          <span>
            <span className="block text-[13px] font-semibold text-[#101828]">Counted by hand</span>
            <span className="block text-[11px] text-[#667085]">Last count 3 weeks ago</span>
          </span>
        </div>
      </Float>
    </div>
  );
}

/* --------------------------------- cards -------------------------------- */

/** The soft two-colour wash over each whole card, the same kind as the
 *  benefit cards further down (lighter here): one colour from the bottom left, one from the
 *  top right, over a pale base. */
function wash(a: string, b: string, from: string, to: string) {
  return `radial-gradient(90% 85% at 0% 100%,${a}38 0%,rgba(255,255,255,0) 62%),radial-gradient(80% 75% at 100% 0%,${b}4d 0%,rgba(255,255,255,0) 66%),linear-gradient(165deg,${from} 0%,${to} 100%)`;
}
const washes = {
  coral: wash("#ff7a59", "#ffc46b", "#fff7f2", "#ffe4d8"),
  teal: wash("#10b9a0", "#7fe6c4", "#f1fbf8", "#d6f4ea"),
  sky: wash("#4f6bff", "#6fc6ff", "#f4f5ff", "#dfe4ff"),
  violet: wash("#a855f7", "#f472b6", "#fbf5ff", "#f2e2ff"),
  amber: wash("#f59e0b", "#b5e655", "#fffbf0", "#fdf0cc"),
};

function Wide({ title, line, bg, children }: { title: string; line: string; bg: string; children: ReactNode }) {
  return (
    <li className={`${card} grid items-center gap-6 p-7 sm:grid-cols-[0.75fr_1.25fr] sm:p-8 lg:col-span-3`} style={{ background: bg }}>
      <Text title={title} line={line} />
      <Reveal className="w-full">
        <div aria-hidden="true">{children}</div>
      </Reveal>
    </li>
  );
}

function Upright({ title, line, bg, children }: { title: string; line: string; bg: string; children: ReactNode }) {
  return (
    <li className={`${card} flex min-h-[420px] flex-col p-7 sm:p-8 lg:col-span-2`} style={{ background: bg }}>
      <Text title={title} line={line} />
      <Reveal className="mt-auto pt-8">
        <div aria-hidden="true">{children}</div>
      </Reveal>
    </li>
  );
}

export default function ProblemSection() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="scroll-mt-20 bg-white">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-12 px-5 py-16 sm:gap-16 sm:px-10 sm:py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="rounded-full border border-[#e6e6e6] bg-white px-3.5 py-1.5 text-[13px] text-ink shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <span className="sr-only">THE PROBLEM</span>
            <span aria-hidden="true">The problem</span>
          </p>
          <h2
            id="problem-heading"
            className="max-w-[40rem] text-[clamp(2rem,4vw,3rem)] !font-medium leading-[1.15] text-balance"
          >
            Your office is busy. Are your clients <span className="serif">moving forward?</span>
          </h2>
        </div>

        <ul className="grid gap-4 lg:grid-cols-6">
          <Upright bg={washes.coral} title="Clients wait for answers" line="Nobody is sure whose job it is to reply.">
            <WaitingLeads />
          </Upright>
          <Upright bg={washes.amber} title="Follow-ups live in heads" line="Next steps are scattered across chats and memory.">
            <NotesFollowUps />
          </Upright>
          <Upright bg={washes.sky} title="Deals go quiet" line="Interested buyers go cold before anyone notices.">
            <QuietLead />
          </Upright>
          <Wide bg={washes.violet} title="No view of your agents" line="You can’t see who is closing and who needs help.">
            <AgentBreakdown />
          </Wide>
          <Wide bg={washes.teal} title="No picture of your pipeline" line="You can’t tell how many leads sit at each stage.">
            <StageCounts />
          </Wide>
        </ul>
      </div>
    </section>
  );
}
