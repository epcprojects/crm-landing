"use client";

// A button that opens the talk-to-us popup. Used by every "book a demo",
// "talk to us", "ask for a price" and "contact us" button, so they all lead
// to the same place. It needs a ContactProvider somewhere above it.

import type { ReactNode } from "react";
import { useContact } from "./contact";

export default function OpenContact({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  /** runs before the popup opens, e.g. to close a menu */
  onClick?: () => void;
}) {
  const { openSheet } = useContact();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openSheet("", "");
      }}
      className={className}
    >
      {children}
    </button>
  );
}
