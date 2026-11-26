// An Option 2 legal page: Option 2's pill menu and sky footer around the
// shared legal document, shown in Option 2's look.

import { Option2ContactProvider } from "./demo-popup";
import { LegalBody } from "../components/legal-page";
import type { LegalDocument } from "../legal-content";
import { Option2Header, Option2SkyFooter } from "./chrome";
import BackToTop from "../components/back-to-top";

/** The clay icon for each legal page. */
const icons: Record<string, string> = {
  "/privacy-policy": "/option-2/legal-privacy.webp",
  "/policy-for-automation": "/option-2/legal-automation.webp",
  "/user-data-deletion-request": "/option-2/legal-deletion.webp",
};

export default function Option2Legal({ document, currentPath }: { document: LegalDocument; currentPath: string }) {
  return (
    <Option2ContactProvider>
      <div className="bg-white text-[#111113]">
        <Option2Header />
        <LegalBody document={document} currentPath={currentPath} variant="option-2" pageBase="/option-2" icon={icons[currentPath]} />
        <Option2SkyFooter />
        <BackToTop shape="circle" />
      </div>
    </Option2ContactProvider>
  );
}
