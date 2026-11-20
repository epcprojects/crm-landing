"use client";

import { useState } from "react";
import { Minus, Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr";

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
      className={`grid size-7 shrink-0 place-items-center rounded-full border sm:size-8 transition-colors duration-300 ${
        open ? "border-brand bg-brand text-white" : "border-black/15 text-ink/70"
      }`}
    >
      {open ? (
        <Minus aria-hidden="true" weight="bold" className="size-3.5" />
      ) : (
        <PlusIcon aria-hidden="true" weight="bold" className="size-3.5" />
      )}
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
                className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left text-[16px] font-extrabold tracking-[-0.015em] sm:min-h-14 sm:py-4 sm:text-[17px]"
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
                <p className="max-w-[40rem] pb-4 text-[15px] leading-6 text-body sm:pb-5 sm:text-base sm:leading-7">
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
