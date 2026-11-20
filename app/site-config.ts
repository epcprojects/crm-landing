// Single place for links the owner still has to confirm before launch.
export const siteConfig = {
  name: "Endpoint Leads",
  // TODO(owner): where "Book a demo" should go (WhatsApp, email or calendar link).
  demoHref: process.env.NEXT_PUBLIC_DEMO_URL ?? "#demo",
  // TODO(owner): confirm this is the production CRM login URL.
  signInHref:
    process.env.NEXT_PUBLIC_SIGN_IN_URL ??
    "https://endpointclients-crm.vercel.app/login",
};
