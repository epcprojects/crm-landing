import type { Metadata } from "next";
import LegalPage from "../components/legal-page";
import { legalDocuments } from "../legal-content";

const document = legalDocuments["privacy-policy"];

export const metadata: Metadata = {
  title: "Privacy Policy | Endpoint Leads",
  description: document.description,
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={document} currentPath="/privacy-policy" />;
}
