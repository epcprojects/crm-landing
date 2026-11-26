import type { Metadata } from "next";
import OptionTwoPage from "./option-two-page";

// The home page. Its sections live in this folder; "(landing)" is a route group,
// so it adds nothing to the address and this page is served at "/".

export const metadata: Metadata = {
  title: "Endpoint Leads | Real estate CRM for your whole office",
  description:
    "Manage your real estate clients and agents from one workspace. See who spoke to each client, what was discussed, and what needs attention next.",
};

export default function Page() {
  return <OptionTwoPage />;
}
