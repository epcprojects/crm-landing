"use client";

// Option 3's black pill button. It opens the talk-to-us sheet, the same one
// the home page uses, so every "demo" button leads to one place.

import type { ReactNode } from "react";
import { useContact } from "../components/contact";

export function DemoButton({
  children,
  size = "md",
  light = false,
  full = false,
}: {
  children: ReactNode;
  size?: "sm" | "md";
  light?: boolean;
  full?: boolean;
}) {
  const { openSheet } = useContact();
  return (
    <button
      type="button"
      onClick={() => openSheet("", "")}
      className={`inline-flex flex-none items-center justify-center rounded-full font-medium transition-colors ${
        size === "sm" ? "h-10 px-4 text-[14px]" : "h-11 px-5 text-[15px]"
      } ${full ? "w-full" : ""} ${
        light ? "bg-[#f3f0eb] text-[#111113] hover:bg-[#ebe6df]" : "bg-[#111113] text-white hover:bg-[#2a2a2e]"
      }`}
    >
      {children}
    </button>
  );
}
