import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
});

const labelMono = JetBrains_Mono({
  variable: "--font-label-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Endpoint Leads | Every client. Every conversation. Every next step.",
  description:
    "Manage your real estate clients and agents from one workspace. See who spoke to each client, what was discussed, and what needs attention next.",
  applicationName: "Endpoint Leads",
  // the site's public address, so share images get full links; set NEXT_PUBLIC_SITE_URL
  // (e.g. https://endpointleads.com) – on Vercel the production address is used when it is unset
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}),
  // link previews on WhatsApp, Facebook, LinkedIn, X and Slack; the picture comes from
  // app/opengraph-image.jpg and app/twitter-image.jpg (1200 × 630)
  openGraph: {
    type: "website",
    siteName: "Endpoint Leads",
    title: "Endpoint Leads | Real estate CRM for your whole office",
    description:
      "Manage your complete real estate business from one place: leads, agents, projects and follow-ups in one CRM.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Endpoint Leads | Real estate CRM for your whole office",
    description:
      "Manage your complete real estate business from one place: leads, agents, projects and follow-ups in one CRM.",
  },
  // favicon.ico (16, 32, 48) comes from app/favicon.ico; the manifest from app/manifest.ts
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/icons/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/apple-touch-icon-167x167.png", sizes: "167x167", type: "image/png" },
      { url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  // added to an iPhone or iPad home screen, the site opens like an app
  appleWebApp: {
    capable: true,
    title: "Endpoint Leads",
    statusBarStyle: "default",
  },
  // Windows start-menu tile
  other: {
    "msapplication-TileColor": "#0891b3",
    "msapplication-TileImage": "/icons/mstile-150x150.png",
  },
};

// the browser bar and installed-app title bar take the logo's teal
export const viewport: Viewport = {
  themeColor: "#0891b3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${labelMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
