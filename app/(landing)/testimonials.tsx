// Option 2 testimonials: a dark section with a pill, a headline with a hand-
// drawn loop round one word, a short line and button on the right, then a
// grid of review cards lined up with the three numbers below: one big quote (two columns) and
// a column of smaller cards drifting upward. The quotes are the same sample reviews used
// elsewhere on the site.

import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";
import { DemoButton } from "./demo-button";

function Stars() {
  return (
    <span className="flex gap-0.5 text-[#fbbf24]" aria-label="5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} weight="fill" className="size-4" />
      ))}
    </span>
  );
}

function Person({ src, name, office }: { src: string; name: string; office: string }) {
  return (
    <span className="flex items-center gap-3">
      <Image src={src} alt="" width={48} height={48} unoptimized={src.endsWith(".svg")} className="size-12 rounded-full object-cover" />
      <span>
        <span className="block text-[16px] font-medium text-white">{name}</span>
        <span className="block text-[14px] text-white/50">{office}</span>
      </span>
    </span>
  );
}

const card = "rounded-[20px] bg-[#1e2633] p-5 sm:rounded-[24px] sm:p-7";

const MALE = "/avatars/avatar-male.svg";
const FEMALE = "/avatars/avatar-female.svg";

// reviews in the scrolling column, men and women mixed in a loose order
// (sample quotes and names, like the rest of the site)
const scrolling = [
  { quote: "Interested buyers used to go quiet before we noticed. Now late follow-ups stand out immediately.", name: "Usman Qureshi", avatar: MALE, office: "Qureshi & Co, Karachi" },
  { quote: "I stopped keeping next steps in my head. The system tells each agent who to call today.", name: "Ayesha Malik", avatar: FEMALE, office: "Malik Properties, Rawalpindi" },
  { quote: "Site visits used to clash between agents. Now the whole team works from the same calendar.", name: "Faisal Iqbal", avatar: MALE, office: "Iqbal Estates, Faisalabad" },
  { quote: "Our agents update leads from the site itself. The office sees it before they are back.", name: "Hamza Sheikh", avatar: MALE, office: "Sheikh Builders, Multan" },
  { quote: "One file per client, with every WhatsApp conversation in it. Handing over a client is no longer a problem.", name: "Maryam Shah", avatar: FEMALE, office: "Shah Realty, Lahore" },
  { quote: "We finally know which projects bring buyers and which only bring questions.", name: "Kamran Akhtar", avatar: MALE, office: "Akhtar Developers, Islamabad" },
  { quote: "We moved our clients in and were running in days. The team picked it up without any training.", name: "Sana Tariq", avatar: FEMALE, office: "Bahria Homes, Islamabad" },
  { quote: "Agents see only their own clients, and I see the whole office. That alone was worth it.", name: "Nadia Hussain", avatar: FEMALE, office: "Hussain Properties, Karachi" },
  { quote: "Quotations go out the same day now. Nothing waits in someone's inbox any more.", name: "Imran Butt", avatar: MALE, office: "Butt & Sons Realty, Gujranwala" },
];

// numbers from the home page, each with a clay icon
const stats = [
  { value: "1,248", label: "enquiries handled this month", icon: "stat-duo" },
  { value: "4", unit: "min", label: "average first reply", icon: "stat-star" },
  { value: "96", unit: "%", label: "follow-ups done on time", icon: "stat-badge" },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-28 bg-[#0a0a0b] px-4 py-8 text-white sm:px-10 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-12">
        {/* heading row */}
        <div className="flex flex-col justify-between gap-4 sm:gap-8 lg:flex-row lg:items-end">
          <div className="flex flex-col items-start gap-3 sm:gap-5">
            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/90">Testimonials</span>
            <h2 className="text-[1.75rem] sm:text-[clamp(2.2rem,4.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              What offices say
              <br />
              about{" "}
              <span className="relative inline-block">
                Endpoint
                {/* one clean brush underline below the word, drawn in */}
                <svg aria-hidden="true" viewBox="0 0 240 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full">
                  <defs>
                    <linearGradient id="endpoint-underline" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0" stopColor="#4ade80" />
                      <stop offset="1" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M4 14 C 60 6, 150 4, 236 9"
                    pathLength={1}
                    fill="none"
                    stroke="url(#endpoint-underline)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="underline-draw"
                  />
                </svg>
              </span>
            </h2>
          </div>
          <div className="flex max-w-sm flex-col items-start gap-4 sm:gap-5">
            <p className="text-[15px] leading-relaxed text-white/80 sm:text-[17px]">
              We believe every client deserves a fast reply and a clear next step.
            </p>
            <DemoButton light>Book your free demo</DemoButton>
          </div>
        </div>

        {/* review grid */}
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {/* one big quote, as wide as the first two number cards below */}
          <figure className={`${card} flex flex-col justify-between gap-6 sm:min-h-[420px] sm:gap-10 lg:col-span-2`}>
            <div className="flex flex-col gap-6">
              <Stars />
              <blockquote className="text-[1.5rem] sm:text-[clamp(1.9rem,3.2vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.025em]">
                &ldquo;For the first time I can see who is closing and who is slow to reply, without asking anyone.&rdquo;
              </blockquote>
            </div>
            <Person src={MALE} name="Bilal Ahmed" office="City Rentals, Lahore" />
          </figure>

          {/* quote cards drifting upward in a loop; the list is doubled so
              the loop has no seam, and the copy is hidden from screen readers */}
          <div className="ticker-y-box relative h-[440px] overflow-hidden sm:h-[520px] lg:h-auto">
            <div className="ticker-y flex flex-col gap-3 sm:gap-4 lg:absolute lg:inset-x-0 lg:top-0" style={{ animationDuration: `${scrolling.length * 7.5}s` }}>
              {[...scrolling, ...scrolling].map((r, i) => (
                <figure key={i} aria-hidden={i >= scrolling.length} className={`${card} flex flex-col gap-6`}>
                  <div className="flex flex-col gap-4">
                    <Stars />
                    <blockquote className="text-[15px] leading-relaxed text-white/90 sm:text-[16px]">&ldquo;{r.quote}&rdquo;</blockquote>
                  </div>
                  <Person src={r.avatar} name={r.name} office={r.office} />
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* numbers with clay icons */}
        {/* on phones one under another, number on the left and icon on the
            right; from tablets up three side by side, icon below */}
        <ul className="-mt-3 grid grid-cols-1 gap-2 sm:-mt-8 sm:grid-cols-3 sm:gap-4">
          {stats.map((st) => (
            <li key={st.label} className={`${card} flex items-center justify-between gap-4 max-sm:!px-5 max-sm:!py-4 sm:flex-col sm:items-start sm:justify-start sm:gap-1`}>
              <div className="flex flex-col gap-1">
                <p className="text-[1.75rem] font-medium leading-none tracking-[-0.03em] sm:text-[clamp(2rem,3.4vw,2.6rem)]">
                  {st.value}
                  {st.unit && <span className="ml-0.5 text-[0.45em] text-white/70">{st.unit}</span>}
                </p>
                <p className="text-[13.5px] leading-snug text-white/55 sm:text-[15px]">{st.label}</p>
              </div>
              <Image src={`/option-2/${st.icon}.webp`} alt="" width={64} height={64} className="size-12 flex-none [mask-image:radial-gradient(circle,#000_55%,transparent_72%)] sm:-ml-1 sm:mt-6 sm:size-14" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
