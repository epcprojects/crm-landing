"use client";

// Three things you can try: client vs staff-only chat, overdue next steps,
// and who sees what. One shows at a time behind tabs. All names are sample data.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BatteryFull,
  CaretLeft,
  CaretRight,
  CellSignalFull,
  Check,
  PaperPlaneRight,
  WifiHigh,
  X,
} from "@phosphor-icons/react/dist/ssr";

/* ----------------------------- 1. two chats ----------------------------- */

type Msg = { who: string; text: string; mine: boolean };

const clientChat: Msg[] = [
  { who: "Sara · 2:10 pm", text: "Can you send me the payment plan for Tower B?", mine: false },
  { who: "Maha · 2:35 pm", text: "Of course, sending it today.", mine: true },
  { who: "Sara · 2:41 pm", text: "Thanks! Is the 3rd floor still free?", mine: false },
  { who: "Maha · 2:44 pm", text: "Checking now, I will confirm within the hour.", mine: true },
];
const staffChat: Msg[] = [
  { who: "Maha · 2:45 pm", text: "@Ali is 3rd floor Tower B still available?", mine: true },
  { who: "Ali · 2:52 pm", text: "Yes, but hold it only till Friday. Owner wants a token payment.", mine: false },
  { who: "Maha · 2:53 pm", text: "Got it. I will mention the Friday deadline to her.", mine: true },
];

/** A phone drawn in HTML: dark rounded frame, side buttons, a camera
 *  island, a status bar and a home bar. Whatever is passed in fills the
 *  screen between the status bar and the home bar. */
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[300px] max-w-[calc(100%-6px)]">
      {/* side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[110px] h-7 w-[3px] rounded-l-sm bg-[#2b2b31]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[160px] h-12 w-[3px] rounded-l-sm bg-[#2b2b31]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[222px] h-12 w-[3px] rounded-l-sm bg-[#2b2b31]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[180px] h-16 w-[3px] rounded-r-sm bg-[#2b2b31]" />
      <div className="rounded-[52px] bg-gradient-to-b from-[#3a3a42] via-[#1c1c21] to-[#2c2c33] p-[3px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85),0_30px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="rounded-[49px] bg-[#0b0b0e] p-[9px]">
          <div className="relative flex h-[600px] flex-col overflow-hidden rounded-[40px] bg-white text-ink">
            {/* status bar and camera island */}
            <div aria-hidden="true" className="relative flex h-12 flex-none items-center justify-between px-7 pt-1 text-[13px] font-semibold">
              <span>9:41</span>
              <span className="absolute left-1/2 top-2.5 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
              <span className="flex items-center gap-1">
                <CellSignalFull weight="fill" className="size-3.5" />
                <WifiHigh weight="bold" className="size-3.5" />
                <BatteryFull weight="fill" className="size-5" />
              </span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
            {/* home bar */}
            <div aria-hidden="true" className="flex h-5 flex-none items-start justify-center bg-white">
              <span className="h-1 w-28 rounded-full bg-ink" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Thread = "client" | "staff";

// Who answers when you send something, and what they say (in turn).
const replies: Record<Thread, { who: string; texts: string[] }> = {
  client: {
    who: "Sara",
    texts: [
      "Great, thank you!",
      "Can I visit the flat on Saturday morning?",
      "What is the final price with parking?",
      "Perfect, see you then.",
    ],
  },
  staff: {
    who: "Ali",
    texts: [
      "Noted. I will tell the owner.",
      "Owner says Saturday 11 am works for a visit.",
      "Done, I added a next step for Friday.",
      "Token payment received, flat is on hold.",
    ],
  },
};

// One-tap messages above the input, so the demo works without typing.
const quick: Record<Thread, string[]> = {
  client: ["Sending the floor plan now", "Can we book a visit?", "The price includes parking"],
  staff: ["@Ali please hold it till Friday", "Owner approved the discount", "Add a follow-up for Monday"],
};

function nowLabel() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).toLowerCase();
}

/** A row of one-tap replies. No scrollbar: move it with the arrows, or by
 *  dragging (mouse) or swiping (touch) left and right. */
