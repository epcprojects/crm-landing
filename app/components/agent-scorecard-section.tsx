import AgentPerformance from "./agent-performance";
import RevealRoot from "./reveal-root";

export default function AgentScorecardSection() {
  return (
    <section
      id="agents"
      aria-labelledby="agents-heading"
      className="relative scroll-mt-16 border-t border-black/10 bg-surface py-20 text-ink sm:py-24 lg:py-28"
    >
      <RevealRoot
        className="mx-auto w-full max-w-7xl px-5 sm:px-10"
        threshold={0.2}
      >
        <div className="text-center">
          <p className="inline-flex items-center gap-3 font-label text-xs font-medium tracking-[0.2em] text-brand">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            AGENT PERFORMANCE
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
          </p>
          <h2
            id="agents-heading"
            className="mx-auto mt-6 max-w-[24ch] text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-balance"
          >
            <span className="block">See which agents are closing deals</span>
            <span className="block text-brand">and which aren&rsquo;t.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-base leading-7 text-body sm:text-lg sm:leading-8">
            Closed and lost deals and first-reply time for every agent, so you
            know who needs help.
          </p>
        </div>

        <AgentPerformance />
      </RevealRoot>
    </section>
  );
}
