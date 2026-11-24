// Client testimonials as two slow, opposite-direction tickers of quote cards.
// Every name, office and quote is sample copy: replace with real clients (and
// their permission) before launch.

import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";

type Quote = {
  chip: string;
  quote: string;
  name: string;
  avatar: string;
  office: string;
};

const quotes: Quote[] = [
  {
    chip: "Replies in minutes",
    quote: "Clients used to wait hours for an answer. Now every enquiry has an owner and gets a reply the same hour.",
    name: "Hassan Raza",
    avatar: "/avatars/hassan-raza.jpg",
    office: "Raza Estates, Islamabad",
  },
  {
    chip: "No lost follow-ups",
    quote: "I stopped keeping next steps in my head. The system tells each agent who to call today.",
    name: "Ayesha Malik",
    avatar: "/avatars/ayesha-malik.jpg",
    office: "Malik Properties, Rawalpindi",
  },
  {
    chip: "See every agent",
    quote: "For the first time I can see who is closing and who is slow to reply, without asking anyone.",
    name: "Bilal Ahmed",
    avatar: "/avatars/bilal-ahmed.jpg",
    office: "City Rentals, Lahore",
  },
  {
    chip: "Live in a week",
    quote: "We moved our clients in and were running in days. The team picked it up without any training.",
    name: "Sana Tariq",
    avatar: "/avatars/sana-tariq.jpg",
    office: "Bahria Homes, Islamabad",
  },
  {
    chip: "Fewer cold leads",
    quote: "Interested buyers used to go quiet before we noticed. Now late follow-ups stand out immediately.",
    name: "Usman Qureshi",
    avatar: "/avatars/usman-qureshi.jpg",
    office: "Qureshi & Co, Karachi",
  },
  {
    chip: "One place for clients",
    quote: "One file per client, with every WhatsApp conversation in it. Handing over a client is no longer a problem.",
    name: "Maryam Shah",
    avatar: "/avatars/maryam-shah.jpg",
    office: "Shah Realty, Lahore",
  },
];

function QuoteCard({ item }: { item: Quote }) {
  return (
    <li
      className="flex w-[320px] flex-none flex-col gap-5 rounded-[24px] border border-black/[0.06] bg-[#f7f7f7] p-6 sm:w-[380px]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-black/[0.06] bg-white px-3 py-1 text-[12px] font-semibold text-ink">
          {item.chip}
        </span>
        <span className="flex gap-0.5 text-[#f5a623]" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} weight="fill" className="size-3.5" />
          ))}
        </span>
      </div>
      <p className="text-[16px] leading-[1.5] text-ink">“{item.quote}”</p>
      <div className="mt-auto flex items-center gap-3 border-t border-black/[0.07] pt-4">
        <Image src={item.avatar} alt="" width={40} height={40} className="size-10 flex-none rounded-full object-cover shadow-[0_0_0_2px_#fff,0_0_0_3px_rgba(0,0,0,0.08)]" />
        <span className="flex flex-col leading-tight">
          <span className="text-[14px] font-semibold text-ink">{item.name}</span>
          <span className="text-[13px] text-body">{item.office}</span>
        </span>
      </div>
    </li>
  );
}

function Row({ items, reverse }: { items: Quote[]; reverse?: boolean }) {
  return (
    <div className="ticker-fade overflow-hidden">
      <ul
        className={`ticker-track flex w-max gap-4 ${reverse ? "ticker-reverse" : ""}`}
        aria-label={reverse ? undefined : "Client testimonials"}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <QuoteCard key={`${item.name}-${index}`} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function Testimonials() {
  const first = quotes.slice(0, 3);
  const second = quotes.slice(3);
  return (
    <section id="clients" aria-labelledby="clients-heading" className="scroll-mt-20 overflow-hidden bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-5 pt-16 text-center sm:px-10 sm:pt-24">
        <p className="eyebrow">CLIENT STORIES</p>
        <h2 id="clients-heading" className="max-w-[40rem] text-[clamp(1.9rem,3.4vw,2.5rem)] leading-[1.3] text-balance">
          Offices that stopped <span className="serif">chasing clients.</span>
        </h2>
        <p className="max-w-[32rem] text-[16px] leading-relaxed text-body">
          Real estate teams use Endpoint Leads to reply faster, follow up on time and see what every agent is doing.
        </p>
      </div>
      <div className="flex flex-col gap-4 py-12 sm:py-16">
        <Row items={first} />
        <Row items={second} reverse />
      </div>
    </section>
  );
}
