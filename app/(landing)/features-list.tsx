"use client";

// The "Features" section: every feature on a simple white card with a gray
// border, three per row from laptops up, two on tablets and one on phones.
// Each has a soft clay icon on top, then its title, a short description and white tags.
//
// The photo fields below (public/option-2/feat-*.webp) are kept with each
// feature but not shown at the moment.

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
    title: "Leads and clients management",
    line: "Every enquiry lands on one file with its project, agent, calls and WhatsApp chats, so nothing gets lost between agents.",
    tags: ["One file per client", "Calls and WhatsApp", "Full history"],
    icon: "/option-2/feat-soft-1.webp",
    photo: "/option-2/feat-1.webp",
    focus: "50% 15%",
    alt: "An office owner reviewing new leads on his laptop",
    tint: "#8b6fe0",
  },
  {
    title: "Reminders for every follow-up",
    line: "Calls, visits and payments each get a reminder with an owner. Late ones turn red before a client goes cold.",
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
    line: "Add every society, tower and phase you sell. Each keeps its own leads, units and agents, with no limit.",
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
    line: "See reply times, conversion and monthly targets on one screen, and catch a slow week early.",
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
        {/* the pill, heading and description stacked: centred from tablets up,
            left-aligned on phones */}
        <div className="flex flex-col items-start gap-4 sm:items-center sm:text-center">
          <div className="flex flex-col items-start gap-3 sm:items-center sm:gap-4">
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
          <p className="max-w-[34rem] text-[15px] leading-relaxed text-[#5b5b63] sm:text-[17px] sm:text-balance">
            One CRM for your leads, agents, projects and numbers, with real people to help your team get started.
          </p>
        </div>

        {/* the cards, all the same height: three per row from laptops up, two on tablets, one on phones */}
        <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {features.map((f) => (
            // a light gray card with a soft border; every card is the same height
            <li key={f.title} className="group flex rounded-[20px] border border-[#eceef2] bg-[#f6f7f9] p-5 transition-colors duration-300 hover:border-[#d9dce3] sm:rounded-[24px] sm:p-6">
              <div className="flex min-w-0 flex-1 flex-col">
                {/* the clay icon on a white tile with a light gray border, above the title */}
                <span
                  className={`grid size-12 flex-none place-items-center rounded-2xl border border-[#e6e8ec] bg-white transition-transform duration-300 ${ease} group-hover:scale-105 sm:size-14`}
                >
                  <Image src={f.icon} alt="" width={96} height={96} className="size-7 drop-shadow-[0_4px_6px_rgba(17,17,19,0.12)] sm:size-9" />
                </span>
                {/* the title, description and tags in one block */}
                <div className="flex min-w-0 flex-1 flex-col pt-4 sm:pt-5">
                  <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#111113] sm:text-[19px]">{f.title}</h3>
                  <p className="pt-1.5 text-[14px] leading-relaxed text-[#5b5b63] sm:text-[15px]">{f.line}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-3.5 sm:gap-2">
                    {f.tags.map((t) => (
                      <li key={t} className="rounded-full bg-white px-3 py-1 text-[12px] font-medium text-[#3d3d44] shadow-[0_0_0_1px_rgba(16,24,40,0.06)] sm:text-[13px]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
