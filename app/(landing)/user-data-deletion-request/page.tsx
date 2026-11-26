import type { Metadata } from "next";
import { legalDocuments } from "../../legal-content";
import Option2Legal from "../legal";

const document = legalDocuments["user-data-deletion-request"];

export const metadata: Metadata = {
  title: "Data Deletion Instructions | Endpoint Leads",
  description: document.description,
  alternates: { canonical: "/user-data-deletion-request" },
};

export default function Option2UserDataDeletionRequestPage() {
  return <Option2Legal document={document} currentPath="/user-data-deletion-request" />;
}
