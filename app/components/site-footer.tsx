import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappLink } from "../site-config";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how" },
      { label: "60-second check", href: "/#check" },
      { label: "Sign in", href: siteConfig.signInHref },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Automation terms", href: "/policy-for-automation" },
      { label: "Data deletion", href: "/user-data-deletion-request" },
    ],
  },
];

// The page ends on a field of brand colour that holds the footer.
export default function SiteFooter() {
  return (
    <footer className="ds-ground pt-[380px] text-white sm:pt-[420px]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Image src="/endpoint-leads-reversed.svg" alt={siteConfig.name} width={1656} height={708} className="h-12 w-auto self-start brightness-0 invert" />
            <p className="max-w-sm text-[15px] leading-relaxed text-white/85">
              The CRM for real estate offices. Every client and every conversation in one place.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={whatsappLink("Hi Endpoint Leads, I have a question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex h-[42px] items-center px-4 text-[15px] font-medium text-ink"
              >
                WhatsApp us
              </a>
              <Link
                href="/#start"
                className="inline-flex h-[42px] items-center rounded-xl border border-white/40 px-4 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Book on Calendly
              </Link>
            </div>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="flex flex-col gap-1.5">
              <p className="mb-1 text-[15px] font-semibold text-white">{group.title}</p>
              {group.links.map((link) => (
                <Link key={link.label} href={link.href} className="inline-flex min-h-9 items-center self-start text-[14px] text-white/85 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="border-t border-white/20 py-6">
          <p className="text-[13px] text-white/85">© 2026 Endpoint Leads</p>
        </div>
      </div>
    </footer>
  );
}
