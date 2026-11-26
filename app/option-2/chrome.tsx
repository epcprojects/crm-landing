// Option 2's floating pill menu and frosted footer card, shared by the
// landing page and its legal pages. On the landing page the links are
// in-page anchors; elsewhere they point back to /option-2.

import Image from "next/image";
import Link from "next/link";
import OpenContact from "../components/open-contact";
import { siteConfig } from "../site-config";
import { DemoButton } from "./demo-button";
import MobileMenu from "./mobile-menu";

const sections = [
  { label: "Platform", id: "clients" },
  { label: "Why us", id: "features" },
  { label: "See how it works", id: "devices" },
  { label: "FAQ", id: "faq" },
];

/** In-page anchors on the landing page, full links from anywhere else. */
function links(onLanding: boolean) {
  return sections.map((s) => ({ label: s.label, href: onLanding ? `#${s.id}` : `/option-2#${s.id}` }));
}

export function Option2Header({ onLanding = false }: { onLanding?: boolean }) {
  const nav = links(onLanding);
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Primary"
        className="pointer-events-auto relative mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full border border-black/[0.06] bg-white/85 py-2 pl-3 pr-2 shadow-[0_12px_30px_-18px_rgba(17,17,19,0.35)] backdrop-blur-xl"
      >
        <a href={onLanding ? "#top" : "/option-2"} aria-label="Endpoint Leads home" className="flex-none">
          <Image src="/option-2/endpoint-leads-teal.svg" alt="Endpoint Leads" width={1656} height={708} className="-my-2 h-14 w-auto" />
        </a>
        <span className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a key={item.label} href={item.href} className="rounded-full px-3.5 py-2 text-[14px] text-[#2b2b30] transition-colors hover:bg-black/[0.05]">
              {item.label}
            </a>
          ))}
        </span>
        {/* the button sits in the bar from md up; on phones it moves into the menu */}
        <span className="hidden md:block">
          <DemoButton size="sm">Book your free demo</DemoButton>
        </span>
        <MobileMenu links={nav} />
      </nav>
    </header>
  );
}

export function Option2Footer({ onLanding = false }: { onLanding?: boolean }) {
  const nav = links(onLanding);
  return (
    <footer className="relative px-4 pb-4 sm:px-10 sm:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[22px] bg-white/55 p-5 backdrop-blur-md sm:gap-10 sm:rounded-[26px] sm:p-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[1.6fr_1fr_1fr] sm:gap-10">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <Image src="/option-2/endpoint-leads-teal.svg" alt="Endpoint Leads" width={1656} height={708} className="-mb-6 h-20 w-auto self-center sm:-mb-7 sm:-ml-[23px] sm:h-24 sm:self-start" />
            <p className="mx-auto max-w-xs text-center text-[14px] leading-relaxed text-[#3d3d44] sm:mx-0 sm:text-left">The CRM for real estate offices. Every client and every conversation in one place.</p>
          </div>
          <nav aria-label="Pages" className="flex flex-col gap-2.5 text-[14px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6b6b72]">Pages</p>
            {nav.map((item) => (
              <a key={item.label} href={item.href} className="hover:text-[#5b5b63]">
                {item.label}
              </a>
            ))}
          </nav>
          <nav aria-label="Information" className="flex flex-col gap-2.5 text-[14px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6b6b72]">Information</p>
            {/* opens the demo popup, like every other contact button */}
            <OpenContact className="self-start text-left hover:text-[#5b5b63]">Contact</OpenContact>
            <Link href="/option-2/privacy-policy" className="hover:text-[#5b5b63]">Privacy</Link>
            <Link href="/option-2/policy-for-automation" className="hover:text-[#5b5b63]">Automation terms</Link>
            <a href={siteConfig.signInHref} className="hover:text-[#5b5b63]">Sign in</a>
          </nav>
        </div>
        {/* centred on phones; from tablets up, one line at each end */}
        <div className="flex flex-col justify-between gap-2 border-t border-black/[0.08] pt-4 text-center text-[12.5px] text-[#5b5b63] sm:flex-row sm:gap-3 sm:pt-6 sm:text-left sm:text-[13px]">
          <span>
            © 2026 Endpoint Leads · Built by{" "}
            <a href="https://www.endpointclients.com/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#111113] underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-[#111113]">
              Endpoint Clients
            </a>
          </span>
          <span>Made for real estate offices in Pakistan</span>
        </div>
      </div>
    </footer>
  );
}

/** The sky backdrop the footer sits on, for pages without the landing page's sky block. */
export function Option2SkyFooter() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#e6f0fa_30%,#a9cff3_100%)] pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[520px] [mask-image:linear-gradient(180deg,transparent_0%,#000_60%)]">
        <Image src="/option-2/sky.webp" alt="" fill sizes="100vw" className="object-cover object-bottom" />
      </div>
      <Option2Footer />
    </div>
  );
}
