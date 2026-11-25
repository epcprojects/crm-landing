// The full landing page, shared by the home page (/) and Option 2 (/option-2)
// so both always show the same, latest sections.

import ContactProvider from "./contact";
import DemoCtaCard from "./demo-cta-card";
import Faq from "./faq";
import FeatureBento from "./feature-bento";
import { ChatCheckSection } from "./features-section";
import Hero from "./hero";
import { NumbersDark } from "./how-it-works";
import LogoStrip from "./logo-strip";
import ProblemSection from "./problem-section";
import ProductShowcase from "./product-showcase";
import BackToTop from "./back-to-top";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import Testimonials from "./testimonials";

export default function LandingPage() {
  return (
    <ContactProvider>
      <SiteHeader />
      <main>
        <Hero />
        <ProductShowcase />
        <LogoStrip />
        <ProblemSection />
        <NumbersDark />
        <FeatureBento />
        <ChatCheckSection />
        {/* <HowItWorks /> hidden for now: the light numbers section */}
        <Testimonials />
        <DemoCtaCard />
        <Faq />
      </main>
      <SiteFooter />
      <BackToTop />
    </ContactProvider>
  );
}
