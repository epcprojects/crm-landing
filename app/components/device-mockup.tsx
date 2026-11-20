"use client";

// Live-HTML illustration of the product on a laptop and a phone, built to look
// like a real product shot: a 16:10 laptop with a camera and a base, and a
// phone with a dynamic island, status bar and home bar.
// Every name, message and time is sample data.
//
// The phone plays one short story on a loop: Usman asks if he should leave,
// Ali checks, then confirms. When Ali confirms, the next step is ticked off
// and Usman's row updates on the laptop too.

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  BatteryFull,
  Bell,
  Briefcase,
  CaretLeft,
  CellSignalFull,
  ChartBar,
  ChatCircle,
  Check as CheckIcon,
  MagnifyingGlass,
  PaperPlaneRight,
  Phone as PhoneIcon,
  Plus,
  SquaresFour,
  UserCircle,
  Users,
  VideoCamera,
  ListChecks,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

// 0 empty · 1 Usman asks · 2 Ali typing · 3 Ali checks · 4 Ali typing
// 5 Ali confirms · 6 next step done · -1 fading out before the loop restarts
const DONE = 6;
const TIMELINE: [number, number][] = [
  [1400, 1],
  [2700, 2],
  [4000, 3],
  [5300, 4],
  [6600, 5],
  [7500, DONE],
  [13000, -1],
  [13550, 0],
];
const LOOP_GAP = 900;

// The laptop is drawn at a fixed size and scaled to fit, so it keeps real proportions.
const SCREEN_W = 920;
const SCREEN_H = 575;
const LID_PAD_X = 12;
const LID_PAD_TOP = 16;
const LID_PAD_BOTTOM = 12;
const BASE_H = 14;
const CHASSIS_W = SCREEN_W + LID_PAD_X * 2;
const CHASSIS_H = SCREEN_H + LID_PAD_TOP + LID_PAD_BOTTOM + BASE_H;

const nav: { label: string; Icon: PhosphorIcon; active?: boolean; badge?: number }[] = [
  { label: "Dashboard", Icon: SquaresFour },
  { label: "Clients", Icon: Users, active: true },
  { label: "Conversations", Icon: ChatCircle, badge: 3 },
  { label: "Tasks", Icon: ListChecks },
  { label: "Deals", Icon: Briefcase },
  { label: "Agents", Icon: UserCircle },
  { label: "Reports", Icon: ChartBar },
];

const tones = {
  due: "bg-[#e4e0ff] text-[#2f2496]",
  booked: "bg-[#e3edff] text-[#1f4aa8]",
  fresh: "bg-[#efeff1] text-[#5d5f6b]",
  deal: "bg-[#ffeedb] text-[#9a4a00]",
};

const rows = [
  { name: "Usman", city: "Islamabad", prop: "Plot, Block A", owner: "Ali", status: "Follow-up due", tone: tones.due, last: "3:52 pm", target: true },
  { name: "Sara", city: "Rawalpindi", prop: "Apartment, Tower B", owner: "Maha", status: "Viewing booked", tone: tones.booked, last: "2:35 pm" },
  { name: "Bilal", city: "Islamabad", prop: "Flat, Block C", owner: "Ali", status: "New enquiry", tone: tones.fresh, last: "11:42 am" },
  { name: "Hina", city: "Lahore", prop: "Shop, Phase 2", owner: "Maha", status: "Negotiating", tone: tones.deal, last: "10:20 am" },
  { name: "Ayesha", city: "Lahore", prop: "Villa, Phase 4", owner: "Zoya", status: "Follow-up due", tone: tones.due, last: "Yesterday" },
  { name: "Zain", city: "Islamabad", prop: "Plot, Block D", owner: "Hamza", status: "New enquiry", tone: tones.fresh, last: "Yesterday" },
];

function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

function Avatar({
  letter,
  className = "size-8",
  tone = "bg-[#e4e0ff] text-[#2f2496]",
}: {
  letter: string;
  className?: string;
  tone?: string;
}) {
  return (
    <span
      className={`${className} ${tone} grid shrink-0 place-items-center rounded-full text-[12px] font-bold`}
    >
      {letter}
    </span>
  );
}

function Check({ className = "size-3.5" }: { className?: string }) {
  return <CheckIcon aria-hidden="true" weight="bold" className={className} />;
}

/* ---------------------------------- laptop --------------------------------- */

