const steps = [
  { n: "01", title: "Talk", line: "A short call or WhatsApp chat about how your office works today." },
  { n: "02", title: "Set up", line: "We add your team and help move your existing clients in." },
  { n: "03", title: "Run", line: "Your agents work every client from one place, on desktop or phone." },
];

// A centred heading under a cone of light, then the three steps as cards.
export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-heading" className="ds-cone scroll-mt-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-5 py-16 sm:gap-12 sm:px-10 sm:py-24">
        <div className="flex max-w-[40rem] flex-col items-center gap-4 text-center">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 id="how-heading" className="text-[clamp(1.9rem,3.4vw,2.5rem)] leading-[1.3] text-balance">
            From first call to running in days.
          </h2>
          <a
            href="#start"
            className="mt-2 inline-flex h-[42px] items-center bg-brand px-4 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
          >
            Book a demo
          </a>
        </div>
        <ol className="grid w-full gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="ds-card flex flex-col gap-3 bg-white p-7 sm:p-8">
              <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-b from-[#7667f5] to-[#4333cc] text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_20px_-10px_rgba(73,57,210,0.8)]">
                {s.n}
              </span>
              <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-body">{s.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
