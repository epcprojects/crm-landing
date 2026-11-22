"use client";

import { useState } from "react";
import { Minus, Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr";

const items = [
  {
    q: "What happens on the demo call?",
    a: "About 20 minutes. We ask how your office works today, then show you Endpoint Leads with your own team and clients in mind. No pressure and no slides.",
  },
  {
    q: "Can my agents use it on their phones?",
    a: "Yes. It works in the browser on a phone, so agents can reply and update clients between site visits. There is nothing to install.",
  },
  {
    q: "Do you help move our existing clients in?",
    a: "Yes. Send us what you have, a spreadsheet or a list, and we help you bring your clients in during setup.",
  },
  {
    q: "Can clients see our internal notes?",
    a: "No. Clients only see their own project. The staff-only chat on each client’s file is for your team.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the size of your team. Ask us on WhatsApp and we will tell you straight away.",
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
      {open ? <Minus weight="bold" className="size-3.5" /> : <PlusIcon weight="bold" className="size-3.5" />}
    </span>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-3">
          <p className="font-label text-xs font-medium tracking-[0.2em] text-brand">FAQ</p>
          <h2 id="faq-heading" className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Questions offices ask us.
          </h2>
        </div>
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
                    <p className="max-w-[40rem] pb-4 text-[15px] leading-6 text-body sm:pb-5 sm:text-base sm:leading-7">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
