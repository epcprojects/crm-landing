import { siteConfig, siteUrl } from "../site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Endpoint Clients",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icons/icon-512x512.png`,
        width: 512,
        height: 512,
      },
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Wah Cantt",
        addressRegion: "Punjab",
        postalCode: "47040",
        addressCountry: "PK",
      },
      brand: {
        "@type": "Brand",
        "@id": `${siteUrl}/#brand`,
        name: "Endpoint Leads",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Endpoint Leads",
      description: "A web-based real estate CRM for leads, agents, projects, client conversations and follow-ups.",
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Endpoint Leads",
      url: siteUrl,
      description: "A web-based real estate CRM that helps offices manage leads, agents, client conversations, projects and follow-ups from one workspace.",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Customer Relationship Management",
      operatingSystem: "Web browser",
      browserRequirements: "Requires a modern web browser and internet connection.",
      featureList: [
        "Real estate lead management",
        "Client conversation history",
        "Agent roles and activity",
        "Project and status tracking",
        "Follow-up ownership and due dates",
        "Staff-only client notes",
      ],
      provider: { "@id": `${siteUrl}/#organization` },
      brand: { "@id": `${siteUrl}/#brand` },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Real estate offices, agencies and property sales teams",
      },
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
