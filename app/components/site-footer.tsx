import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../site-config";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/#platform" },
      { label: "Why us", href: "/#benefits" },
      { label: "See how it works", href: "/#features" },
      { label: "Client stories", href: "/#clients" },
      { label: "FAQ", href: "/#faq" },
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

// The page ends on a solid near-black footer, with a faint photo of towers on
// the right.
function Skyline() {
  // an AI-made photo of towers on black (public/footer-buildings.webp), kept
  // faint and faded out to the left and top so the links stay readable
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/footer-buildings.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="pointer-events-none absolute bottom-0 right-0 h-[45%] w-auto max-w-none sm:h-full select-none object-cover object-right-bottom opacity-[0.22] mix-blend-screen [mask-image:linear-gradient(to_left,#000_35%,transparent_90%)]"
    />
  );
}

export default function SiteFooter() {
  return (
    // a rounded black card, inset from the edges of the page
    <footer className="bg-white px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="ds-ground relative overflow-hidden rounded-[24px] px-2 pt-16 text-white sm:rounded-[32px] sm:px-4 sm:pt-20">
      <Skyline />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-10">
        <div className="grid gap-10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Image src="/endpoint-leads-reversed.svg" alt={siteConfig.name} width={1656} height={708} className="h-12 w-auto self-start brightness-0 invert" />
            <p className="max-w-sm text-[15px] leading-relaxed text-white/85">
              The CRM for real estate offices. Every client and every conversation in one place.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-ghost inline-flex h-[42px] items-center px-4 text-[15px] font-medium text-ink"
              >
                Email us
              </a>
              <Link
                href={siteConfig.calendlyUrl || "/#book-demo"}
                className="inline-flex h-[42px] items-center rounded-xl border border-white/25 px-4 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
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
        <div className="border-t border-white/10 py-7 sm:py-8">
          <p className="text-[13px] text-white/60">© 2026 Endpoint Leads</p>
        </div>
      </div>
      </div>
    </footer>
  );
}
