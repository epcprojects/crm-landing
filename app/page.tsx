import ContactProvider from "./components/contact";
import Faq from "./components/faq";
import FeaturesSection from "./components/features-section";
import FitCheck from "./components/fit-check";
import Hero from "./components/hero";
import HowItWorks from "./components/how-it-works";
import LogoStrip from "./components/logo-strip";
import ProblemSection from "./components/problem-section";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import StartPicker from "./components/start-picker";

export default function HomePage() {
  return (
    <ContactProvider>
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <StartPicker />
        <FitCheck />
        <Faq />
      </main>
      <SiteFooter />
    </ContactProvider>
  );
}
