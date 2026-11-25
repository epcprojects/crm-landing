import type { Metadata } from "next";
import { legalDocuments } from "../../legal-content";
import Option2Legal from "../legal";

const document = legalDocuments["privacy-policy"];

export const metadata: Metadata = {
  title: "Privacy Policy | Endpoint Leads",
  description: document.description,
};

export default function Option2PrivacyPolicyPage() {
  return <Option2Legal document={document} currentPath="/privacy-policy" />;
}
