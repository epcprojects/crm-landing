import type { Metadata } from "next";
import LandingPage from "../components/landing-page";

// Option 2 now shows the same sections as the home page. The earlier Option 2
// design is kept in ./option-two-landing.tsx in case it is wanted again.

export const metadata: Metadata = {
  title: "Endpoint Leads Option 2 | Real Estate CRM",
  description:
    "A second landing page direction for Endpoint Leads, the CRM for real estate offices.",
};

export default function OptionTwoPage() {
  return <LandingPage />;
}
