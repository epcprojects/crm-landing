import ConversationDemo from "./conversation-demo";
import RevealRoot from "./reveal-root";

export default function ConversationSection() {
  return (
    <section
      id="conversations"
      aria-labelledby="conversations-heading"
      className="relative scroll-mt-16 border-t border-black/10 bg-white py-12 text-ink sm:py-24 lg:py-28"
    >
      <RevealRoot
        className="mx-auto w-full max-w-7xl px-5 sm:px-10"
        threshold={0.2}
      >
        <div className="text-center">
          <p className="inline-flex items-center gap-3 font-label text-xs font-medium tracking-[0.2em] text-brand">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            EVERY CONVERSATION
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
          </p>
          <h2
            id="conversations-heading"
            className="mx-auto mt-5 text-[clamp(1.62rem,4.4vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em] sm:mt-6 sm:max-w-[22ch] sm:text-balance"
          >
            <span className="block">Know what was discussed.</span>
            <span className="block text-brand">Know what happens next.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-base leading-7 text-body sm:text-lg sm:leading-8">
            Every promise made in a conversation becomes a next step with an
            owner and a date.
          </p>
        </div>

        <ConversationDemo />
      </RevealRoot>
    </section>
  );
}
