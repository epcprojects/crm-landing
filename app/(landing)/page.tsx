import type { Metadata } from "next";
import OptionTwoPage from "./option-two-page";
import StructuredData from "./structured-data";

// The home page. Its sections live in this folder; "(landing)" is a route group,
// so it adds nothing to the address and this page is served at "/".

export const metadata: Metadata = {
  title: "Real Estate CRM for Leads, Agents & Follow-Ups | Endpoint Leads",
  description:
    "Endpoint Leads is a real estate CRM for managing leads, agents, client conversations, projects and follow-ups from one web-based workspace.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Real Estate CRM for Leads, Agents & Follow-Ups | Endpoint Leads",
    description:
      "Manage leads, agents, client conversations, projects and follow-ups from one web-based real estate CRM.",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Endpoint Leads real estate CRM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate CRM for Leads, Agents & Follow-Ups | Endpoint Leads",
    description:
      "Manage leads, agents, client conversations, projects and follow-ups from one web-based real estate CRM.",
    images: ["/twitter-image.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <StructuredData />
      <OptionTwoPage />
    </>
  );
}
