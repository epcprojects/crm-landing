import Image from "next/image";
import { siteConfig, whatsappLink } from "../site-config";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "60-second check", href: "#check" },
      { label: "Sign in", href: siteConfig.signInHref },
    ],
  },
  {
    // [placeholder] point these at the real pages once they exist
    title: "Company",
    links: [
      { label: "About EPC", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Image src="/endpoint-leads-reversed.svg" alt={siteConfig.name} width={1656} height={708} className="h-11 w-auto self-start" />
          <p className="max-w-sm text-[15px] leading-relaxed text-white/70">
            The CRM for real estate offices. Every client and every conversation in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink("Hi Endpoint Leads, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-full bg-[#25a35a] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#1f8c4d]"
            >
              WhatsApp us
            </a>
            <a
              href="#start"
              className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-5 text-[14px] font-bold text-white transition-colors hover:border-white/50"
            >
              Book on Calendly
            </a>
          </div>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title} className="flex flex-col gap-2">
            <p className="font-label text-xs font-medium tracking-[0.2em] text-white/50">{group.title.toUpperCase()}</p>
            {group.links.map((link) => (
              <a key={link.label} href={link.href} className="inline-flex min-h-10 items-center self-start text-[15px] font-semibold text-white/75 transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        ))}
      </div>
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-5 py-6 sm:px-10">
        <p className="text-sm text-white/60">© 2026 Endpoint Leads</p>
      </div>
    </footer>
  );
}
