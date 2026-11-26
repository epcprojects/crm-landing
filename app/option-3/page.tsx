import type { Metadata } from "next";
import OptionTwoPage from "./option-two-page";

// Option 3 has its own page layout in ./option-two-page.tsx. Sections that need
// to look different here get their own copy in this folder, so the home page
// never changes when Option 3 does. The earlier Option 3 design is kept in
// ./option-two-landing.tsx.

export const metadata: Metadata = {
  title: "Endpoint Leads Option 3 | Real Estate CRM",
  description:
    "A third landing page direction for Endpoint Leads, the CRM for real estate offices.",
};

export default function Page() {
  return <OptionTwoPage />;
}