function LaptopScreen({ done }: { done: boolean }) {
  return (
    <div
      className="relative grid overflow-hidden bg-white text-ink"
      style={{
        width: SCREEN_W,
        height: SCREEN_H,
        gridTemplateColumns: "196px minmax(0, 1fr)",
      }}
    >
      {/* sidebar */}
      <div className="flex flex-col border-r border-black/[0.07] bg-[#f7f7fc] px-4 py-5">
        <p className="px-1 text-[16px] font-extrabold tracking-[-0.02em]">
          Endpoint<span className="text-brand">Leads</span>
        </p>
        <ul className="mt-6 space-y-1">
          {nav.map((item, index) => (
            <li
              key={item.label}
              style={stagger(index)}
              className={`seq-in flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] font-semibold ${
                item.active ? "bg-brand/10 text-brand" : "text-ink/65"
              }`}
            >
              <item.Icon aria-hidden="true" weight="regular" className="size-[18px] shrink-0" />
              {item.label}
              {item.badge && (
                <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-2.5 rounded-xl border border-black/[0.07] bg-white p-2.5">
          <Avatar letter="A" className="size-9" />
          <span>
            <span className="block text-[13px] font-bold leading-tight">Ali Khan</span>
            <span className="block text-[12px] text-ink/60">Sales agent</span>
          </span>
        </div>
      </div>

      {/* main */}
      <div className="min-w-0">
        {/* top bar */}
        <div className="flex h-16 items-center justify-between border-b border-black/[0.07] px-6">
          <div className="flex w-[340px] items-center gap-2.5 rounded-lg bg-[#f3f3f7] px-3.5 py-2.5 text-[14px] text-ink/50">
            <MagnifyingGlass aria-hidden="true" className="size-4 shrink-0" />
            Search clients, phone or property
          </div>
          <div className="flex items-center gap-4">
            <span className="relative text-ink/65">
              <Bell aria-hidden="true" className="size-[22px]" />
              <span
                key={done ? "on" : "off"}
                className={`absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-brand text-[10px] font-bold text-white ${
                  done ? "pop-in" : "opacity-0"
                }`}
              >
                1
              </span>
            </span>
            <Avatar letter="A" className="size-9" />
          </div>
        </div>

        <div className="px-6 pt-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[24px] font-extrabold leading-none tracking-[-0.02em]">
                Clients
              </p>
              <p className="mt-1.5 text-[13px] text-ink/60">28 active clients</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[13px] font-bold text-white">
              <Plus aria-hidden="true" weight="bold" className="size-3.5" />
              Add client
            </span>
          </div>

          <div className="mt-4 flex gap-2 text-[13px] font-semibold">
            {[
              ["All", "28", true],
              ["Follow-up due", "6"],
              ["Viewing booked", "4"],
              ["Negotiating", "3"],
            ].map(([label, count, active]) => (
              <span
                key={label as string}
                className={`rounded-full px-3 py-1.5 ${
                  active ? "bg-ink text-white" : "bg-[#f3f3f7] text-ink/70"
                }`}
              >
                {label} <span className="opacity-60">{count}</span>
              </span>
            ))}
          </div>

          {/* table */}
          <div className="mt-4">
            <div
              className="grid border-b border-black/[0.07] pb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-ink/50"
              style={{ gridTemplateColumns: "1.4fr 1.2fr 1.3fr 0.9fr 0.8fr" }}
            >
              <span>Client</span>
              <span>Status</span>
              <span>Interested in</span>
              <span>Owner</span>
              <span>Last message</span>
            </div>
            <ul>
              {rows.map((row, index) => {
                const confirmed = row.target && done;
                return (
                  <li
                    key={row.name}
                    style={{
                      ...stagger(index + 2),
                      gridTemplateColumns: "1.4fr 1.2fr 1.3fr 0.9fr 0.8fr",
                    }}
                    className={`seq-in grid items-center border-b border-black/[0.06] py-2.5 text-[14px] transition-colors duration-500 ${
                      row.target ? "bg-brand/[0.045]" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Avatar letter={row.name[0]} className="size-8" />
                      <span>
                        <span className="block font-bold leading-tight">{row.name}</span>
                        <span className="block text-[12px] text-ink/55">{row.city}</span>
                      </span>
                    </span>
                    <span>
                      <span
                        key={confirmed ? "confirmed" : "base"}
                        className={`${confirmed ? "pop-in" : ""} inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-bold ${
                          confirmed ? "bg-[#2fb37a]/15 text-[#1d7a52]" : row.tone
                        }`}
                      >
                        {confirmed && <Check className="size-3" />}
                        {confirmed ? "Visit confirmed" : row.status}
                      </span>
                    </span>
                    <span className="text-ink/80">{row.prop}</span>
                    <span className="flex items-center gap-2 text-ink/80">
                      <Avatar letter={row.owner[0]} className="size-6 text-[10px]" />
                      {row.owner}
                    </span>
                    <span
                      key={confirmed ? "now" : "then"}
                      className={`text-[13px] text-ink/65 ${confirmed ? "pop-in font-bold text-ink" : ""}`}
                    >
                      {confirmed ? "3:57 pm" : row.last}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* a soft glare across the glass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.34) 50%, rgba(255,255,255,0) 60%)",
        }}
      />
    </div>
  );
}

function Laptop({ done }: { done: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / CHASSIS_W);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={box} className="w-full" style={{ height: CHASSIS_H * scale }}>
      <div
        style={{
          width: CHASSIS_W,
          height: CHASSIS_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* lid */}
        <div
          className="relative rounded-t-[22px]"
          style={{
            padding: `${LID_PAD_TOP}px ${LID_PAD_X}px ${LID_PAD_BOTTOM}px`,
            background: "linear-gradient(180deg, #2b2b35 0%, #15151c 100%)",
            boxShadow:
              "inset 0 0 0 1.5px #3a3a46, inset 0 1px 0 #55556a, 0 40px 60px -24px rgba(40,30,120,0.32)",
          }}
        >
          {/* camera */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[5px] size-[5px] -translate-x-1/2 rounded-full bg-[#0a0a10] ring-1 ring-[#3a3a46]"
          />
          <div className="overflow-hidden rounded-[6px]">
            <LaptopScreen done={done} />
          </div>
        </div>
        {/* base */}
        <div
          className="relative mx-auto rounded-b-[18px]"
          style={{
            height: BASE_H,
            width: CHASSIS_W + 40,
            marginLeft: -20,
            background: "linear-gradient(180deg, #e9e9ef 0%, #b4b5c2 100%)",
            boxShadow:
              "inset 0 1px 0 #ffffff, 0 30px 40px -10px rgba(40,30,120,0.35)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-[6px] w-[150px] -translate-x-1/2 rounded-b-[10px]"
            style={{ background: "linear-gradient(180deg, #a3a4b3, #c6c7d3)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------- phone --------------------------------- */

function Bubble({
  mine,
  time,
  children,
}: {
  mine?: boolean;
  time: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`msg-in flex flex-col ${
        mine ? "msg-in-mine items-end" : "items-start"
      }`}
    >
      <p
        className={`max-w-[86%] px-3 py-2 text-[13px] leading-snug ${
          mine
            ? "rounded-[18px] rounded-br-md bg-brand text-white"
            : "rounded-[18px] rounded-bl-md bg-white text-ink"
        }`}
      >
        {children}
      </p>
      <span className="mt-1 px-1 text-[11px] text-ink/55">{time}</span>
    </div>
  );
}

function Typing() {
  return (
    <div className="msg-in msg-in-mine flex justify-end">
      <span
        role="status"
        aria-label="Typing"
        className="inline-flex items-center gap-1 rounded-[18px] rounded-br-md bg-brand/15 px-3.5 py-3"
      >
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            aria-hidden="true"
            className="typing-dot size-1.5 rounded-full bg-ink/45"
            style={{ animationDelay: `${dot * 150}ms` }}
          />
        ))}
      </span>
    </div>
  );
}

function NextStep({ done }: { done: boolean }) {
  return (
    <div
      key={done ? "done" : "open"}
      className={`${
        done
          ? "pop-in border-[#2fb37a]/35 bg-[#eaf7f1]"
          : "border-brand/20 bg-white"
      } rounded-2xl border p-3`}
    >
      <p
        className={`flex items-center gap-1.5 font-label text-[11px] tracking-[0.14em] ${
          done ? "text-[#1d7a52]" : "text-brand"
        }`}
      >
        {done && <Check className="size-3" />}
        {done ? "DONE" : "NEXT STEP"}
      </p>
      <p className="mt-1 text-[13px] font-bold leading-snug">
        {done ? "Visit confirmed for 4 pm" : "Confirm 4 pm visit"}
      </p>
      <p className="text-[12px] text-ink/60">
        Ali · {done ? "Just now" : "Due today"}
      </p>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-11 items-end justify-between px-6 pb-1 text-[13px] font-bold">
      <span>3:57</span>
      <span className="flex items-center gap-1.5">
        <CellSignalFull aria-hidden="true" weight="fill" className="size-4" />
        <BatteryFull aria-hidden="true" weight="fill" className="size-[18px]" />
      </span>
    </div>
  );
}

function Phone({ step }: { step: number }) {
  const done = step >= DONE && step !== -1;
  return (
    <div className="relative mx-auto w-[252px]">
      {/* side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[88px] h-7 w-[3px] rounded-l bg-[#2c2c36]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[132px] h-12 w-[3px] rounded-l bg-[#2c2c36]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[190px] h-12 w-[3px] rounded-l bg-[#2c2c36]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[150px] h-16 w-[3px] rounded-r bg-[#2c2c36]" />

      {/* frame */}
      <div
        className="rounded-[44px] p-[9px]"
        style={{
          background: "linear-gradient(145deg, #4a4a56 0%, #1a1a22 45%, #3b3b47 100%)",
          boxShadow:
            "inset 0 0 0 1.5px #5d5d6b, inset 0 0 0 3px #101016, 0 34px 50px -14px rgba(40,30,120,0.5)",
        }}
      >
        <div className="relative overflow-hidden rounded-[36px] bg-[#f4f3fc] text-ink">
          {/* dynamic island */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-2.5 z-10 h-[24px] w-[78px] -translate-x-1/2 rounded-full bg-black"
          />
          <StatusBar />

          {/* chat header */}
          <div className="flex items-center gap-2 border-b border-black/[0.07] bg-white px-3 py-2.5">
            <CaretLeft aria-hidden="true" weight="bold" className="size-4 shrink-0 text-brand" />
            <Avatar letter="U" className="size-8" />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-extrabold leading-tight">Usman</p>
              <p className="flex items-center gap-1 text-[11px] text-ink/60">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-[#2fb37a]" />
                Online
              </p>
            </div>
            <VideoCamera aria-hidden="true" weight="fill" className="size-[18px] shrink-0 text-brand" />
            <PhoneIcon aria-hidden="true" weight="fill" className="size-[18px] shrink-0 text-brand" />
          </div>

          {/* messages: fixed height so the phone never jumps */}
          <div
            className={`flex h-[236px] flex-col justify-end gap-2 overflow-hidden px-3 py-3 transition-opacity duration-500 ${
              step === -1 ? "opacity-0" : "opacity-100"
            }`}
          >
            {step >= 1 && <Bubble time="3:52 pm">Should I leave to see the plot?</Bubble>}
            {step === 2 && <Typing />}
            {step >= 3 && (
              <Bubble mine time="3:55 pm">
                Checking with the site team.
              </Bubble>
            )}
            {step === 4 && <Typing />}
            {step >= 5 && (
              <Bubble mine time="3:57 pm">
                Confirmed. See you at 4 pm.
              </Bubble>
            )}
          </div>

          <div className="px-3 pb-2.5">
            <NextStep done={done} />
          </div>

          {/* composer */}
          <div className="flex items-center gap-2 border-t border-black/[0.07] bg-white px-3 py-2.5">
            <Plus aria-hidden="true" weight="bold" className="size-[18px] shrink-0 text-ink/50" />
            <span className="flex-1 rounded-full bg-[#f3f3f7] px-3 py-1.5 text-[13px] text-ink/50">
              Message
            </span>
            <span className="grid size-7 place-items-center rounded-full bg-brand text-white">
              <PaperPlaneRight aria-hidden="true" weight="fill" className="size-3.5" />
            </span>
          </div>
          {/* home bar */}
          <div className="flex h-5 items-center justify-center bg-white">
            <span className="h-1 w-[92px] rounded-full bg-black/75" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- the pair --------------------------------- */

export default function DeviceMockup() {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  // The story loop.
  useEffect(() => {
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setStep(DONE));
      return () => cancelAnimationFrame(raf);
    }

    const timers: number[] = [];
    const play = (offset: number) => {
      TIMELINE.forEach(([at, value]) => {
        timers.push(window.setTimeout(() => setStep(value), offset + at));
      });
      const end = offset + TIMELINE[TIMELINE.length - 1][0];
      timers.push(window.setTimeout(() => play(LOOP_GAP - TIMELINE[0][0]), end));
    };
    play(0);
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  // Pointer and scroll parallax.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let raf = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--sy", String(Math.min(window.scrollY, 700)));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (event: PointerEvent) => {
      mx = (event.clientX / window.innerWidth - 0.5) * 2;
      my = (event.clientY / window.innerHeight - 0.5) * 2;
      queue();
    };

    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const done = step >= DONE && step !== -1;

  return (
    <div
      ref={root}
      className="relative mx-auto w-full max-w-[720px] pb-0 sm:pb-6 lg:max-w-none lg:pb-12"
    >
      <p className="sr-only">
        Illustration of the product: a client list on a laptop and a client
        conversation on a phone.
      </p>
      <div aria-hidden="true">
        {/* the laptop shows from md up; phones see only the phone */}
        <div className="device-rise hidden md:block md:w-[calc(100%-2rem)] lg:w-full">
          <div className="parallax-laptop">
            <Laptop done={done} />
          </div>
        </div>
        <div className="phone-in md:absolute md:-bottom-4 md:-right-5">
          <div className="origin-bottom-right md:scale-[0.86]">
            <div className="parallax-phone">
              <div className="phone-float">
                <Phone step={step} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
