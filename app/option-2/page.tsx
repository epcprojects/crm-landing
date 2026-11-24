import type { Metadata } from "next";
import OptionTwoLanding from "./option-two-landing";

export const metadata: Metadata = {
  title: "Endpoint Leads Option 2 | Real Estate CRM",
  description:
    "A second landing page direction for Endpoint Leads, the CRM for real estate offices.",
};

export default function OptionTwoPage() {
  return <OptionTwoLanding />;
}
