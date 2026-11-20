import Image from "next/image";
import { siteConfig } from "../site-config";

const links = [
  { label: "Platform", href: "#product" },
  { label: "Features", href: "#client-file" },
  { label: "Agent performance", href: "#agents" },
  { label: "How it works", href: "#how-it-works" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 border-t border-white/10 px-5 py-8 sm:gap-8 sm:px-10 sm:py-10 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/endpoint-leads-reversed.svg"
            alt={siteConfig.name}
            width={1656}
            height={708}
            className="h-11 w-auto"
          />
        </div>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-2 gap-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.signInHref}
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-white/75 transition-colors hover:text-white"
          >
            Sign in
          </a>
        </nav>

        <p className="text-center text-sm text-white/60">
          © 2026 Endpoint Leads
        </p>
      </div>
    </footer>
  );
}