function QuickReplies({ items, staff, onPick }: { items: string[]; staff: boolean; onPick: (text: string) => void }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = rowRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  };
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = (dir: 1 | -1) => rowRef.current?.scrollBy({ left: dir * 140, behavior: "smooth" });
  const arrow = (dir: 1 | -1, off: boolean) => (
    <button
      type="button"
      aria-label={dir === 1 ? "More suggestions" : "Previous suggestions"}
      onClick={() => step(dir)}
      disabled={off}
      className="grid size-6 flex-none place-items-center rounded-full bg-[#f3f3f7] text-ink/70 transition-opacity hover:bg-[#e9e9f0] disabled:opacity-30"
    >
      {dir === 1 ? <CaretRight aria-hidden="true" weight="bold" className="size-3" /> : <CaretLeft aria-hidden="true" weight="bold" className="size-3" />}
    </button>
  );

  return (
    <div className="flex flex-none items-center gap-1.5 border-t border-black/[0.07] bg-white px-2 pt-2">
      {arrow(-1, edges.start)}
      <div
        ref={rowRef}
        onScroll={update}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !rowRef.current) return;
          drag.current = { down: true, x: e.clientX, left: rowRef.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down || !rowRef.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          rowRef.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerLeave={() => (drag.current.down = false)}
        onClickCapture={(e) => {
          // a drag should not also count as tapping a suggestion
          if (drag.current.moved) {
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="no-scrollbar flex min-w-0 flex-1 cursor-grab touch-pan-x select-none gap-1.5 overflow-x-auto scroll-smooth active:cursor-grabbing"
      >
        {items.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onPick(q)}
            className={`flex-none rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
              staff ? "border-[#f1dcc0] bg-[#fff8ee] text-[#9a4a00] hover:bg-[#fff1de]" : "border-[#dcd7ff] bg-[#f5f3ff] text-[#2f2496] hover:bg-[#ece8ff]"
            }`}
          >
            {q}
          </button>
        ))}
      </div>
      {arrow(1, edges.end)}
    </div>
  );
}

