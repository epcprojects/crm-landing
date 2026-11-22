// Customer logos. Off until we have real agency logos and their permission:
// add them to `logos` (files in /public) and set SHOW_LOGOS to true.

import Image from "next/image";

export const SHOW_LOGOS = false;

const logos: { name: string; src: string }[] = [];

export default function LogoStrip() {
  if (!SHOW_LOGOS || logos.length === 0) return null;
  return (
    <section aria-label="Offices using Endpoint Leads" className="bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-5 py-12 sm:px-10">
        <p className="text-[14px] font-semibold text-ink/60">Used by real estate offices in Pakistan</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <li key={logo.name}>
              <Image src={logo.src} alt={logo.name} width={140} height={40} className="h-9 w-auto opacity-70 grayscale" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
