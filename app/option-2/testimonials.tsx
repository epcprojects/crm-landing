// Option 2 testimonials: a dark section with a pill, a headline with a hand-
// drawn loop round one word, a short line and button on the right, then a
// three-column grid of review cards: one big quote, one quote with a photo,
// and a stack of smaller cards. The quotes are the same sample reviews used
// elsewhere on the site.

import Image from "next/image";
import { Play, Star } from "@phosphor-icons/react/dist/ssr";
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
      <Image src={src} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
      <span>
        <span className="block text-[16px] font-medium text-white">{name}</span>
        <span className="block text-[14px] text-white/50">{office}</span>
      </span>
    </span>
  );
}

const card = "rounded-[20px] bg-[#1e2633] p-5 sm:rounded-[24px] sm:p-7";

// reviews in the scrolling column (the same sample quotes as the home page)
const scrolling = [
  { quote: "I stopped keeping next steps in my head. The system tells each agent who to call today.", name: "Ayesha Malik", avatar: "/avatars/ayesha-malik.jpg", office: "Malik Properties, Rawalpindi" },
  { quote: "One file per client, with every WhatsApp conversation in it. Handing over a client is no longer a problem.", name: "Maryam Shah", avatar: "/avatars/maryam-shah.jpg", office: "Shah Realty, Lahore" },
  { quote: "We moved our clients in and were running in days. The team picked it up without any training.", name: "Sana Tariq", avatar: "/avatars/sana-tariq.jpg", office: "Bahria Homes, Islamabad" },
  { quote: "Interested buyers used to go quiet before we noticed. Now late follow-ups stand out immediately.", name: "Usman Qureshi", avatar: "/avatars/usman-qureshi.jpg", office: "Qureshi & Co, Karachi" },
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
          {/* one big quote */}
          <figure className={`${card} flex flex-col justify-between gap-6 sm:min-h-[420px] sm:gap-10`}>
            <div className="flex flex-col gap-6">
              <Stars />
              <blockquote className="text-[1.3rem] sm:text-[clamp(1.5rem,2.4vw,1.9rem)] font-medium leading-[1.25] tracking-[-0.02em]">
                &ldquo;For the first time I can see who is closing and who is slow to reply, without asking anyone.&rdquo;
              </blockquote>
            </div>
            <Person src="/avatars/bilal-ahmed.jpg" name="Bilal Ahmed" office="City Rentals, Lahore" />
          </figure>

          {/* a quote with a video still, like a recorded review */}
          <figure className={`${card} flex flex-col gap-5`}>
            <Stars />
            <blockquote className="text-[15px] leading-relaxed text-white/90 sm:text-[16px]">
              &ldquo;Clients used to wait hours for an answer. Now every enquiry has an owner and gets a reply the same hour.&rdquo;
            </blockquote>
            <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[16px] sm:min-h-[340px] sm:rounded-[18px]">
              <Image src="/option-2/review-video-camera.webp" alt="Fatima Raza from Raza Estates talking to the camera" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
              <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/80 text-[#111113] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <Play weight="fill" className="ml-1 size-7" />
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3.5 pt-10">
                <span className="block text-[15px] font-medium text-white">Fatima Raza</span>
                <span className="block text-[13px] text-white/70">Raza Estates, Islamabad</span>
              </figcaption>
            </div>
          </figure>

          {/* quote cards drifting upward in a loop; the list is doubled so
              the loop has no seam, and the copy is hidden from screen readers */}
          <div className="ticker-y-box relative h-[440px] overflow-hidden sm:h-[520px] lg:h-auto">
            <div className="ticker-y flex flex-col gap-3 sm:gap-4 lg:absolute lg:inset-x-0 lg:top-0">
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
        <ul className="-mt-3 grid grid-cols-3 gap-2 sm:-mt-8 sm:gap-4">
          {stats.map((st) => (
            <li key={st.label} className={`${card} flex flex-col gap-1 max-sm:!p-3.5`}>
              <p className="text-[1.3rem] font-medium leading-none tracking-[-0.03em] min-[360px]:text-[1.5rem] sm:text-[clamp(2rem,3.4vw,2.6rem)]">
                {st.value}
                {st.unit && <span className="ml-0.5 text-[0.45em] text-white/70">{st.unit}</span>}
              </p>
              <p className="text-[11.5px] leading-snug text-white/55 min-[360px]:text-[12px] sm:text-[15px]">{st.label}</p>
              <Image src={`/option-2/${st.icon}.webp`} alt="" width={64} height={64} className="-ml-1 mt-3 size-11 sm:mt-6 sm:size-14 [mask-image:radial-gradient(circle,#000_55%,transparent_72%)]" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