function ChatDemo({ layout = "dark" }: { layout?: "dark" | "check" }) {
  const [staff, setStaff] = useState(false);
  const mode: Thread = staff ? "staff" : "client";
  const [threads, setThreads] = useState<Record<Thread, Msg[]>>({ client: [], staff: [] });
  const [typing, setTyping] = useState<Record<Thread, string | null>>({ client: null, staff: null });
  const [draft, setDraft] = useState("");
  const [inView, setInView] = useState(false);
  const played = useRef<Record<Thread, boolean>>({ client: false, staff: false });
  const replyIndex = useRef<Record<Thread, number>>({ client: 0, staff: 0 });
  const timers = useRef<number[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = (t: Thread, m: Msg) => setThreads((prev) => ({ ...prev, [t]: [...prev[t], m] }));
  const setTypingFor = (t: Thread, who: string | null) => setTyping((prev) => ({ ...prev, [t]: who }));

  // clear pending replies when the section unmounts
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);

  // start the conversation only once the phone is on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // play each thread's sample messages once, with "typing…" before the other side speaks
  useEffect(() => {
    if (!inView || played.current[mode]) return;
    const t = mode;
    const seed = t === "staff" ? staffChat : clientChat;
    const playedNow = played.current;
    playedNow[t] = true;
    const ids: number[] = [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let shown = false;
      ids.push(
        window.setTimeout(() => {
          setThreads((prev) => ({ ...prev, [t]: seed }));
          shown = true;
        }, 0),
      );
      return () => {
        ids.forEach((id) => window.clearTimeout(id));
        if (!shown) playedNow[t] = false;
      };
    }
    ids.push(window.setTimeout(() => setThreads((prev) => ({ ...prev, [t]: [] })), 0));
    let finished = false;
    let at = 350;
    seed.forEach((m, i) => {
      if (!m.mine) {
        const who = m.who.split(" ·")[0];
        ids.push(window.setTimeout(() => setTypingFor(t, who), at));
        at += 1100;
      } else {
        at += 450;
      }
      ids.push(
        window.setTimeout(() => {
          setTypingFor(t, null);
          push(t, m);
          if (i === seed.length - 1) finished = true;
        }, at),
      );
      at += 550;
    });
    return () => {
      ids.forEach((id) => window.clearTimeout(id));
      if (!finished) {
        playedNow[t] = false;
        setTypingFor(t, null);
      }
    };
  }, [inView, mode]);

  // keep the newest message in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [threads, typing, mode]);

  const send = (text?: string, to?: Thread) => {
    const body = (text ?? draft).trim();
    if (!body) return;
    const t = to ?? mode;
    push(t, { who: `Maha · ${nowLabel()}`, text: body, mine: true });
    setDraft("");
    const r = replies[t];
    const reply = r.texts[replyIndex.current[t]++ % r.texts.length];
    timers.current.push(window.setTimeout(() => setTypingFor(t, r.who), 700));
    timers.current.push(
      window.setTimeout(() => {
        setTypingFor(t, null);
        push(t, { who: `${r.who} · ${nowLabel()}`, text: reply, mine: false });
      }, 700 + 1500),
    );
  };

  const dark = layout === "dark";
  const messages = threads[mode];
  const typingWho = typing[mode];


  return (
    <div
      ref={rootRef}
      className={
        layout === "check"
          ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
          : "dark-stage grid items-center gap-10 rounded-[28px] border border-white/10 p-5 text-white sm:rounded-[36px] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14"
      }
    >
      <div className="flex flex-col gap-5">
        {!dark && <p className="eyebrow self-start">Try it here</p>}
        <h3 className={`text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em] ${dark ? "text-white" : "text-ink"}`}>
          <span className="block">Talk to the client.</span>
          <span className="block">Talk about the client.</span>
        </h3>
        <p className={`text-[16px] leading-relaxed ${dark ? "text-white/70" : "text-body"}`}>
          Replies to the client and your team&rsquo;s private notes live on the
          same file. Clients never see the staff-only chat.
        </p>
        <div role="group" aria-label="Which chat" className={`inline-flex self-start rounded-full border p-1.5 ${dark ? "border-white/10 bg-white/[0.06]" : "border-black/[0.06] bg-white shadow-[0_12px_28px_-18px_rgba(17,17,17,0.22)]"}`}>
          {["Reply to client", "Staff-only chat"].map((label, i) => {
            const on = (i === 1) === staff;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setStaff(i === 1);
                  setDraft("");
                }}
                className={`min-h-11 rounded-full px-5 text-[14px] font-bold transition-colors ${
                  on ? (i === 1 ? (dark ? "bg-white text-ink" : "bg-ink text-white") : "bg-brand text-white") : dark ? "text-white/70 hover:text-white" : "text-body hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className={`flex items-center gap-2 text-[14px] font-bold ${staff ? (dark ? "text-[#ffb870]" : "text-[#b54708]") : dark ? "text-[#5fe09a]" : "text-[#1d7a52]"}`}>
          <span aria-hidden="true" className={`size-2 rounded-full ${staff ? (dark ? "bg-[#ffb870]" : "bg-[#f79009]") : dark ? "bg-[#5fe09a]" : "bg-[#12b76a]"}`} />
          {staff ? "Only your team can see this" : "Sara sees these messages"}
        </p>
        <p className={`text-[13px] ${dark ? "text-white/50" : "text-ink/50"}`}>Type a message or tap a suggestion in the phone.</p>
      </div>
      {/* the chat, inside a phone */}
      <div className="flex justify-center">
        <Phone>
          <div className="flex items-center gap-2.5 border-b border-black/[0.07] px-3.5 pb-3 pt-1">
            <CaretLeft aria-hidden="true" weight="bold" className="size-4 flex-none text-ink/50" />
            {/* client chat: Sara's photo; staff chat: two teammates */}
            {staff ? (
              <span className="relative flex h-9 w-12 flex-none items-center">
                <Image src="/avatars/maha.webp" alt="" width={30} height={30} className="absolute left-0 top-0.5 size-[30px] rounded-full object-cover ring-2 ring-white" />
                <Image src="/avatars/ali.webp" alt="" width={30} height={30} className="absolute left-[18px] top-0.5 size-[30px] rounded-full object-cover ring-2 ring-white" />
              </span>
            ) : (
              <span className="relative size-9 flex-none">
                <Image src="/avatars/sara.webp" alt="Sara Khan" width={36} height={36} className="size-9 rounded-full object-cover" />
                <span aria-hidden="true" className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white bg-[#22c55e]" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-extrabold">{staff ? "Team · Sara Khan" : "Sara Khan"}</p>
              <p className="truncate text-[11px] text-ink/60">
                {typingWho ? <span className="font-semibold text-[#1d7a52]">{typingWho} is typing…</span> : "Apartment, Tower B · Owner Maha"}
              </p>
            </div>
            <span className={`flex-none rounded-full px-2 py-0.5 text-[10px] font-extrabold ${staff ? "bg-[#fff1de] text-[#9a4a00]" : "bg-[#e8f7ee] text-[#1d7a52]"}`}>
              {staff ? "Staff only" : "Client chat"}
            </span>
          </div>
          <div
            ref={scrollRef}
            key={mode}
            aria-live="polite"
            className={`no-scrollbar min-h-0 flex-1 overflow-y-auto ${staff ? "bg-[repeating-linear-gradient(135deg,#fffaf2_0_14px,#fff6ea_14px_28px)]" : "bg-[#fafafc]"}`}
          >
            <div className="flex min-h-full flex-col justify-end gap-3 px-3.5 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`thread-in flex flex-col gap-1 ${m.mine ? "items-end" : "items-start"}`}>
                  <span className="text-[10px] font-bold text-ink/55">{m.who}</span>
                  <p
                    className={`max-w-[85%] px-3 py-2 text-[13px] leading-snug ${
                      m.mine
                        ? `rounded-[16px_16px_4px_16px] text-white ${staff ? "bg-[#2a2833]" : "bg-brand"}`
                        : "rounded-[16px_16px_16px_4px] bg-[#ececf1]"
                    }`}
                  >
                    {m.text}
                  </p>
                  {m.mine && i === messages.length - 1 && !typingWho && (
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-ink/45">
                      <Check aria-hidden="true" weight="bold" className="size-3" />
                      {staff ? "Seen by team" : "Delivered"}
                    </span>
                  )}
                </div>
              ))}
              {typingWho && (
                <div className="thread-in flex flex-col items-start gap-1">
                  <span className="text-[10px] font-bold text-ink/55">{typingWho}</span>
                  <span aria-label={`${typingWho} is typing`} className="flex items-center gap-1 rounded-[16px_16px_16px_4px] bg-[#ececf1] px-3.5 py-3">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="typing-dot size-1.5 rounded-full bg-ink/45" style={{ animationDelay: `${d * 160}ms` }} />
                    ))}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* one-tap suggestions: arrows, or drag / swipe sideways */}
          <QuickReplies key={`quick-${mode}`} items={quick[mode]} staff={staff} onPick={send} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex flex-none items-center gap-2 bg-white px-3 pb-2 pt-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              aria-label={staff ? "Message your team" : "Reply to Sara"}
              placeholder={staff ? "Message your team, @mention…" : "Reply to Sara…"}
              maxLength={160}
              className="min-w-0 flex-1 rounded-full bg-[#f3f3f7] px-3.5 py-2.5 text-[16px] text-ink outline-none placeholder:text-ink/45 focus:ring-2 focus:ring-[#c9c2ff] sm:text-[12px]"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!draft.trim()}
              className={`grid size-9 flex-none place-items-center rounded-full text-white transition-[opacity,transform] active:scale-90 disabled:opacity-40 ${staff ? "bg-ink" : "bg-brand"}`}
            >
              <PaperPlaneRight aria-hidden="true" weight="fill" className="size-4" />
            </button>
          </form>
        </Phone>
      </div>
    </div>
  );
}

/* --------------------------- 2. overdue steps --------------------------- */

const steps = [
  { id: "a", task: "Call back about the price", client: "Hina Raza", owner: "Hamza", free: "Maha", when: "2 days late", late: true },
  { id: "b", task: "Send payment plan", client: "Sara Khan", owner: "Maha", free: "Zoya", when: "5 hrs late", late: true },
  { id: "c", task: "Confirm site visit", client: "Usman Tariq", owner: "Ali", free: "Zoya", when: "Due 4 pm", late: false },
  { id: "d", task: "First call with new enquiry", client: "Zain Ali", owner: "Hamza", free: "Ali", when: "Due 6 pm", late: false },
];

function OverdueDemo() {
  const [status, setStatus] = useState<Record<string, "given" | "done">>({});
  const late = steps.filter((s) => s.late && !status[s.id]).length;
  const handled = Object.keys(status).length;
  return (
    <div className="dark-panel grid items-center gap-10 rounded-[28px] p-6 text-white sm:rounded-[36px] sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-14">
      <div className="flex flex-col gap-5">
        <h3 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
          See what&rsquo;s late before a client notices.
        </h3>
        <p className="text-[16px] leading-relaxed text-white/75">
          Every client has an owner and a due date. Late next steps rise to the
          top, so a manager can step in or hand it to someone free.
        </p>
        <div className="flex gap-8" aria-live="polite">
          <p><span className="block text-[42px] font-extrabold text-[#ff8a80]">{late}</span><span className="text-[14px] text-white/65">late right now</span></p>
          <p><span className="block text-[42px] font-extrabold text-[#8ce0ad]">{handled}</span><span className="text-[14px] text-white/65">handled today</span></p>
        </div>
        <p className="text-[13px] text-white/55">Try it: hand a late step to a free agent, or mark it done.</p>
      </div>
      <div className="flex flex-col gap-2.5 rounded-3xl bg-white p-4 text-ink sm:p-5">
        <div className="flex items-center justify-between px-1 pb-2">
          <strong className="text-[16px]">Next steps · Today</strong>
          <span className="text-[12px] font-bold text-ink/60">Sorted by how late</span>
        </div>
        {steps.map((s) => {
          const st = status[s.id];
          return (
            <div
              key={s.id}
              className={`flex flex-wrap items-center gap-3 rounded-2xl p-3.5 ${
                st ? "bg-[#f1faf4]" : s.late ? "border border-[#ffd5cf] bg-[#fff4f2]" : "bg-[#f7f7fa]"
              }`}
            >
              <span className={`w-24 flex-none rounded-lg py-1.5 text-center text-[12px] font-extrabold ${
                st ? "bg-[#e1f4e8] text-[#1d7a52]" : s.late ? "bg-[#ffe0db] text-[#b3261e]" : "bg-[#ececf2] text-body"
              }`}>
                {st ? "Handled" : s.when}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-extrabold">{s.task}</p>
                <p className="text-[13px] text-ink/60">{s.client} · Owner {st === "given" ? s.free : s.owner}</p>
              </div>
              {!st ? (
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => setStatus({ ...status, [s.id]: "given" })} className="min-h-10 rounded-xl border border-black/12 bg-white px-3 text-[13px] font-bold">
                    Give to {s.free}
                  </button>
                  <button type="button" onClick={() => setStatus({ ...status, [s.id]: "done" })} className="min-h-10 rounded-xl bg-brand px-3 text-[13px] font-bold text-white">
                    Done
                  </button>
                </div>
              ) : (
                <span className="text-[13px] font-extrabold text-[#1d7a52]">
                  ✓ {st === "given" ? `Given to ${s.free}` : "Done"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------- 3. who sees what --------------------------- */

const clients = [
  { name: "Usman Tariq", stage: "Site visit", owner: "Ali", next: "Sat 11:00" },
  { name: "Sara Khan", stage: "Negotiating", owner: "Maha", next: "Send price list" },
  { name: "Bilal Ahmed", stage: "Closed", owner: "Ali", next: "Hand over keys" },
  { name: "Hina Raza", stage: "New", owner: "Zoya", next: "First call" },
  { name: "Ayesha Malik", stage: "Site visit", owner: "Hamza", next: "Mon 4:00" },
];
const people = [
  { tab: "owner", avatar: "O", person: "Office owner", rule: "Sees every client, every agent and the team results.", perms: [1, 1, 1, 1] },
  { tab: "agent", avatar: "A", person: "Ali, sales agent", rule: "Sees only the clients he owns, and the team chat about them.", perms: [1, 1, 0, 0] },
  { tab: "client", avatar: "U", person: "Usman, a client", rule: "Sees only his own project. Never the staff-only chat.", perms: [0, 0, 0, 0] },
];
const permLabels = ["Client conversations", "Staff-only chat", "All agents’ clients", "Team results"];

function AccessDemo() {
  const [role, setRole] = useState(0);
  const p = people[role];
  const visible = (c: (typeof clients)[number]) =>
    role === 0 ? true : role === 1 ? c.owner === "Ali" : c.name === "Usman Tariq";
  return (
    <div className="flex flex-col gap-8 rounded-[28px] border border-[#e7e7ef] bg-white p-5 sm:rounded-[36px] sm:p-10 lg:p-14">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-[620px] flex-col gap-4">
          <h3 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
            Everyone sees exactly what they should.
          </h3>
          <p className="text-[16px] leading-relaxed text-body">
            Owners see the whole office, agents see their own clients, and
            clients only see their own project.
          </p>
        </div>
        <div role="group" aria-label="View as" className="inline-flex flex-wrap self-start rounded-full bg-[#f3f2fa] p-1.5 lg:self-auto">
          {people.map((person, i) => (
            <button
              key={person.tab}
              type="button"
              aria-pressed={i === role}
              onClick={() => setRole(i)}
              className={`min-h-11 rounded-full px-4 text-[14px] font-bold transition-colors ${i === role ? "bg-brand text-white" : "text-body"}`}
            >
              View as {person.tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="flex flex-col gap-3 rounded-3xl bg-[#f6f5ff] p-6">
          <span className="grid size-13 place-items-center rounded-full bg-brand text-[18px] font-extrabold text-white">{p.avatar}</span>
          <p className="text-[18px] font-extrabold">{p.person}</p>
          <p className="text-[14px] leading-relaxed text-body">{p.rule}</p>
          <ul className="mt-2 flex flex-col gap-2">
            {permLabels.map((label, i) => (
              <li key={label} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-bold ${p.perms[i] ? "bg-[#e8f7ee] text-[#1d7a52]" : "bg-[#f1f1f4] text-ink/50"}`}>
                {p.perms[i] ? <Check aria-hidden="true" weight="bold" className="size-3.5" /> : <X aria-hidden="true" weight="bold" className="size-3.5" />}
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-black/[0.08]">
          <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
            <thead className="bg-surface text-[11px] font-extrabold tracking-[0.08em] text-ink/50">
              <tr>
                <th scope="col" className="px-5 py-3.5">CLIENT</th>
                <th scope="col" className="px-5 py-3.5">STAGE</th>
                <th scope="col" className="px-5 py-3.5">OWNER</th>
                <th scope="col" className="px-5 py-3.5">NEXT STEP</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => {
                const shown = visible(c);
                return (
                  <tr key={c.name} aria-hidden={!shown} className={`border-t border-black/[0.06] transition-[opacity,filter] duration-300 ${shown ? "" : "opacity-15 blur-[2px]"}`}>
                    <td className="px-5 py-3.5 font-bold">{c.name}</td>
                    <td className="px-5 py-3.5">{c.stage}</td>
                    <td className="px-5 py-3.5">{c.owner}</td>
                    <td className="px-5 py-3.5 text-body">{c.next}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------- the same chat, in the check layout ------------------ */

/** A second "See how it works" section in the 60-second-check style: the
 *  same words, toggle and live phone chat as the dark panel, on a light
 *  background. */
export function ChatCheckSection() {
  return (
    <section id="features" aria-label="See how it works" className="ds-bars scroll-mt-20 text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-9 px-5 py-20 sm:px-10 sm:py-28">
        <ChatDemo layout="check" />
      </div>
    </section>
  );
}

/* ------------------------------- the section ------------------------------ */

const tabs = [
  { label: "Client vs staff-only chat", Demo: ChatDemo },
  { label: "Overdue next steps", Demo: OverdueDemo },
  { label: "Who sees what", Demo: AccessDemo },
];

// The tab bar is removed; only the first demo (client vs staff-only chat)
// is shown. The other demos stay in `tabs` above in case they come back.
export default function FeaturesSection() {
  const Demo = tabs[0].Demo;
  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-20 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:px-10 sm:py-24">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="eyebrow">Try it here</p>
          <h2 id="features-heading" className="text-[clamp(1.9rem,3.4vw,2.5rem)] leading-[1.3] text-balance">
            See how it works. <span className="serif">Click around.</span>
          </h2>
        </div>
        <div id="feature-panel">
          <Demo />
        </div>
      </div>
    </section>
  );
}
