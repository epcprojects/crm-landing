// Logos for the sample offices in Option 2's moving strip. Each is an
// original mark plus its own type treatment, drawn in currentColor so the
// whole strip shares one soft grey. All the offices are sample names.

import type { ReactNode } from "react";

const serif = "font-[family-name:var(--font-serif)]";

function Logo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span role="img" aria-label={label} className="flex flex-none items-center gap-2.5 whitespace-nowrap">
      {children}
    </span>
  );
}

/** A serif R monogram in a fine ring, spaced serif capitals beside it. */
function RazaEstates() {
  return (
    <Logo label="Raza Estates">
      <svg viewBox="0 0 36 36" className="size-8 flex-none" aria-hidden="true">
        <circle cx="18" cy="18" r="16.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="13.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        <text x="18" y="24.5" textAnchor="middle" fontSize="18" fill="currentColor" className={serif}>
          R
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`${serif} text-[21px] tracking-[0.2em]`}>RAZA</span>
        <span className="mt-0.5 text-[7.5px] font-semibold tracking-[0.5em]">ESTATES</span>
      </span>
    </Logo>
  );
}

/** Two stacked roof lines, a bold name over small spaced capitals. */
function MalikProperties() {
  return (
    <Logo label="Malik Properties">
      <svg viewBox="0 0 36 30" className="h-7 w-8 flex-none" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15 L18 3 L33 15" strokeWidth="3" />
        <path d="M9 25 L18 17.5 L27 25" strokeWidth="3" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[21px] font-bold tracking-[-0.03em]">Malik</span>
        <span className="mt-0.5 text-[7.5px] font-semibold tracking-[0.42em]">PROPERTIES</span>
      </span>
    </Logo>
  );
}

/** A small skyline in a rounded tile, the name in two weights. */
function CityRentals() {
  return (
    <Logo label="City Rentals">
      <svg viewBox="0 0 32 32" className="size-8 flex-none" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="9" fill="currentColor" />
        <rect x="8" y="15" width="4" height="10" rx="1" fill="white" />
        <rect x="14" y="8" width="4" height="17" rx="1" fill="white" />
        <rect x="20" y="12" width="4" height="13" rx="1" fill="white" />
      </svg>
      <span className="text-[21px] leading-none tracking-[-0.03em]">
        <span className="font-bold">City</span>
        <span className="font-light"> Rentals</span>
      </span>
    </Logo>
  );
}

/** A double arch doorway, the name in italic serif. */
function BahriaHomes() {
  return (
    <Logo label="Bahria Homes">
      <svg viewBox="0 0 30 34" className="h-8 w-7 flex-none" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M3 33 V14 A12 12 0 0 1 27 14 V33" strokeWidth="2.2" />
        <path d="M9.5 33 V16 A5.5 5.5 0 0 1 20.5 16 V33" strokeWidth="1.4" />
        <path d="M1 33 H29" strokeWidth="2.2" />
      </svg>
      <span className={`${serif} text-[25px] leading-none`}>
        <span className="italic">Bahria</span> Homes
      </span>
    </Logo>
  );
}

/** A wordmark only: spaced capitals and a serif italic ampersand. */
function QureshiCo() {
  return (
    <Logo label="Qureshi & Co">
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="text-[16px] font-semibold tracking-[0.3em]">QURESHI</span>
        <span className={`${serif} text-[26px] italic`}>&amp; Co.</span>
      </span>
    </Logo>
  );
}

/** A nested diamond, serif capitals, a hairline and small capitals. */
function ShahRealty() {
  return (
    <Logo label="Shah Realty">
      <svg viewBox="0 0 32 32" className="size-7 flex-none" aria-hidden="true" fill="none" stroke="currentColor">
        <path d="M16 1.5 L30.5 16 L16 30.5 L1.5 16 Z" strokeWidth="1.4" />
        <path d="M16 8.5 L23.5 16 L16 23.5 L8.5 16 Z" fill="currentColor" stroke="none" />
      </svg>
      <span className="flex items-center gap-2.5 leading-none">
        <span className={`${serif} text-[23px] tracking-[0.16em]`}>SHAH</span>
        <span className="h-5 w-px bg-current opacity-50" />
        <span className="text-[9px] font-semibold tracking-[0.4em]">REALTY</span>
      </span>
    </Logo>
  );
}

export const officeLogos = [RazaEstates, MalikProperties, CityRentals, BahriaHomes, QureshiCo, ShahRealty];
