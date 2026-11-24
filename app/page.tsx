import ContactProvider from "./components/contact";
import Faq from "./components/faq";
import FeatureBento from "./components/feature-bento";
import FeaturesSection from "./components/features-section";
import FitCheck from "./components/fit-check";
import Hero from "./components/hero";
import { NumbersDark } from "./components/how-it-works";
import LogoStrip from "./components/logo-strip";
import ProductShowcase from "./components/product-showcase";
import ProblemSection from "./components/problem-section";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import Testimonials from "./components/testimonials";

export default function HomePage() {
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
        <FeaturesSection />
        {/* <HowItWorks /> hidden for now: the light numbers section */}
        <Testimonials />
        <FitCheck />
        <Faq />
      </main>
      <SiteFooter />
    </ContactProvider>
  );
}
