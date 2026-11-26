"use client";

// Option 2 "Features": every feature as one row in a plain scrolling list.
// Each row has a soft clay icon on the left, its title, a short description
// and tags, and its photo on the right (under the tags on phones). Every row
// is always open; hovering only lifts the icon and zooms the photo.
//
// Photos are AI-made (public/option-2/feat-*.webp) and every name in them is
// sample data, like the rest of the site.

import Image from "next/image";

type Feature = {
  title: string;
  line: string;
  tags: string[];
  icon: string;
  photo: string;
  alt: string;
  /** where the photo is anchored when it fills its frame, so the face stays in view */
  focus: string;
  /** the icon's accent colour, used for the soft tile behind it */
  tint: string;
};

const features: Feature[] = [
  {
    title: "Complete leads and clients management",
    line: "Every enquiry lands on one file with its project, agent, calls and WhatsApp chats, so nothing gets lost between agents.",
    tags: ["One file per client", "Calls and WhatsApp", "Full history"],
    icon: "/option-2/feat-soft-1.webp",
    photo: "/option-2/feat-1.webp",
    focus: "50% 15%",
    alt: "An office owner reviewing new leads on his laptop",
    tint: "#8b6fe0",
  },
  {
    title: "Follow-ups and reminders for every activity",
    line: "Calls, site visits and payments each get a reminder with a date and an owner. Late ones turn red before a client goes cold.",
    tags: ["Calls", "Site visits", "Payments"],
    icon: "/option-2/feat-soft-2.webp",
    photo: "/option-2/feat-2.webp",
    focus: "50% 15%",
    alt: "An agent holding up a reminder on her phone",
    tint: "#3fae78",
  },
  {
    title: "Complete sales pipeline",
    line: "See every deal from new enquiry to closed, and move it forward stage by stage so nothing stalls in the middle.",
    tags: ["New to closed", "Deal stages", "Drag and drop"],
    icon: "/option-2/feat-soft-7.webp",
    photo: "/option-2/feat-7.webp",
    focus: "50% 30%",
    alt: "A sales team moving deals along a pipeline board",
    tint: "#22a69a",
  },
  {
    title: "Unlimited project creation",
    line: "Add every society, tower and phase you sell. Each project keeps its own leads, units and agents, with no limit on how many.",
    tags: ["Societies", "Towers and phases", "No limits"],
    icon: "/option-2/feat-soft-8.webp",
    photo: "/option-2/feat-8.webp",
    focus: "50% 30%",
    alt: "A developer showing a model of a new housing project",
    tint: "#5b6ee1",
  },
  {
    title: "Complete agents management",
    line: "Add agents, choose their projects and see who replies fast and who is closing, without having to ask anyone.",
    tags: ["Invite agents", "Assign projects", "Track replies"],
    icon: "/option-2/feat-soft-3.webp",
    photo: "/option-2/feat-3.webp",
    focus: "50% 10%",
    alt: "A sales manager with his team of agents",
    tint: "#4a8ee8",
  },
  {
    title: "Role-based control",
    line: "Give each person a role, so agents see only their own clients while managers and owners see the whole office.",
    tags: ["Owner", "Manager", "Agent"],
    icon: "/option-2/feat-soft-9.webp",
    photo: "/option-2/feat-9.webp",
    focus: "50% 30%",
    alt: "A manager setting team permissions on a laptop",
    tint: "#5f7fa8",
  },
  {
    title: "Advanced analytics and reporting",
    line: "Leads, visits and closed deals per project and per agent, in clear reports your Monday meeting can run on.",
    tags: ["Per project", "Per agent", "Weekly reports"],
    icon: "/option-2/feat-soft-4.webp",
    photo: "/option-2/feat-4.webp",
    focus: "50% 15%",
    alt: "An office manager presenting sales charts",
    tint: "#ee7a3f",
  },
  {
    title: "Business KPI tracking",
    line: "Track reply times, conversion and monthly targets on one screen, and spot a slow week before it becomes a slow month.",
    tags: ["Reply time", "Conversion", "Targets"],
    icon: "/option-2/feat-soft-10.webp",
    photo: "/option-2/feat-10.webp",
    focus: "50% 50%",
    alt: "An owner checking business targets on a tablet",
    tint: "#22b5d6",
  },
  {
    title: "Mobile app for your team",
    line: "Agents update clients from the site visit itself. The same file is waiting on the office laptop when they are back.",
    tags: ["Android and iPhone", "On site", "Always in sync"],
    icon: "/option-2/feat-soft-5.webp",
    photo: "/option-2/feat-5.webp",
    focus: "50% 15%",
    alt: "An agent using the app at a housing site",
    tint: "#e9b03a",
  },
  {
    title: "Advanced security for your data",
    line: "Your client list stays yours: protected logins, private files for each team and a backup of everything every day.",
    tags: ["Secure logins", "Daily backups", "Private data"],
    icon: "/option-2/feat-soft-11.webp",
    photo: "/option-2/feat-11.webp",
    focus: "50% 30%",
    alt: "A team member signing in securely on a laptop",
    tint: "#e04f5f",
  },
  {
    title: "Onboarding support for your team",
    line: "We set up your projects, move your existing client list in and train your agents, so the office is running in days.",
    tags: ["Setup", "Data import", "Agent training"],
    icon: "/option-2/feat-soft-12.webp",
    photo: "/option-2/feat-12.webp",
    focus: "50% 50%",
    alt: "A trainer showing an office team how to use the app",
    tint: "#7cb342",
  },
  {
    title: "Complete support, 9 to 5",
    line: "A real person is a call or a message away, Monday to Saturday from 9 to 5, whenever your team needs a hand.",
    tags: ["Monday to Saturday", "Calls and chat", "Real people"],
    icon: "/option-2/feat-soft-6.webp",
    photo: "/option-2/feat-6.webp",
    focus: "50% 15%",
    alt: "A support specialist with a headset",
    tint: "#e06a8c",
  },
];

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function FeaturesList() {
  return (
    <section id="benefits" aria-labelledby="features-heading" className="scroll-mt-28 px-4 py-8 sm:px-10 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-20">
        {/* the pill and heading on the left, the description on the right,
            its last line level with the heading’s last line */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end lg:gap-10">
          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <span className="rounded-full bg-[#f3f4f6] px-3 py-1.5 text-[12.5px] font-medium text-[#111113] sm:text-[13px]">Features</span>
            <h2 id="features-heading" className="text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-balance sm:text-[clamp(2.1rem,4.4vw,3.25rem)] sm:text-wrap">
              {/* two lines from tablets up: the first line never breaks */}
              <span className="sm:whitespace-nowrap">Everything your office needs,</span>
              <br className="hidden sm:block" /> without the{" "}
              <span className="relative inline-block">
                chasing
                <svg aria-hidden="true" viewBox="0 0 240 20" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-0 h-[0.3em] w-full">
                  <defs>
                    <linearGradient id="features-list-underline" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0" stopColor="#4ade80" />
                      <stop offset="1" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                  <path d="M4 14 C 60 6, 150 4, 236 9" pathLength={1} fill="none" stroke="url(#features-list-underline)" strokeWidth="6" strokeLinecap="round" className="underline-draw" />
                </svg>
              </span>
            </h2>
          </div>
          <p className="max-w-[34rem] text-[15px] leading-relaxed text-[#5b5b63] sm:text-[17px] lg:max-w-[22rem] lg:pb-1">
            One CRM for your leads, agents, projects and numbers, with real people to help your team get started.
          </p>
        </div>

        {/* the list: every row stays open */}
        <ul className="border-t border-black/[0.08]">
          {features.map((f) => (
            <li key={f.title} className="group relative flex items-center border-b border-black/[0.08] py-6 sm:gap-5 sm:py-8 lg:min-h-[324px]">
              <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-5 lg:pr-[380px]">
                {/* the clay icon, lined up with the top of the text block */}
                <span
                  className={`grid size-12 flex-none place-items-center rounded-2xl transition-transform duration-300 ${ease} group-hover:scale-105 sm:size-14`}
                  style={{ backgroundColor: `color-mix(in srgb, ${f.tint} 14%, white)` }}
                >
                  <Image src={f.icon} alt="" width={96} height={96} className="size-9 drop-shadow-[0_4px_6px_rgba(17,17,19,0.12)] sm:size-11" />
                </span>
                {/* the title, description and tags in one block */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#111113] sm:text-[22px]">{f.title}</h3>
                  <p className="pt-1 text-[14px] leading-relaxed text-[#5b5b63] sm:max-w-[34rem] sm:text-[15.5px]">{f.line}</p>
                  <ul className="flex flex-wrap gap-1.5 pt-2.5 sm:gap-2">
                    {f.tags.map((t) => (
                      <li key={t} className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[12px] font-medium text-[#3d3d44] sm:text-[13px]">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {/* on phones and tablets the photo sits under the tags */}
                  <span className="relative mt-4 block aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-2xl lg:hidden">
                    <Image src={f.photo} alt={f.alt} fill sizes="(min-width: 640px) 420px, 90vw" style={{ objectPosition: f.focus }} className="object-cover" />
                  </span>
                </div>
              </div>

              {/* on computers the photo sits on the right edge and fills the
                  row's height, leaving a small gap above and below */}
              <span className="pointer-events-none absolute inset-y-8 right-0 hidden w-[340px] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(17,17,19,0.45)] lg:block">
                <Image src={f.photo} alt={f.alt} fill sizes="340px" style={{ objectPosition: f.focus }} className={`object-cover transition-transform duration-500 ${ease} group-hover:scale-[1.04]`} />
              </span>

            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
