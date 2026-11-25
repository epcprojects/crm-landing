"use client";

// Option 2 FAQ, laid out like the reference: a centred heading with a green
// underline, a "Talk to us" card with a clay chat-and-headset icon on the left, and the
// questions as a clean divided list on the right. Same questions and answers
// as the home page FAQ, kept here so the home page is untouched.

import Image from "next/image";
import { useState } from "react";
import { Plus, Question } from "@phosphor-icons/react/dist/ssr";
import { whatsappLink } from "../site-config";

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

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-28 px-5 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 sm:gap-16">
        {/* heading */}
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[13px] font-medium text-[#111113]">FAQ</span>
          <h2 id="faq-heading" className="text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">
            Everything you need to know
            <br className="hidden sm:block" /> before your{" "}
            <span className="relative inline-block">
              demo
              <svg aria-hidden="true" viewBox="0 0 240 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full">
                <defs>
                  <linearGradient id="faq-underline" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#4ade80" />
                    <stop offset="1" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
                <path d="M4 14 C 60 6, 150 4, 236 9" pathLength={1} fill="none" stroke="url(#faq-underline)" strokeWidth="6" strokeLinecap="round" className="underline-draw" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-12">
          {/* talk to us */}
          <div className="flex flex-col items-start gap-5 rounded-[24px] bg-[#f3f0eb] p-6 sm:p-7">
            <Image src="/option-2/help-chat-w.webp" alt="" width={128} height={128} className="size-24 mix-blend-multiply" />
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-[22px] font-medium tracking-[-0.02em] text-[#111113]">Talk to us</h3>
              <p className="text-[15px] leading-relaxed text-[#5b5b63]">
                Our team is here to help. Send us a message and we will reply shortly.
              </p>
            </div>
            <a
              href={whatsappLink("Hi Endpoint Leads, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 text-[14px] font-medium text-[#111113] shadow-[0_1px_2px_rgba(17,17,19,0.06)] transition-colors hover:border-[#111113]"
            >
              Contact us <Question className="size-4" />
            </a>
          </div>

          {/* questions */}
          <ul className="flex flex-col">
            {items.map((item, index) => {
              const isOpen = open === index;
              return (
                <li key={item.q} className="border-b border-black/[0.08]">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${index}`}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-medium text-[#111113] sm:py-6 sm:text-[17px]"
                    >
                      {item.q}
                      <Plus
                        aria-hidden="true"
                        className={`size-5 flex-none text-[#6b6b72] transition-transform duration-300 group-hover:text-[#111113] ${isOpen ? "rotate-45" : ""}`}
                      />
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
                      <p className="max-w-[36rem] pb-6 pr-10 text-[15px] leading-relaxed text-[#5b5b63]">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
