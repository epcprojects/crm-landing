// Six benefits as a three-by-two grid of cards. Each has a small icon and
// title, one line, and a 3D illustration underneath (generated artwork in
// /public/illustrations, on white so it blends into the card).

import Image from "next/image";
import {
  BellRinging,
  ChartLineUp,
  ChatsCircle,
  DeviceMobile,
  IdentificationCard,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";

const perks = [
  {
    icon: ChatsCircle,
    title: "All conversations in one place",
    line: "Open any client and read what was said, who said it and what was promised.",
    image: "conversations",
  },
  {
    icon: BellRinging,
    title: "Never miss a client follow-up",
    line: "Every next step has an owner and a date, and late ones stand out.",
    image: "follow-up",
  },
  {
    icon: UsersThree,
    title: "Complete visibility into your agents",
    line: "See who is closing and who is slow to reply.",
    image: "agents",
  },
  {
    icon: ChartLineUp,
    title: "Understand business performance",
    line: "Leads, closed deals and reply times in one view.",
    image: "performance",
  },
  {
    icon: IdentificationCard,
    title: "Keep client information centralized",
    line: "One file per client, not one chat per agent.",
    image: "client-file",
  },
  {
    icon: DeviceMobile,
    title: "Manage your business from anywhere.",
    line: "At the desk or on a site visit, you and your agents see the same clients and the same next steps. It runs in the browser on a phone, with nothing to install.",
    image: "devices",
  },
];

export default function FeatureBento() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="scroll-mt-20 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24">
        <div className="flex max-w-[44rem] flex-col gap-4">
          <p className="eyebrow">WHY ENDPOINT LEADS</p>
          <h2 id="benefits-heading" className="text-[clamp(1.9rem,3.4vw,2.5rem)] leading-[1.3] text-balance">
            Everything your office needs,{" "}
            <span className="text-ink/45">without the chasing.</span>
          </h2>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <li key={perk.title} className="ds-card flex flex-col overflow-hidden">
                <div className="flex flex-col gap-2 px-6 pt-6 sm:px-7 sm:pt-7">
                  <h3 className="flex items-center gap-2.5 text-[16px] font-semibold tracking-[-0.01em]">
                    <Icon aria-hidden="true" weight="duotone" className="size-6 flex-none text-brand" />
                    {perk.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-body">{perk.line}</p>
                </div>
                <div className="mt-auto flex justify-center px-6 pb-4 pt-2">
                  <Image
                    src={`/illustrations/${perk.image}.png`}
                    alt=""
                    width={1024}
                    height={1024}
                    sizes="(min-width: 1024px) 260px, (min-width: 768px) 40vw, 70vw"
                    className="h-auto w-[240px] mix-blend-multiply [mask-image:radial-gradient(closest-side,#000_80%,transparent)] sm:w-[260px]"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
