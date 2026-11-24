import type { Metadata } from "next";
import LegalPage from "../components/legal-page";
import { legalDocuments } from "../legal-content";

const document = legalDocuments["user-data-deletion-request"];

export const metadata: Metadata = {
  title: "Data Deletion Instructions | Endpoint Leads",
  description: document.description,
};

export default function UserDataDeletionRequestPage() {
  return <LegalPage document={document} currentPath="/user-data-deletion-request" />;
}
