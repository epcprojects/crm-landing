// Single place for links and contact details the owner still has to confirm before launch.
export const siteConfig = {
  name: "Endpoint Leads",
  // TODO(owner): your WhatsApp number in international format, digits only (e.g. 923001234567).
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  // TODO(owner): your Calendly event link (e.g. https://calendly.com/endpoint-leads/demo).
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  // TODO(owner): how fast the team usually replies, shown in the hero.
  replyTime: process.env.NEXT_PUBLIC_REPLY_TIME ?? "15 min",
  // TODO(owner): the city shown in the announcement bar.
  city: process.env.NEXT_PUBLIC_CITY ?? "Islamabad and Rawalpindi",
  // TODO(owner): confirm this is the production CRM login URL.
  signInHref:
    process.env.NEXT_PUBLIC_SIGN_IN_URL ??
    "https://endpointclients-crm.vercel.app/login",
};

/** A wa.me link that opens WhatsApp with the message already typed. */
export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
