import type { Metadata } from "next";
import LegalPage from "../components/legal-page";
import { legalDocuments } from "../legal-content";

const document = legalDocuments["policy-for-automation"];

export const metadata: Metadata = {
  title: "Terms of Service for Automation | Endpoint Leads",
  description: document.description,
};

export default function PolicyForAutomationPage() {
  return <LegalPage document={document} currentPath="/policy-for-automation" />;
}
