"use client";

// Three things you can try: client vs staff-only chat, overdue next steps,
// and who sees what. One shows at a time behind tabs. All names are sample data.

import { useState } from "react";
import { Check, X } from "@phosphor-icons/react/dist/ssr";

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

function ChatDemo() {
  const [staff, setStaff] = useState(false);
  const messages = staff ? staffChat : clientChat;
  return (
    <div className="hero-stage grid items-center gap-10 rounded-[28px] border border-[#e7e7ef] p-5 sm:rounded-[36px] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
      <div className="flex flex-col gap-5">
        <h3 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
          Talk to the client. Talk about the client.
        </h3>
        <p className="text-[16px] leading-relaxed text-body">
          Replies to the client and your team&rsquo;s private notes live on the
          same file. Clients never see the staff-only chat.
        </p>
        <div role="group" aria-label="Which chat" className="inline-flex self-start rounded-full border border-black/[0.08] bg-white p-1.5">
          {["Reply to client", "Staff-only chat"].map((label, i) => {
            const on = (i === 1) === staff;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => setStaff(i === 1)}
                className={`min-h-11 rounded-full px-5 text-[14px] font-bold transition-colors ${
                  on ? (i === 1 ? "bg-ink text-white" : "bg-brand text-white") : "text-body"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className={`flex items-center gap-2 text-[14px] font-bold ${staff ? "text-[#9a4a00]" : "text-[#1d7a52]"}`}>
          <span aria-hidden="true" className={`size-2 rounded-full ${staff ? "bg-[#9a4a00]" : "bg-[#1d7a52]"}`} />
          {staff ? "Only your team can see this" : "Sara sees these messages"}
        </p>
      </div>
      <div className="flex h-[480px] flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_40px_80px_-40px_rgba(40,30,120,0.4)]">
        <div className="flex items-center gap-3 border-b border-black/[0.07] px-5 py-4">
          <span className="grid size-10 place-items-center rounded-full bg-[#e4e0ff] font-extrabold text-[#2f2496]">S</span>
          <div>
            <p className="text-[15px] font-extrabold">Sara Khan</p>
            <p className="text-[12px] text-ink/60">Apartment, Tower B · Owner Maha</p>
          </div>
          <span className={`ml-auto rounded-full px-2.5 py-1 text-[12px] font-extrabold ${staff ? "bg-[#fff1de] text-[#9a4a00]" : "bg-[#e8f7ee] text-[#1d7a52]"}`}>
            {staff ? "Staff only" : "Client chat"}
          </span>
        </div>
        <div
          key={staff ? "staff" : "client"}
          className={`flex flex-1 flex-col justify-end gap-3.5 p-5 ${staff ? "bg-[repeating-linear-gradient(135deg,#fffaf2_0_14px,#fff6ea_14px_28px)]" : ""}`}
        >
          {messages.map((m, i) => (
            <div key={i} className={`thread-in flex flex-col gap-1 ${m.mine ? "items-end" : "items-start"}`} style={{ animationDelay: `${i * 90}ms` }}>
              <span className="text-[11px] font-bold text-ink/60">{m.who}</span>
              <p className={`max-w-[80%] px-3.5 py-2.5 text-[14px] leading-snug ${
                m.mine
                  ? `rounded-[16px_16px_4px_16px] text-white ${staff ? "bg-[#2a2833]" : "bg-brand"}`
                  : "rounded-[16px_16px_16px_4px] bg-[#f1f1f4]"
              }`}>
                {m.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2.5 border-t border-black/[0.07] px-4 py-3.5">
          <span className="flex-1 rounded-xl bg-[#f3f3f7] px-3.5 py-3 text-[14px] text-ink/60">
            {staff ? "Message your team, @mention someone…" : "Reply to Sara…"}
          </span>
          <span className={`rounded-xl px-4 py-3 text-[14px] font-bold text-white ${staff ? "bg-ink" : "bg-brand"}`}>Send</span>
        </div>
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

/* ------------------------------- the section ------------------------------ */

const tabs = [
  { label: "Client vs staff-only chat", Demo: ChatDemo },
  { label: "Overdue next steps", Demo: OverdueDemo },
  { label: "Who sees what", Demo: AccessDemo },
];

export default function FeaturesSection() {
  const [tab, setTab] = useState(0);
  const Demo = tabs[tab].Demo;
  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-24 bg-surface">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:px-10 sm:py-24">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="eyebrow">TRY IT HERE</p>
          <h2 id="features-heading" className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance">
            See how it works. Click around.
          </h2>
        </div>
        <div role="tablist" aria-label="Pick a feature" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[20px] border border-[#e7e7ef] bg-white p-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              type="button"
              aria-selected={i === tab}
              aria-controls="feature-panel"
              onClick={() => setTab(i)}
              className={`min-h-11 rounded-2xl px-5 text-[15px] font-bold transition-colors ${
                i === tab ? "bg-brand text-white" : "text-body hover:bg-brand/[0.06] hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div id="feature-panel" role="tabpanel" key={tab} className="thread-in">
          <Demo />
        </div>
      </div>
    </section>
  );
}
