import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { siteUrl } from "./site-config";
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
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Endpoint Clients", url: siteUrl }],
  creator: "Endpoint Clients",
  publisher: "Endpoint Clients",
  category: "Business software",
  // link previews on WhatsApp, Facebook, LinkedIn, X and Slack. The wide image comes first,
  // so apps that show a big preview use it (text left, laptop and phone right); the square
  // one (text on top, devices below) is there for apps that prefer a square picture.
  openGraph: {
    type: "website",
    siteName: "Endpoint Leads",
    title: "Endpoint Leads | Real estate CRM for your whole office",
    description:
      "Manage your complete real estate business from one place: leads, agents, projects and follow-ups in one CRM.",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/og/og-wide.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Endpoint Leads real estate CRM: the web dashboard on a laptop and the mobile app on a phone, with the headline: Manage your complete real estate business from one place.",
      },
      {
        url: "/og/og-square.jpg",
        width: 1080,
        height: 1080,
        type: "image/jpeg",
        alt: "Endpoint Leads real estate CRM: the headline Manage your complete real estate business from one place, above the web dashboard on a laptop and the mobile app on a phone.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Endpoint Leads | Real estate CRM for your whole office",
    description:
      "Manage your complete real estate business from one place: leads, agents, projects and follow-ups in one CRM.",
    images: [
      {
        url: "/og/og-wide.jpg",
        alt: "Endpoint Leads real estate CRM: the web dashboard on a laptop and the mobile app on a phone, with the headline: Manage your complete real estate business from one place.",
      },
    ],
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
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
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
