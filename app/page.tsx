import AgentScorecardSection from "./components/agent-scorecard-section";
import ClientFileSection from "./components/client-file-section";
import ConversationSection from "./components/conversation-section";
import DevicesSection from "./components/devices-section";
import FinalCtaSection from "./components/final-cta-section";
import Hero from "./components/hero";
import HowItWorksSection from "./components/how-it-works-section";
import ProblemSection from "./components/problem-section";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProblemSection />
        <ClientFileSection />
        <ConversationSection />
        <AgentScorecardSection />
        <DevicesSection />
        <HowItWorksSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
