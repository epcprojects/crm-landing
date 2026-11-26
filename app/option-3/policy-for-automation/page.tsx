import type { Metadata } from "next";
import { legalDocuments } from "../../legal-content";
import Option2Legal from "../legal";

const document = legalDocuments["policy-for-automation"];

export const metadata: Metadata = {
  title: "Terms of Service for Automation | Endpoint Leads",
  description: document.description,
};

export default function Option2PolicyForAutomationPage() {
  return <Option2Legal document={document} currentPath="/policy-for-automation" />;
}
