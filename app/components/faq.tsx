"use client";

import { useState } from "react";

const items = [
  {
    q: "Who is Endpoint Leads for?",
    a: "Real estate sales teams and agencies that manage clients and agents every day, and want to see who spoke to each client and what happens next.",
  },
  {
    q: "Can my agents use it on their phones?",
    a: "Yes. It works in the browser on a phone, so agents can reply and update clients between site visits. There is nothing to install.",
  },
  {
    q: "Can I see how each agent is doing?",
    a: "Yes. You see closed deals and first-reply time for every agent, and which leads are past their due date. Agents see their own numbers; owners and managers see the whole team.",
  },
  {
    q: "Can my team talk privately about a client?",
    a: "Yes. Staff can chat on a client’s file in a staff-only internal chat. Clients who sign in see only their own projects.",
  },
  {
    q: "How do we get started?",
    a: "Book a free meeting. We will show you around with your own team in mind and talk through pricing and setup.",
  },
];

function Plus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
        open ? "border-brand bg-brand text-white" : "border-black/15 text-ink/70"
      }`}
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 8h10" />
        <path
          d="M8 3v10"
          className={`origin-center transition-transform duration-300 motion-reduce:transition-none ${
            open ? "scale-y-0" : "scale-y-100"
          }`}
        />
      </svg>
    </span>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={`faq-q-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[17px] font-extrabold tracking-[-0.015em]"
              >
                {item.q}
                <Plus open={isOpen} />
              </button>
            </h3>
            <div
              id={`faq-a-${index}`}
              role="region"
              aria-labelledby={`faq-q-${index}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[40rem] pb-5 text-base leading-7 text-body">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
